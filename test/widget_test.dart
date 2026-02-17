import 'package:flutter_test/flutter_test.dart';
import 'package:ne_giyer/main.dart';

void main() {
  testWidgets('App should render without errors', (WidgetTester tester) async {
    await tester.pumpWidget(const NeGiyerApp());
    expect(find.text('Ne Giyer'), findsOneWidget);
  });
}
