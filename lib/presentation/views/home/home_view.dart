import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:ne_giyer/core/constants/app_colors.dart';
import 'package:ne_giyer/data/models/show.dart';
import 'package:ne_giyer/data/models/episode.dart';
import 'package:ne_giyer/data/services/mock_data_service.dart';
import 'package:ne_giyer/presentation/widgets/home_hero.dart';
import 'package:ne_giyer/presentation/widgets/show_card.dart';
import 'package:ne_giyer/presentation/widgets/scanner_dialog.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  final MockDataService _dataService = MockDataService();
  final ImagePicker _picker = ImagePicker();
  bool _isLoading = true;
  List<Show> _shows = [];

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final shows = await _dataService.getShows();
    if (mounted) {
      setState(() {
        _shows = shows;
        _isLoading = false;
      });
    }
  }

  Future<void> _startScanner() async {
    try {
      // 1. Open Camera
      final XFile? photo = await _picker.pickImage(
        source: ImageSource.camera,
        preferredCameraDevice: CameraDevice.rear,
      );

      if (photo == null) return;

      // 2. Show Scanning Simulation
      if (!mounted) return;
      final bool? success = await showDialog<bool>(
        context: context,
        barrierDismissible: false,
        builder: (context) => ScannerDialog(imagePath: photo.path),
      );

      // 3. Mock Result Navigation (Target: Kızılcık Şerbeti, Doğa's Vakko Scarf)
      if (success == true && mounted) {
        // Target Episode: show_001 -> ep_001 (Kızılcık Şerbeti)
        final episodes = await _dataService.getEpisodesByShowId('show_001');
        if (episodes.isNotEmpty && mounted) {
          final targetEpisode = episodes.first;
          Navigator.pushNamed(
            context,
            '/episode_details',
            arguments: targetEpisode,
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Kanal Hatası: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: AppColors.background,
        body: Center(
          child: CircularProgressIndicator(color: AppColors.primary),
        ),
      );
    }

    if (_shows.isEmpty) {
      return const Scaffold(
        body: Center(child: Text('İçerik bulunamadı')),
      );
    }

    // İlk dizi Hero, kalanlar listelere
    final heroShow = _shows.first;
    final trendShows = _shows.skip(1).take(3).toList(); // Simple subset
    final upcomingShows = _shows.skip(2).toList(); // Another subset

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          // 1. Hero Section
          SliverToBoxAdapter(
            child: HomeHero(
              featuredShow: heroShow,
              onTap: () => _navigateToDetails(heroShow),
            ),
          ),

          // 2. Trend Diziler Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 24, 16, 12),
              child: Text(
                'Trend Diziler',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),

          // 3. Trend Diziler List (Horizontal)
          SliverToBoxAdapter(
            child: SizedBox(
              height: 220, // Card height + padding
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                scrollDirection: Axis.horizontal,
                itemCount: trendShows.length,
                separatorBuilder: (context, index) => const SizedBox(width: 12),
                itemBuilder: (context, index) {
                  final show = trendShows[index];
                  return ShowCard(
                    show: show,
                    width: 140,
                    onTap: () => _navigateToDetails(show),
                  );
                },
              ),
            ),
          ),

          // 4. Yakında Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 24, 16, 12),
              child: Text(
                'Yakında',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),

          // 5. Yakında List (Horizontal)
          SliverToBoxAdapter(
            child: SizedBox(
              height: 220,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                scrollDirection: Axis.horizontal,
                itemCount: upcomingShows.length,
                separatorBuilder: (context, index) => const SizedBox(width: 12),
                itemBuilder: (context, index) {
                  final show = upcomingShows[index];
                  return ShowCard(
                    show: show,
                    width: 140,
                    onTap: () => _navigateToDetails(show),
                  );
                },
              ),
            ),
          ),

          // Bottom padding
          const SliverToBoxAdapter(child: SizedBox(height: 100)),
        ],
      ),
      floatingActionButton: FloatingActionButton.large(
        onPressed: _startScanner,
        backgroundColor: AppColors.primary,
        elevation: 8,
        child: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.camera_alt_rounded, color: Colors.white, size: 32),
            SizedBox(height: 4),
            Text(
              'SCAN',
              style: TextStyle(
                color: Colors.white,
                fontSize: 10,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _navigateToDetails(Show show) {
    Navigator.pushNamed(
      context,
      '/details',
      arguments: show,
    );
  }
}
