/**
 * ViralAdda Design System — Animation Presets
 * Duration, easing, and spring configs for consistent motion design.
 */
import { Easing } from 'react-native';

// ─── Durations ─────────────────────────────────────────────
export const DURATION = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700,
  shimmer: 1500,
} as const;

// ─── Easing ────────────────────────────────────────────────
export const EASING = {
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  decelerate: Easing.bezier(0, 0, 0.2, 1),
  accelerate: Easing.bezier(0.4, 0, 1, 1),
  sharp: Easing.bezier(0.4, 0, 0.6, 1),
  bounce: Easing.bezier(0.34, 1.56, 0.64, 1),
} as const;

// ─── Spring Configs (Reanimated compatible) ────────────────
export const SPRING = {
  gentle: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  snappy: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  bouncy: {
    damping: 10,
    stiffness: 180,
    mass: 1,
  },
  stiff: {
    damping: 30,
    stiffness: 400,
    mass: 0.5,
  },
} as const;

// ─── Scale Presets ─────────────────────────────────────────
export const SCALE = {
  pressIn: 0.96,
  pressInSubtle: 0.98,
  pressInHeavy: 0.92,
  popIn: 1.05,
  heartBurst: 1.4,
} as const;

// ─── Stagger Delays ────────────────────────────────────────
export const STAGGER = {
  fast: 50,
  normal: 100,
  slow: 150,
} as const;
