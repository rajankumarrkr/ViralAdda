/**
 * GradientBackground — Simulated gradient using layered Views
 * No expo-linear-gradient dependency needed.
 */
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface GradientBackgroundProps {
  colors?: [string, string];
  style?: ViewStyle;
  children?: React.ReactNode;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  borderRadius?: number;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors = ['#FF3B30', '#FF6B35'],
  style,
  children,
  direction = 'horizontal',
  borderRadius = 0,
}) => {
  const [startColor, endColor] = colors;

  return (
    <View style={[styles.container, { borderRadius }, style]}>
      {/* Base layer with start color */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: startColor,
            borderRadius,
          },
        ]}
      />
      {/* Overlay layer with end color and opacity gradient */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: endColor,
            borderRadius,
            opacity: 0.7,
          },
          direction === 'horizontal' && {
            left: '40%',
          },
          direction === 'vertical' && {
            top: '40%',
          },
          direction === 'diagonal' && {
            left: '30%',
            top: '30%',
          },
        ]}
      />
      {/* Blend layer for smoother transition */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: startColor,
            borderRadius,
            opacity: 0.3,
          },
        ]}
      />
      {/* Content */}
      <View style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
        {children}
      </View>
    </View>
  );
};

/** Minimal gradient button background */
export const GradientPill: React.FC<{
  colors?: [string, string];
  style?: ViewStyle;
  children?: React.ReactNode;
}> = ({ colors = ['#FF3B30', '#FF6B35'], style, children }) => (
  <View style={[styles.pill, style]}>
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: colors[0],
          borderRadius: 9999,
        },
      ]}
    />
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: colors[1],
          borderRadius: 9999,
          opacity: 0.6,
          left: '30%',
        },
      ]}
    />
    <View style={{ zIndex: 1 }}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  pill: {
    overflow: 'hidden',
    borderRadius: 9999,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
