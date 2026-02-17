import 'package:flutter/material.dart';
import 'package:ne_giyer/core/constants/app_colors.dart';
import 'package:ne_giyer/core/constants/app_text_styles.dart';
import 'package:ne_giyer/data/models/show.dart';
import 'package:ne_giyer/data/models/episode.dart';
import 'package:ne_giyer/data/services/mock_data_service.dart';

class DetailsView extends StatefulWidget {
  final Show show;

  const DetailsView({super.key, required this.show});

  @override
  State<DetailsView> createState() => _DetailsViewState();
}

class _DetailsViewState extends State<DetailsView> {
  final MockDataService _dataService = MockDataService();
  bool _isLoading = true;
  List<Episode> _episodes = [];

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final episodes = await _dataService.getEpisodesByShowId(widget.show.id);
    if (mounted) {
      setState(() {
        _episodes = episodes;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(color: AppColors.primary),
            )
          : CustomScrollView(
              slivers: [
                // ─── Hero Poster ─────────────────────────
                SliverAppBar(
                  expandedHeight: 300,
                  pinned: true,
                  flexibleSpace: FlexibleSpaceBar(
                    title: Text(
                      widget.show.name,
                      style: AppTextStyles.headlineMedium.copyWith(
                        color: AppColors.textOnPrimary,
                        shadows: [
                          const Shadow(
                            blurRadius: 16,
                            color: Colors.black87,
                          ),
                        ],
                      ),
                    ),
                    background: Stack(
                      fit: StackFit.expand,
                      children: [
                        Image.network(
                          widget.show.posterUrl,
                          fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) => Container(
                            color: AppColors.surfaceLight,
                            child: const Icon(
                              Icons.movie_outlined,
                              size: 64,
                              color: AppColors.textTertiary,
                            ),
                          ),
                        ),
                        const DecoratedBox(
                          decoration: BoxDecoration(
                            gradient: AppColors.darkOverlay,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // ─── Açıklama ────────────────────────────
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text(
                      widget.show.description,
                      style: AppTextStyles.bodyLarge,
                    ),
                  ),
                ),

                // ─── Bölümler Listesi ────────────────────
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final episode = _episodes[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 6),
                        child: InkWell(
                          onTap: () {
                            Navigator.pushNamed(
                              context,
                              '/episode_details',
                              arguments: episode,
                            );
                          },
                          borderRadius: BorderRadius.circular(12),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              children: [
                                Container(
                                  width: 50,
                                  height: 50,
                                  decoration: BoxDecoration(
                                    color: AppColors.primary
                                        .withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  alignment: Alignment.center,
                                  child: Text(
                                    '${episode.episodeNumber}',
                                    style: AppTextStyles.headlineSmall
                                        .copyWith(color: AppColors.primary),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        episode.title,
                                        style: AppTextStyles.labelLarge
                                            .copyWith(fontSize: 16),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        episode.airDate,
                                        style: AppTextStyles.bodyMedium
                                            .copyWith(
                                                color: AppColors.textSecondary),
                                      ),
                                    ],
                                  ),
                                ),
                                const Icon(Icons.arrow_forward_ios_rounded,
                                    size: 16, color: AppColors.textTertiary),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                    childCount: _episodes.length,
                  ),
                ),

                const SliverToBoxAdapter(
                  child: SizedBox(height: 32),
                ),
              ],
            ),
    );
  }
}
