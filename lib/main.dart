import 'package:flutter/material.dart';
import 'package:ne_giyer/core/theme/app_theme.dart';
import 'package:ne_giyer/data/models/episode.dart';
import 'package:ne_giyer/data/models/show.dart';
import 'package:ne_giyer/presentation/views/details/details_view.dart';
import 'package:ne_giyer/presentation/views/details/episode_detail_view.dart';
import 'package:ne_giyer/presentation/views/home/home_view.dart';

void main() {
  runApp(const DiziMarketApp());
}

class DiziMarketApp extends StatelessWidget {
  const DiziMarketApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dizi Market',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      initialRoute: '/',
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(
              builder: (_) => const HomeView(),
            );
          case '/details':
            final show = settings.arguments as Show;
            return MaterialPageRoute(
              builder: (_) => DetailsView(show: show),
            );
          case '/episode_details':
            final episode = settings.arguments as Episode;
            return MaterialPageRoute(
              builder: (_) => EpisodeDetailView(episode: episode),
            );
          default:
            return MaterialPageRoute(
              builder: (_) => const HomeView(),
            );
        }
      },
    );
  }
}
