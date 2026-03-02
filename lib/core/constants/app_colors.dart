import 'package:flutter/material.dart';

/// Dizi Market — Shoppable TV Color Palette
/// Dark-mode-first, premium streaming aesthetic
class AppColors {
  AppColors._();

  // ─── Primary ────────────────────────────────────────────
  static const Color primary = Color(0xFFE50914);
  static const Color primaryLight = Color(0xFFFF3D47);
  static const Color primaryDark = Color(0xFFB00710);

  // ─── Accent / Gold ──────────────────────────────────────
  static const Color accent = Color(0xFFD4AF37);
  static const Color accentLight = Color(0xFFE8CC6E);
  static const Color accentDark = Color(0xFFAA8C2C);

  // ─── Background & Surface ──────────────────────────────
  static const Color background = Color(0xFF0A0A0A);
  static const Color surface = Color(0xFF161616);
  static const Color surfaceLight = Color(0xFF222222);
  static const Color surfaceElevated = Color(0xFF2C2C2C);

  // ─── Text ──────────────────────────────────────────────
  static const Color textPrimary = Color(0xFFF5F5F5);
  static const Color textSecondary = Color(0xFFB0B0B0);
  static const Color textTertiary = Color(0xFF707070);
  static const Color textOnPrimary = Color(0xFFFFFFFF);

  // ─── Utility ───────────────────────────────────────────
  static const Color divider = Color(0xFF2A2A2A);
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFFC107);
  static const Color error = Color(0xFFE53935);
  static const Color shimmerBase = Color(0xFF1A1A1A);
  static const Color shimmerHighlight = Color(0xFF2A2A2A);

  // ─── Gradients ─────────────────────────────────────────
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, Color(0xFFFF6B35)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient darkOverlay = LinearGradient(
    colors: [Colors.transparent, Color(0xCC0A0A0A)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient goldGradient = LinearGradient(
    colors: [accent, Color(0xFFFFD700), accentDark],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
