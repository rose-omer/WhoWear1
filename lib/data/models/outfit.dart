class Outfit {
  final String id;
  final String episodeId;
  final String actorName;
  final String actorImageUrl;
  final String sceneTimestamp;

  const Outfit({
    required this.id,
    required this.episodeId,
    required this.actorName,
    required this.actorImageUrl,
    required this.sceneTimestamp,
  });

  factory Outfit.fromJson(Map<String, dynamic> json) {
    return Outfit(
      id: json['id'] as String,
      episodeId: json['episodeId'] as String,
      actorName: json['actorName'] as String,
      actorImageUrl: json['actorImageUrl'] as String,
      sceneTimestamp: json['sceneTimestamp'] as String,
    );
  }
}
