/**
 * ViralAdda Design System — Master Theme
 * Premium dark-first theme object with all tokens consolidated.
 */
import * as Colors from './colors';
import { FONT_SIZES, LINE_HEIGHTS, FONT_WEIGHTS, FONT_FAMILY } from './typography';
import { SPACING, RADIUS } from './spacing';

export const theme = {
  colors: {
    // Brand
    primary: Colors.BRAND_PRIMARY,
    primaryGradient: Colors.BRAND_GRADIENT,
    secondary: Colors.BRAND_SECONDARY,

    // Backgrounds
    background: Colors.BG_PRIMARY,
    surface: Colors.BG_SURFACE,
    card: Colors.BG_CARD,
    elevated: Colors.BG_ELEVATED,
    hover: Colors.BG_HOVER,

    // Borders
    border: Colors.BORDER_DEFAULT,
    borderSubtle: Colors.BORDER_SUBTLE,
    borderFocus: Colors.BORDER_FOCUS,

    // Text
    text: Colors.TEXT_PRIMARY,
    textSecondary: Colors.TEXT_SECONDARY,
    textMuted: Colors.TEXT_MUTED,
    textDisabled: Colors.TEXT_DISABLED,
    textInverse: Colors.TEXT_INVERSE,

    // Semantic
    success: Colors.SUCCESS,
    error: Colors.ERROR,
    warning: Colors.WARNING,
    info: Colors.INFO,

    // Glass
    glass: Colors.GLASS_BG,
    glassBorder: Colors.GLASS_BORDER,
    glassActive: Colors.GLASS_BORDER_ACTIVE,

    // Overlays
    overlay: Colors.OVERLAY_MEDIUM,
    overlayLight: Colors.OVERLAY_LIGHT,
    overlayHeavy: Colors.OVERLAY_HEAVY,
  },

  typography: {
    fontFamily: FONT_FAMILY,
    fontSizes: FONT_SIZES,
    lineHeights: LINE_HEIGHTS,
    weights: FONT_WEIGHTS,
  },

  spacing: SPACING,

  borderRadius: RADIUS,

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
    glow: {
      shadowColor: Colors.BRAND_PRIMARY,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 8,
    },
    glowSubtle: {
      shadowColor: Colors.BRAND_PRIMARY,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};

export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#F9FAFB',
    surface: '#FFFFFF',
    card: '#F3F4F6',
    elevated: '#FFFFFF',
    hover: '#E5E7EB',
    border: '#E5E7EB',
    borderSubtle: '#F3F4F6',
    text: '#111827',
    textSecondary: '#374151',
    textMuted: '#6B7280',
    textDisabled: '#9CA3AF',
    glass: 'rgba(255, 255, 255, 0.8)',
    glassBorder: 'rgba(0, 0, 0, 0.05)',
  },
};

export type Theme = typeof theme;
