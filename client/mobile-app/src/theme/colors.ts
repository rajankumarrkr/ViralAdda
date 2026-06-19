/**
 * ViralAdda Design System — Color Tokens
 * Premium dark-first color palette inspired by TikTok, YouTube, Netflix, Instagram.
 */

// ─── Core Brand ────────────────────────────────────────────
export const BRAND_PRIMARY = '#FF3B30';
export const BRAND_SECONDARY = '#FF6B35';
export const BRAND_GRADIENT = [BRAND_PRIMARY, BRAND_SECONDARY] as const;

// ─── Backgrounds ───────────────────────────────────────────
export const BG_PRIMARY = '#0B0B0F';
export const BG_SURFACE = '#101016';
export const BG_CARD = '#15151D';
export const BG_ELEVATED = '#1C1C26';
export const BG_HOVER = '#22222E';

// ─── Borders ───────────────────────────────────────────────
export const BORDER_DEFAULT = '#2A2A35';
export const BORDER_SUBTLE = '#1E1E28';
export const BORDER_FOCUS = BRAND_PRIMARY;

// ─── Text ──────────────────────────────────────────────────
export const TEXT_PRIMARY = '#FFFFFF';
export const TEXT_SECONDARY = '#D1D5DB';
export const TEXT_MUTED = '#9CA3AF';
export const TEXT_DISABLED = '#6B7280';
export const TEXT_INVERSE = '#0B0B0F';

// ─── Semantic ──────────────────────────────────────────────
export const SUCCESS = '#22C55E';
export const ERROR = '#EF4444';
export const WARNING = '#F59E0B';
export const INFO = '#3B82F6';

// ─── Glassmorphism ─────────────────────────────────────────
export const GLASS_BG = 'rgba(15, 15, 22, 0.85)';
export const GLASS_BG_LIGHT = 'rgba(20, 20, 28, 0.75)';
export const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';
export const GLASS_BORDER_ACTIVE = 'rgba(255, 255, 255, 0.15)';

// ─── Overlays ──────────────────────────────────────────────
export const OVERLAY_LIGHT = 'rgba(0, 0, 0, 0.3)';
export const OVERLAY_MEDIUM = 'rgba(0, 0, 0, 0.5)';
export const OVERLAY_HEAVY = 'rgba(0, 0, 0, 0.7)';
export const OVERLAY_GRADIENT_TOP = 'rgba(11, 11, 15, 0.9)';
export const OVERLAY_GRADIENT_BOTTOM = 'rgba(11, 11, 15, 0.95)';

// ─── Category Accents ──────────────────────────────────────
export const CATEGORY_COLORS: Record<string, string> = {
  Trending: '#FF3B30',
  Comedy: '#FF9500',
  Movies: '#AF52DE',
  Gaming: '#30D158',
  News: '#007AFF',
  Education: '#5AC8FA',
  Music: '#FF2D55',
};
