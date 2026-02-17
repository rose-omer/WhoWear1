import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:ne_giyer/core/constants/app_colors.dart';
import 'package:ne_giyer/core/constants/app_text_styles.dart';

class ScannerDialog extends StatefulWidget {
  final String imagePath;

  const ScannerDialog({super.key, required this.imagePath});

  @override
  State<ScannerDialog> createState() => _ScannerDialogState();
}

class _ScannerDialogState extends State<ScannerDialog> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  String _statusMessage = 'Görsel Hazırlanıyor...';
  int _statusIndex = 0;
  final List<String> _messages = [
    'Sahne Taranıyor...',
    'Kıyafetler Analiz Ediliyor...',
    'AI Veri Tabanı Sorgulanıyor...',
    'Eşleşme Bulundu!',
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();

    _startStatusSimulation();
    _autoNavigate();
  }

  void _startStatusSimulation() {
    Timer.periodic(const Duration(milliseconds: 800), (timer) {
      if (mounted && _statusIndex < _messages.length - 1) {
        setState(() {
          _statusIndex++;
          _statusMessage = _messages[_statusIndex];
        });
      } else {
        timer.cancel();
      }
    });
  }

  void _autoNavigate() {
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        Navigator.of(context).pop(true); // Return true to indicate success
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          // 1. Blurred Background
          Positioned.fill(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
              child: Container(
                color: Colors.black.withValues(alpha: 0.7),
              ),
            ),
          ),

          // 2. Scanner Animation
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    // Radar Circles
                    AnimatedBuilder(
                      animation: _controller,
                      builder: (context, child) {
                        return CustomPaint(
                          painter: RadarPainter(_controller.value),
                          size: const Size(250, 250),
                        );
                      },
                    ),
                    // AI Heartbeat Icon
                    const Icon(
                      Icons.auto_awesome,
                      color: AppColors.primary,
                      size: 60,
                    ),
                  ],
                ),
                const SizedBox(height: 40),
                
                // 3. Status Text
                Text(
                  _statusMessage,
                  style: AppTextStyles.headlineSmall.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Yapay zeka sahneyi analiz ediyor',
                  style: TextStyle(color: Colors.white70, fontSize: 14),
                ),
                const SizedBox(height: 40),
                
                // Loading bar
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 60),
                  child: LinearProgressIndicator(
                    backgroundColor: Colors.white10,
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class RadarPainter extends CustomPainter {
  final double progress;
  RadarPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final paint = Paint()
      ..color = AppColors.primary.withValues(alpha: 1.0 - progress)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    // Expanding circle
    canvas.drawCircle(center, (size.width / 2) * progress, paint);
    
    // Static circles
    final staticPaint = Paint()
      ..color = AppColors.primary.withValues(alpha: 0.2)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;
    
    canvas.drawCircle(center, size.width * 0.2, staticPaint);
    canvas.drawCircle(center, size.width * 0.4, staticPaint);
  }

  @override
  bool shouldRepaint(covariant RadarPainter oldDelegate) => true;
}
