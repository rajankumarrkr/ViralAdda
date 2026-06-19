/**
 * ViralAdda Design System — Typography
 * System font stack with pre-built text style presets.
 */
import { Platform, TextStyle } from 'react-native';

// ─── Font Families ─────────────────────────────────────────
export const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  default: 'System',
}) as string;

export const FONT_FAMILY_MONO = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  web: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
  default: 'monospace',
}) as string;

// ─── Font Sizes ────────────────────────────────────────────
export const FONT_SIZES = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
  jumbo: 48,
} as const;

// ─── Line Heights ──────────────────────────────────────────
export const LINE_HEIGHTS = {
  xxs: 14,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 30,
  xxl: 36,
  xxxl: 44,
  display: 52,
  jumbo: 60,
} as const;

// ─── Font Weights ──────────────────────────────────────────
export const FONT_WEIGHTS = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
  heavy: '900' as const,
};

// ─── Letter Spacing ────────────────────────────────────────
export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

// ─── Pre-built Text Styles ─────────────────────────────────
export const TEXT_STYLES: Record<string, TextStyle> = {
  // Display — hero banners, splash
  display: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.display,
    lineHeight: LINE_HEIGHTS.display,
    fontWeight: FONT_WEIGHTS.heavy,
    letterSpacing: LETTER_SPACING.tight,
  },

  // Headings
  h1: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xxxl,
    lineHeight: LINE_HEIGHTS.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: LETTER_SPACING.tight,
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: FONT_WEIGHTS.bold,
  },
  h3: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xl,
    lineHeight: LINE_HEIGHTS.xl,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: FONT_WEIGHTS.semiBold,
  },

  // Body
  bodyLg: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: FONT_WEIGHTS.regular,
  },
  body: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    fontWeight: FONT_WEIGHTS.regular,
  },
  bodySm: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xs,
    lineHeight: LINE_HEIGHTS.xs,
    fontWeight: FONT_WEIGHTS.regular,
  },

  // Caption & Labels
  caption: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xxs,
    lineHeight: LINE_HEIGHTS.xxs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  label: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xs,
    lineHeight: LINE_HEIGHTS.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
    letterSpacing: LETTER_SPACING.wide,
  },
  overline: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xxs,
    lineHeight: LINE_HEIGHTS.xxs,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: LETTER_SPACING.widest,
    textTransform: 'uppercase',
  },

  // Button
  button: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    letterSpacing: LETTER_SPACING.wide,
  },
  buttonSm: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
};
