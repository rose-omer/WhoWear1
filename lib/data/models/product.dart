import 'package:intl/intl.dart';

class Product {
  final String id;
  final String outfitId;
  final String productName;
  final String brand;
  final double price;
  final String currency;
  final String productImageUrl;
  final String affiliateUrl;

  const Product({
    required this.id,
    required this.outfitId,
    required this.productName,
    required this.brand,
    required this.price,
    required this.currency,
    required this.productImageUrl,
    required this.affiliateUrl,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] as String,
      outfitId: json['outfitId'] as String,
      productName: json['productName'] as String,
      brand: json['brand'] as String,
      price: (json['price'] as num).toDouble(),
      currency: json['currency'] as String,
      productImageUrl: json['productImageUrl'] as String,
      affiliateUrl: json['affiliateUrl'] as String,
    );
  }

  String get formattedPrice {
    final formatter = NumberFormat.currency(
      locale: 'tr_TR',
      symbol: currency == 'TRY' ? '₺' : currency,
      decimalDigits: 2,
    );
    return formatter.format(price);
  }
}
