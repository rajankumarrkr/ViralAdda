/**
 * ShimmerPlaceholder — Animated shimmer loading effect
 * Used for skeleton loading states throughout the app.
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { DURATION } from '../../theme/animations';

interface ShimmerProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const ShimmerPlaceholder: React.FC<ShimmerProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: DURATION.shimmer,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: DURATION.shimmer,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.card, theme.colors.elevated],
  });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

/** Pre-built Video Card Skeleton */
export const VideoCardSkeleton: React.FC = () => (
  <View style={skeletonStyles.card}>
    <ShimmerPlaceholder width="100%" height={200} borderRadius={12} />
    <View style={skeletonStyles.infoRow}>
      <ShimmerPlaceholder width={36} height={36} borderRadius={18} />
      <View style={skeletonStyles.textCol}>
        <ShimmerPlaceholder width="85%" height={14} borderRadius={4} />
        <ShimmerPlaceholder width="55%" height={12} borderRadius={4} style={{ marginTop: 8 }} />
        <ShimmerPlaceholder width="40%" height={10} borderRadius={4} style={{ marginTop: 6 }} />
      </View>
    </View>
  </View>
);

/** Pre-built Hero Banner Skeleton */
export const HeroBannerSkeleton: React.FC = () => (
  <View style={skeletonStyles.hero}>
    <ShimmerPlaceholder width="100%" height={220} borderRadius={16} />
  </View>
);

const skeletonStyles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'flex-start',
  },
  textCol: {
    flex: 1,
    marginLeft: 10,
  },
  hero: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
