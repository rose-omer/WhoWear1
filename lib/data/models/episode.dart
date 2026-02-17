class Episode {
  final String id;
  final String showId;
  final int episodeNumber;
  final String title;
  final String airDate;
  final String sceneImageUrl;

  const Episode({
    required this.id,
    required this.showId,
    required this.episodeNumber,
    required this.title,
    required this.airDate,
    required this.sceneImageUrl,
  });

  factory Episode.fromJson(Map<String, dynamic> json) {
    return Episode(
      id: json['id'] as String,
      showId: json['showId'] as String,
      episodeNumber: json['episodeNumber'] as int,
      title: json['title'] as String,
      airDate: json['airDate'] as String,
      sceneImageUrl: json['sceneImageUrl'] as String? ?? 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=640',
    );
  }
}
