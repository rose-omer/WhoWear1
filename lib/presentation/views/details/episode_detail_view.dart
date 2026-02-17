import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:ne_giyer/core/constants/app_colors.dart';
import 'package:ne_giyer/core/constants/app_text_styles.dart';
import 'package:ne_giyer/data/models/episode.dart';
import 'package:ne_giyer/data/models/outfit.dart';
import 'package:ne_giyer/data/models/product.dart';
import 'package:ne_giyer/data/services/mock_data_service.dart';
import 'package:url_launcher/url_launcher.dart';

class EpisodeDetailView extends StatefulWidget {
  final Episode episode;

  const EpisodeDetailView({super.key, required this.episode});

  @override
  State<EpisodeDetailView> createState() => _EpisodeDetailViewState();
}

class _EpisodeDetailViewState extends State<EpisodeDetailView> {
  final MockDataService _dataService = MockDataService();

  List<Outfit> _outfits = [];
  bool _isLoading = true;
  String? _selectedOutfitId;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    // Simulate fetching data
    final outfits = await _dataService.getOutfitsByEpisodeId(widget.episode.id);
    
    if (mounted) {
      setState(() {
        _outfits = outfits;
        // Başlangıçta listenin ilk karakterinin ID'sini bu değişkene ata
        if (_outfits.isNotEmpty) {
          // We select the first outfit ID (usually matching the first actor)
          _selectedOutfitId = _outfits.first.id;
        }
        _isLoading = false;
      });
    }
  }

  // Get unique actors for the selector UI
  List<Outfit> get _uniqueActors {
    final seen = <String>{};
    return _outfits.where((o) => seen.add(o.actorName)).toList();
  }

  Future<void> _launchUrl(String url) async {
    final Uri uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      debugPrint('Could not launch $url');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : Column(
              children: [
                // 1. Header (Scene Image)
                SizedBox(
                  height: 250,
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      CachedNetworkImage(
                        imageUrl: widget.episode.sceneImageUrl,
                        fit: BoxFit.cover,
                        placeholder: (context, url) => Container(color: AppColors.surface),
                        errorWidget: (context, url, error) => Container(
                            color: AppColors.surface, child: const Icon(Icons.error)),
                      ),
                      const DecoratedBox(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [Colors.transparent, AppColors.background],
                            stops: [0.6, 1.0],
                          ),
                        ),
                      ),
                      // Back Button & Title Overlay
                      SafeArea(
                        child: Align(
                          alignment: Alignment.topLeft,
                          child: IconButton(
                            icon: const Icon(Icons.arrow_back, color: Colors.white),
                            onPressed: () => Navigator.pop(context),
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 16,
                        left: 16,
                        child: Text(
                          'Bölüm ${widget.episode.episodeNumber}',
                          style: AppTextStyles.headlineSmall.copyWith(
                            color: Colors.white,
                            shadows: [
                              const Shadow(blurRadius: 10, color: Colors.black)
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // 2. Actor Selector
                Container(
                  height: 135,
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Text(
                          'KİMİN STİLİ?',
                          style: AppTextStyles.labelSmall.copyWith(
                            color: AppColors.textSecondary,
                            letterSpacing: 1.2,
                          ),
                        ),
                      ),
                      const SizedBox(height: 10),
                      Expanded(
                        child: ListView.separated(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          scrollDirection: Axis.horizontal,
                          itemCount: _uniqueActors.length,
                          separatorBuilder: (_, __) => const SizedBox(width: 16),
                          itemBuilder: (context, index) {
                            final outfit = _uniqueActors[index];
                            // Check equality by ID or Actor Name mapping. 
                            // Since we have 1 outfit per actor in unique list, 
                            // we can highlight if _selectedOutfitId matches THIS outfit's id.
                            // Note: If multiple outfits exist for one actor, we select the FIRST one.
                            final isSelected = outfit.id == _selectedOutfitId;

                            return GestureDetector(
                              onTap: () {
                                setState(() {
                                  _selectedOutfitId = outfit.id;
                                });
                              },
                              behavior: HitTestBehavior.opaque,
                              child: Column(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(3),
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      border: Border.all(
                                        color: isSelected
                                            ? AppColors.primary
                                            : Colors.transparent,
                                        width: 2,
                                      ),
                                    ),
                                    child: CircleAvatar(
                                      radius: 28,
                                      backgroundImage:
                                          NetworkImage(outfit.actorImageUrl),
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    outfit.actorName.split(' ').first,
                                    style: AppTextStyles.bodySmall.copyWith(
                                      color: isSelected
                                          ? AppColors.primary
                                          : AppColors.textSecondary,
                                      fontWeight: isSelected
                                          ? FontWeight.bold
                                          : FontWeight.normal,
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),

                const Divider(color: AppColors.divider, height: 1),

                // 3. Product List (Expanded -> ListView.separated)
                Expanded(
                  child: _selectedOutfitId == null
                      ? const Center(child: Text('Lütfen bir karakter seçin.'))
                      : FutureBuilder<List<Product>>(
                          // Filtreleme Mantığı: OutfitID'ye göre
                          future: _dataService.getProductsByOutfitId(_selectedOutfitId!),
                          builder: (context, snapshot) {
                            if (snapshot.connectionState == ConnectionState.waiting) {
                              return const Center(
                                  child: CircularProgressIndicator(
                                      color: AppColors.primary));
                            }
                            if (snapshot.hasError) {
                              return const Center(child: Text('Ürünler yüklenemedi.'));
                            }
                            
                            final products = snapshot.data ?? [];

                            if (products.isEmpty) {
                              return const Center(child: Text('Bu tarz için ürün bulunamadı.'));
                            }

                            return ListView.separated(
                              padding: const EdgeInsets.all(16),
                              itemCount: products.length,
                              separatorBuilder: (context, index) =>
                                  const SizedBox(height: 16),
                              itemBuilder: (context, index) {
                                final product = products[index];

                                return Container(
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    color: AppColors.surface,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                        color: AppColors.divider.withValues(alpha: 0.5)),
                                  ),
                                  child: Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      // Sol: Ürün görseli
                                      ClipRRect(
                                        borderRadius: BorderRadius.circular(8),
                                        child: CachedNetworkImage(
                                          imageUrl: product.productImageUrl,
                                          width: 100,
                                          height: 120,
                                          fit: BoxFit.cover,
                                          placeholder: (ctx, url) => Container(
                                              color: AppColors.surfaceLight),
                                        ),
                                      ),
                                      const SizedBox(width: 16),

                                      // Sağ: Bilgiler ve Buton
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            // Marka (Uppercase & Bold)
                                            Text(
                                              product.brand.toUpperCase(),
                                              style: AppTextStyles.labelLarge.copyWith(
                                                fontWeight: FontWeight.w900,
                                                letterSpacing: 1.0,
                                              ),
                                            ),
                                            const SizedBox(height: 4),
                                            // Ürün Adı
                                            Text(
                                              product.productName,
                                              style: AppTextStyles.bodyMedium,
                                              maxLines: 2,
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                            const SizedBox(height: 8),
                                            // Fiyat
                                            Text(
                                              product.formattedPrice,
                                              style: AppTextStyles.headlineSmall
                                                  .copyWith(
                                                color: AppColors.accent,
                                                fontSize: 18,
                                              ),
                                            ),
                                            const SizedBox(height: 12),
                                            
                                            // Satın Al Butonu
                                            SizedBox(
                                              width: double.infinity,
                                              child: ElevatedButton(
                                                onPressed: () =>
                                                    _launchUrl(product.affiliateUrl),
                                                style: ElevatedButton.styleFrom(
                                                  backgroundColor: AppColors.primary,
                                                  foregroundColor: Colors.white,
                                                  shape: RoundedRectangleBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(8),
                                                  ),
                                                  padding:
                                                      const EdgeInsets.symmetric(
                                                          vertical: 12),
                                                ),
                                                child: const Text(
                                                  'SATIN AL',
                                                  style: TextStyle(
                                                      fontWeight: FontWeight.bold),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                );
                              },
                            );
                          },
                        ),
                ),
              ],
            ),
    );
  }
}
