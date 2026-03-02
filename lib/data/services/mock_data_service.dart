import '../models/show.dart';
import '../models/episode.dart';
import '../models/outfit.dart';
import '../models/product.dart';

/// Gerçek bir API çağrısını simüle eden Mock Data Servisi.
/// Veriler hardcoded olarak tutulur ve her işlemde 800ms gecikme uygulanır.
class MockDataService {
  static final MockDataService _instance = MockDataService._internal();
  factory MockDataService() => _instance;
  MockDataService._internal();

  // ---------------------------------------------------------------------------
  // Hardcoded Data (Source: data.json)
  // ---------------------------------------------------------------------------

  final List<Show> _shows = [
    const Show(
      id: 'show_001',
      name: 'Kızılcık Şerbeti',
      posterUrl: 'https://im.showtv.com.tr/2025/09/03/ver1756923814/3819734_1920x1080.jpg',
      description: 'Muhafazakar ve modern iki ailenin çocuklarının evlenmesiyle başlayan olaylar zinciri.',
    ),
    const Show(
      id: 'show_002',
      name: 'Yalı Çapkını',
      posterUrl: 'https://image.tmdb.org/t/p/original/aBzchfhuZj8JSp3ZGyynoe8hNgu.jpg',
      description: 'Gaziantepli bir ailenin sorumsuz oğullarını evlendirme çabası ve gelişen aşk hikayesi.',
    ),
    const Show(
      id: 'show_003',
      name: 'Bahar',
      posterUrl: 'https://mo.ciner.com.tr/showtv/iu/1258x630/bahar.jpg?v=1768983188',
      description: 'Hayata tutunmaya çalışan bir kadının hikayesi.',
    ),
    const Show(
      id: 'show_004',
      name: 'İnci Taneleri',
      posterUrl: 'https://tr.web.img4.acsta.net/r_654_368/img/c4/08/c40836dc1cd1f9d073d91d73c182951c.png',
      description: 'Yıllar sonra cezaevinden çıkan Azem\'in hikayesi.',
    ),
    const Show(
      id: 'show_005',
      name: 'Sandık Kokusu',
      posterUrl: 'https://mo.ciner.com.tr/showtv/iu/1920x1080_5/sandik-kokusu.jpg?v=1768983242',
      description: 'Anne-kız çatışması ve geçmişin sırları.',
    ),
  ];

  final List<Episode> _episodes = [
    const Episode(id: 'ep_001', showId: 'show_001', episodeNumber: 55, title: 'Bölüm 55', airDate: '2024-03-10', sceneImageUrl: 'https://im.showtv.com.tr/2025/09/03/ver1756923814/3819734_1920x1080.jpg'),
    const Episode(id: 'ep_002', showId: 'show_002', episodeNumber: 62, title: 'Bölüm 62', airDate: '2024-03-08', sceneImageUrl: 'https://image.tmdb.org/t/p/original/aBzchfhuZj8JSp3ZGyynoe8hNgu.jpg'),
    const Episode(id: 'ep_003', showId: 'show_003', episodeNumber: 8, title: 'Bölüm 8', airDate: '2024-04-02', sceneImageUrl: 'https://mo.ciner.com.tr/showtv/iu/1258x630/bahar.jpg?v=1768983188'),
    const Episode(id: 'ep_004', showId: 'show_004', episodeNumber: 10, title: 'Bölüm 10', airDate: '2024-03-28', sceneImageUrl: 'https://tr.web.img4.acsta.net/r_654_368/img/c4/08/c40836dc1cd1f9d073d91d73c182951c.png'),
  ];

