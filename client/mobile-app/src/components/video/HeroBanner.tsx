/**
 * HeroBanner — Netflix/Hotstar-inspired featured video hero card
 * Full-width banner with gradient overlay, play CTA, and creator info.
 */
import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Platform, Animated } from 'react-native';
import { theme } from '../../theme/theme';
import { Play, Eye, Flame } from 'lucide-react-native';
import { SCALE, DURATION, EASING } from '../../theme/animations';
import { LAYOUT } from '../../theme/spacing';

interface HeroBannerProps {
  title: string;
  thumbnailUrl?: string;
  creator?: string;
  views?: number;
  onPress: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  thumbnailUrl,
  creator,
  views,
  onPress,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const defaultThumb = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: SCALE.pressInSubtle,
      duration: DURATION.instant,
      easing: EASING.standard,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: DURATION.fast,
      easing: EASING.bounce,
      useNativeDriver: true,
    }).start();
  };

  const formatViews = (v?: number) => {
    if (!v) return '0 views';
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M views`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K views`;
    return `${v} views`;
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        {/* Thumbnail */}
        <Image
          source={{ uri: thumbnailUrl || defaultThumb }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Gradient overlays */}
        <View style={styles.gradientBottom} />
        <View style={styles.gradientTop} />

        {/* Trending badge */}
        <View style={styles.trendingBadge}>
          <Flame size={12} color="#FF3B30" fill="#FF3B30" />
          <Text style={styles.trendingText}>TRENDING</Text>
        </View>

        {/* Play button */}
        <View style={styles.playContainer}>
          <View style={styles.playButton}>
            <Play size={22} color="#FFFFFF" fill="#FFFFFF" />
          </View>
        </View>

        {/* Info overlay */}
        <View style={styles.infoOverlay}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <View style={styles.metaRow}>
            {creator && (
              <Text style={styles.creator} numberOfLines={1}>
                {creator}
              </Text>
            )}
            <View style={styles.viewsContainer}>
              <Eye size={12} color="rgba(255,255,255,0.7)" />
              <Text style={styles.views}>{formatViews(views)}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LAYOUT.SCREEN_PADDING,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  pressable: {
    width: '100%',
    height: LAYOUT.HERO_HEIGHT,
    position: 'relative',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.card,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(11, 11, 15, 0.85)',
    // Simulate gradient by using a semi-transparent overlay at the bottom
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(11, 11, 15, 0.3)',
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
    zIndex: 2,
  },
  trendingText: {
    color: '#FF3B30',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
    letterSpacing: 1,
  },
  playContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  creator: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  views: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});
