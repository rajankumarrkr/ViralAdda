/**
 * ViralAdda Design System — Spacing & Layout Constants
 * 4px base unit spacing scale.
 */
import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Spacing Scale (4px base) ──────────────────────────────
export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  massive: 64,
} as const;

// ─── Border Radius ─────────────────────────────────────────
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  full: 9999,
} as const;

// ─── Layout Constants ──────────────────────────────────────
export const LAYOUT = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_PADDING: 16,
  CARD_GAP: 12,
  BOTTOM_TAB_HEIGHT: 70,
  BOTTOM_TAB_MARGIN: 16,
  STATUS_BAR_HEIGHT: Platform.OS === 'ios' ? 44 : 24,
  HEADER_HEIGHT: 56,
  HERO_HEIGHT: 220,
  VIDEO_CARD_THUMBNAIL_RATIO: 16 / 9,
  CATEGORY_CHIP_HEIGHT: 36,
  AVATAR_SIZES: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
    xxl: 100,
  },
} as const;

// ─── Safe Area Helpers ─────────────────────────────────────
export const getSafeAreaTop = () =>
  Platform.OS === 'ios' ? 44 : 24;

export const getSafeAreaBottom = () =>
  Platform.OS === 'ios' ? 34 : 0;

export const getContentPaddingBottom = () =>
  LAYOUT.BOTTOM_TAB_HEIGHT + LAYOUT.BOTTOM_TAB_MARGIN * 2 + getSafeAreaBottom();
