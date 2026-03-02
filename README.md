# 📺 Dizi Market - Shoppable TV App

**Dizi Market** is a revolutionary mobile and web application that transforms TV watching into an interactive shopping experience. Users can discover and purchase fashion items worn by their favorite TV show characters in real-time.

## ✨ Features

### 🔍 AI-Powered Visual Scene Scanner
- **Camera Integration**: Scan TV scenes directly from your phone
- **Radar Animation**: Premium AI simulation with custom-painted radar effects
- **Smart Navigation**: Automatically redirects to matching episodes and products
- **Blur Effects**: Glassmorphism UI with backdrop filters

### 📱 Mobile App (Flutter)
- **Show Discovery**: Browse trending Turkish TV series with HD posters
- **Episode Details**: View character outfits with interactive actor selection
- **Product Catalog**: High-quality product images with affiliate links
- **Premium Dark Theme**: Netflix-inspired UI with Montserrat & Inter fonts
- **Responsive Design**: Optimized for Android devices

### 💼 Admin Panel (Next.js)
- **Show Management**: Full CRUD operations for TV shows
- **Product Management**: Manage fashion items and affiliate links
- **Analytics Dashboard**: Track user engagement and clicks
- **Studio Tools**: Content creation and management interface
- **Real-time Updates**: LocalStorage-based state management

## 🛠️ Tech Stack

### Mobile (Flutter)
- **Framework**: Flutter 3.2+
- **State Management**: StatefulWidget with async data loading
- **Image Caching**: `cached_network_image` for performance
- **Camera**: `image_picker` for scene scanning
- **Navigation**: Named routes with type-safe arguments
- **UI**: Custom animations with `CustomPainter`

### Admin Panel (Next.js)
- **Framework**: Next.js 16 with Turbopack
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: Custom `useLocalStorage` hook

### Backend (Mock)
- **Data Layer**: `MockDataService` with 800ms simulated latency
- **Models**: Strict-typed Dart classes (Show, Episode, Outfit, Product)
- **Future-Ready**: Designed for easy API integration

## 📂 Project Structure

```
ne_giyer/
├── lib/                          # Flutter Mobile App
│   ├── core/
│   │   ├── constants/           # Colors, text styles
│   │   └── theme/               # Dark theme configuration
│   ├── data/
│   │   ├── models/              # Data models
│   │   └── services/            # MockDataService
│   ├── presentation/
│   │   ├── views/               # Screens (Home, Details, Episode)
│   │   └── widgets/             # Reusable components
│   └── main.dart
├── shoppable_tv_admin/          # Next.js Admin Panel
│   ├── src/
│   │   ├── app/                 # App router pages
│   │   ├── components/          # UI components
│   │   └── hooks/               # Custom React hooks
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Flutter SDK**: 3.2.0 or higher
- **Node.js**: 18.0.0 or higher
- **Android Studio**: For Android development
- **Git**: For version control

### Mobile App Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ne_giyer
   ```

2. **Install Flutter dependencies**
   ```bash
   flutter pub get
   ```

3. **Run on Android device/emulator**
   ```bash
   flutter run
   ```

4. **Build release APK**
   ```bash
   flutter build apk --release
   ```
   APK location: `build/app/outputs/flutter-apk/app-release.apk`

### Admin Panel Setup

1. **Navigate to admin directory**
   ```bash
   cd shoppable_tv_admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Screenshots

### Mobile App
- **Home Screen**: Hero section with trending shows
- **Episode Details**: Interactive actor selector with product listings
- **Visual Scanner**: AI-powered scene scanning with radar animation

### Admin Panel
- **Dashboard**: Analytics and recent activity
- **Shows Management**: CRUD interface for TV series
- **Products Management**: Affiliate link management

## 🎨 Design System

### Colors
- **Primary**: `#E50914` (Netflix Red)
- **Background**: `#0A0A0A` (Deep Black)
- **Accent**: `#D4AF37` (Gold)
- **Surface**: `#1A1A1A`

### Typography
- **Headings**: Montserrat (Bold, Modern)
- **Body**: Inter (Clean, Readable)

## 🔗 Data Models

### Show
```dart
class Show {
  final String id;
  final String name;
  final String posterUrl;
  final String description;
}
```

### Episode
```dart
class Episode {
  final String id;
  final String showId;
  final int episodeNumber;
  final String title;
  final String airDate;
  final String sceneImageUrl;
}
```

### Product
```dart
class Product {
  final String id;
  final String outfitId;
  final String productName;
  final String brand;
  final double price;
  final String currency;
  final String productImageUrl;
  final String affiliateUrl;
}
```

## 🧪 Testing

### Mobile App
```bash
flutter test
```

### Admin Panel
```bash
npm test
```

## 📦 Release APK

The latest release APK is available in the `releases/` directory:
- **File**: `app-release.apk`
- **Version**: 1.0.0+1
- **Min SDK**: Android 5.0 (API 21)
- **Target SDK**: Android 13 (API 33)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **TV Shows**: Kızılcık Şerbeti, Yalı Çapkını, Bahar, İnci Taneleri, Sandık Kokusu
- **Brands**: Mavi, Vakko, Zara, İpekyol, Trendyol
- **Design Inspiration**: Netflix, Amazon Prime Video

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Flutter & Next.js**