  final List<Outfit> _outfits = [
    // Doğa (Sıla Türkoğlu) - Real Portrait
    const Outfit(id: 'outfit_001', episodeId: 'ep_001', actorName: 'Doğa', actorImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17lVoIIVnhp5a8mwNqsKwoTeXvNI0O6oS_Q&s', sceneTimestamp: '12:45'),
    // Seyran (Afra Saraçoğlu) - Real Portrait (FIXED)
    const Outfit(id: 'outfit_002', episodeId: 'ep_002', actorName: 'Seyran', actorImageUrl: 'https://i.pinimg.com/736x/73/59/45/7359457d4c9c10343347f7da78375ba4.jpg', sceneTimestamp: '28:10'),
    // Bahar (Demet Evgar) - Real Portrait
    const Outfit(id: 'outfit_003', episodeId: 'ep_003', actorName: 'Bahar', actorImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5C-NNK5K9vK-8tK9_vd-IKXWMvrhgZpR9A&s', sceneTimestamp: '34:20'),
    // Dilber (Hazar Ergüçlü) - Real Portrait
    const Outfit(id: 'outfit_004', episodeId: 'ep_004', actorName: 'Dilber', actorImageUrl: 'https://referansgazetesicomtr.teimg.com/crop/1280x720/referansgazetesi-com-tr/uploads/2026/01/0x0-inci-taneleri-dilber-kimdir-inci-tanelerinin-dilberi-hazar-erguclu-kac-yasinda-nereli-hangi-dizilerde-oynadi-1706182784955.webp', sceneTimestamp: '10:05'),
  ];

  final List<Product> _products = [
    // Real Product Images (UPDATED v2)
    const Product(id: 'prod_001', outfitId: 'outfit_001', productName: 'Mavi Çiçekli Etek', brand: 'Mavi', price: 899.00, currency: 'TRY', productImageUrl: 'https://ktnimg2.mncdn.com/products/2023/07/21/2751045/6b045115-7d51-4f7d-812b-6af09d497fd9.jpg', affiliateUrl: 'https://www.mavi.com/cicekli-etek'),
    const Product(id: 'prod_002', outfitId: 'outfit_001', productName: 'Vakko Eşarp', brand: 'Vakko', price: 4250.00, currency: 'TRY', productImageUrl: 'https://cdn.vakko.com/mnresize/534/800/8683822294752-02.jpg?v=1751402105076', affiliateUrl: 'https://www.vakko.com/esarp'),
    const Product(id: 'prod_003', outfitId: 'outfit_002', productName: 'Zara Puantiyeli Elbise', brand: 'Zara', price: 1890.00, currency: 'TRY', productImageUrl: 'https://static.zara.net/assets/public/b46e/ad5b/f90b4552a04a/5885ebcdcea2/04661309070-p/04661309070-p.jpg?ts=1769098886414&w=792&f=auto', affiliateUrl: 'https://www.zara.com/tr/tr/puantiyeli-elbise'),
    const Product(id: 'prod_004', outfitId: 'outfit_003', productName: 'İpekyol Kırmızı Ceket', brand: 'İpekyol', price: 5600.00, currency: 'TRY', productImageUrl: 'https://cdn.dsmcdn.com/ty1336/product/media/images/prod/SPM/PIM/20240502/10/7b432924-4f27-3164-839e-473d7494f6c4/1_org_zoom.jpg', affiliateUrl: 'https://www.ipekyol.com.tr/ceket'),
    const Product(id: 'prod_005', outfitId: 'outfit_004', productName: 'Dilber Dans Elbisesi', brand: 'Trendyol', price: 950.00, currency: 'TRY', productImageUrl: 'https://imgrosetta.mynet.com.tr/file/18302128/18302128-1200xauto.jpg', affiliateUrl: 'http://trendyol.com/genel-markalar/dilber-elbisesi-p-800904657'),
  ];

  Future<List<Show>> getShows() async {
    await Future.delayed(const Duration(milliseconds: 800));
    return _shows;
  }

  Future<List<Episode>> getEpisodesByShowId(String showId) async {
    await Future.delayed(const Duration(milliseconds: 800));
    return _episodes.where((e) => e.showId == showId).toList();
  }

  Future<List<Outfit>> getOutfitsByEpisodeId(String episodeId) async {
    await Future.delayed(const Duration(milliseconds: 800));
    return _outfits.where((o) => o.episodeId == episodeId).toList();
  }

  Future<List<Product>> getProductsByOutfitId(String outfitId) async {
    await Future.delayed(const Duration(milliseconds: 800));
    return _products.where((p) => p.outfitId == outfitId).toList();
  }
}
