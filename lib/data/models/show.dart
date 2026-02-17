class Show {
  final String id;
  final String name;
  final String posterUrl;
  final String description;

  const Show({
    required this.id,
    required this.name,
    required this.posterUrl,
    required this.description,
  });

  factory Show.fromJson(Map<String, dynamic> json) {
    return Show(
      id: json['id'] as String,
      name: json['name'] as String,
      posterUrl: json['posterUrl'] as String,
      description: json['description'] as String,
    );
  }
}
