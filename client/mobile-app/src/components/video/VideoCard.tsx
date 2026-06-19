/**
 * VideoCard — Premium YouTube-style video card with engagement metrics
 */
import React, { useRef } from 'react';
import { Image, Pressable, Text, View, StyleSheet, Platform, Animated } from 'react-native';
import type { VideoDto } from '@viraladda/shared-types';
import { theme } from '../../theme/theme';
import { Eye, Heart, MessageCircle, Share2, Play } from 'lucide-react-native';
import { UserAvatar } from '../common/UserAvatar';
import { SCALE, DURATION, EASING } from '../../theme/animations';
import { LAYOUT } from '../../theme/spacing';

export function VideoCard({ video, onPress }: { video: VideoDto; onPress: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const defaultThumbnail = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80';

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: SCALE.pressIn,
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

  const formatCount = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return `${n}`;
  };

  const formatDuration = (secs?: number) => {
    if (!secs) return '2:15';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${('0' + s).slice(-2)}`;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: video.thumbnailUrl || defaultThumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          {/* Subtle gradient overlay */}
          <View style={styles.thumbnailOverlay} />

          {/* Play icon center */}
          <View style={styles.playOverlay}>
            <View style={styles.playCircle}>
              <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
            </View>
          </View>

          {/* Duration badge */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{formatDuration(undefined)}</Text>
          </View>
        </View>

        {/* Info section */}
        <View style={styles.infoSection}>
          <UserAvatar
            size="sm"
            uri={video.uploadedBy?.profileImage}
            style={styles.avatar}
          />
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={2}>
              {video.title}
            </Text>
            <Text style={styles.creator} numberOfLines={1}>
              {video.uploadedBy?.username || 'ViralAdda Creator'}
            </Text>

            {/* Engagement metrics */}
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Eye size={11} color={theme.colors.textMuted} />
                <Text style={styles.metricText}>{formatCount(video.views || 0)}</Text>
              </View>
              <View style={styles.metricDot} />
              <View style={styles.metricItem}>
                <Heart size={11} color={theme.colors.primary} fill={theme.colors.primary} />
                <Text style={styles.metricText}>{formatCount((video as any).likesCount || 128)}</Text>
              </View>
              <View style={styles.metricDot} />
              <View style={styles.metricItem}>
                <MessageCircle size={11} color={theme.colors.textMuted} />
                <Text style={styles.metricText}>{formatCount((video as any).commentsCount || 24)}</Text>
              </View>

              {/* Share button */}
              <Pressable
                style={styles.shareBtn}
                onPress={(e) => { e.stopPropagation?.(); }}
              >
                <Share2 size={13} color={theme.colors.textMuted} />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: LAYOUT.SCREEN_PADDING,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    ...theme.shadows.sm,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      } as any,
    }),
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: theme.colors.surface,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    // Hidden by default, visible on hover for web
    ...Platform.select({
      web: {
        opacity: 0,
        transition: 'opacity 0.2s ease',
      } as any,
    }),
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  infoSection: {
    flexDirection: 'row',
    padding: 12,
    paddingTop: 10,
  },
  avatar: {
    marginRight: 10,
    marginTop: 2,
  },
  details: {
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 3,
  },
  creator: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginLeft: 3,
    fontWeight: '500',
  },
  metricDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.colors.textDisabled,
    marginHorizontal: 6,
  },
  shareBtn: {
    marginLeft: 'auto',
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
});
