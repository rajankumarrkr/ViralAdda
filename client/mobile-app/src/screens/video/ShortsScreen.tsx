import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, Platform, Animated } from 'react-native';
import { theme } from '../../theme/theme';
import { Heart, MessageCircle, Share2, Music, UserPlus, Volume2, Bookmark } from 'lucide-react-native';
import { UserAvatar } from '../../components/common/UserAvatar';

const { width, height } = Dimensions.get('window');

const SHORTS_DATA = [
  {
    id: 's1',
    title: 'Neon Cyberpunk Dreams 🌃✨ #future #vibes',
    creator: 'cyber_mind',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    videoThumb: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
    likes: '12.4K',
    comments: '432',
    shares: '1.2K',
    music: 'Original Audio - Cyberpunk Chill',
  },
  {
    id: 's2',
    title: 'Code all night long! 💻🚀 #developer #programmer',
    creator: 'viral_coder',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    videoThumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    likes: '8.1K',
    comments: '280',
    shares: '850',
    music: 'Focus Lofi Beats - Coding Mode',
  },
  {
    id: 's3',
    title: 'Exploring deep wilderness 🌲🏕️ #adventure #travel',
    creator: 'wanderlust_explorer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    videoThumb: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    likes: '22.3K',
    comments: '1.2K',
    shares: '4.8K',
    music: 'Nature Sounds - Peaceful Forest',
  }
];

export function ShortsScreen() {
  const [activeItem, setActiveItem] = useState(0);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [bookmarkedItems, setBookmarkedItems] = useState<Record<string, boolean>>({});
  const [lastTap, setLastTap] = useState<{ id: string; time: number } | null>(null);
  const [showHeartBurst, setShowHeartBurst] = useState<string | null>(null);

  const heartScale = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Simulate video progress animation
  useEffect(() => {
    progressAnim.setValue(0);
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 8000, // 8 seconds per loop
        useNativeDriver: false,
      })
    ).start();
  }, [activeItem]);

  const toggleLike = (id: string) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDoubleTapPress = (id: string) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && lastTap.id === id && now - lastTap.time < DOUBLE_PRESS_DELAY) {
      // Trigger like
      if (!likedItems[id]) {
        toggleLike(id);
      }
      // Show heart burst
      setShowHeartBurst(id);
      heartScale.setValue(0);
      Animated.sequence([
        Animated.spring(heartScale, {
          toValue: 1.5,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start(() => {
        setShowHeartBurst(null);
      });
    } else {
      setLastTap({ id, time: now });
    }
  };

  const renderItem = ({ item, index }: { item: typeof SHORTS_DATA[0]; index: number }) => {
    const isLiked = likedItems[item.id] || false;
    const isBookmarked = bookmarkedItems[item.id] || false;
    const isCurrent = index === activeItem;

    return (
      <View style={styles.shortsSlide}>
        {/* Full-screen video container with double tap overlay */}
        <Pressable onPress={() => handleDoubleTapPress(item.id)} style={styles.videoPressable}>
          <Image
            source={{ uri: item.videoThumb }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <View style={styles.videoOverlay} />

          {/* Central Heart Burst Anim */}
          {showHeartBurst === item.id && (
            <Animated.View style={[styles.heartBurst, { transform: [{ scale: heartScale }] }]}>
              <Heart size={80} color="#FF3B30" fill="#FF3B30" />
            </Animated.View>
          )}
        </Pressable>

        {/* Right side interactions panel */}
        <View style={styles.actionColumn}>
          {/* Creator Profile with Follow badge */}
          <View style={styles.creatorAvatarContainer}>
            <UserAvatar uri={item.avatar} size="md" showRing />
            <Pressable style={styles.followBadge}>
              <UserPlus size={10} color="#FFF" />
            </Pressable>
          </View>

          {/* Like */}
          <Pressable onPress={() => toggleLike(item.id)} style={styles.actionBtn}>
            <View style={[styles.actionIconBg, isLiked && styles.actionIconBgActive]}>
              <Heart
                size={24}
                color={isLiked ? '#FF3B30' : '#FFF'}
                fill={isLiked ? '#FF3B30' : 'transparent'}
              />
            </View>
            <Text style={styles.actionCount}>{item.likes}</Text>
          </Pressable>

          {/* Comment */}
          <Pressable style={styles.actionBtn}>
            <View style={styles.actionIconBg}>
              <MessageCircle size={24} color="#FFF" />
            </View>
            <Text style={styles.actionCount}>{item.comments}</Text>
          </Pressable>

          {/* Bookmark */}
          <Pressable onPress={() => toggleBookmark(item.id)} style={styles.actionBtn}>
            <View style={[styles.actionIconBg, isBookmarked && styles.actionIconBgActiveBookmark]}>
              <Bookmark
                size={24}
                color={isBookmarked ? '#FFC700' : '#FFF'}
                fill={isBookmarked ? '#FFC700' : 'transparent'}
              />
            </View>
            <Text style={styles.actionCount}>Save</Text>
          </Pressable>

          {/* Share */}
          <Pressable style={styles.actionBtn}>
            <View style={styles.actionIconBg}>
              <Share2 size={24} color="#FFF" />
            </View>
            <Text style={styles.actionCount}>{item.shares}</Text>
          </Pressable>
        </View>

        {/* Creator / Details Overlay Footer */}
        <View style={styles.footerOverlay}>
          <Text style={styles.creatorName}>@{item.creator}</Text>
          <Text style={styles.titleText}>{item.title}</Text>
          
          <View style={styles.musicRow}>
            <View style={styles.musicIconBg}>
              <Volume2 size={12} color="#FFF" />
            </View>
            <Text style={styles.musicText} numberOfLines={1}>
              {item.music}
            </Text>
            <View style={styles.musicSpinner}>
              <Music size={12} color="#FF3B30" />
            </View>
          </View>
        </View>

        {/* Playback Progress Bar */}
        {isCurrent && (
          <View style={styles.progressContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={SHORTS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / height);
          setActiveItem(index);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  shortsSlide: {
    width: width,
    height: Platform.OS === 'web' ? '100vh' as any : height,
    position: 'relative',
    backgroundColor: '#050508',
  },
  videoPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heartBurst: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    zIndex: 99,
  },
  actionColumn: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    alignItems: 'center',
    zIndex: 10,
    gap: 16,
  },
  creatorAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  followBadge: {
    position: 'absolute',
    bottom: -4,
    alignSelf: 'center',
    backgroundColor: theme.colors.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  actionBtn: {
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  actionIconBg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionIconBgActive: {
    borderColor: 'rgba(255, 59, 48, 0.4)',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  actionIconBgActiveBookmark: {
    borderColor: 'rgba(255, 199, 0, 0.4)',
    backgroundColor: 'rgba(255, 199, 0, 0.1)',
  },
  actionCount: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 6,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footerOverlay: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 40,
    left: 16,
    right: 80,
    zIndex: 10,
  },
  creatorName: {
    color: '#FFF',
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.weights.heavy,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  titleText: {
    color: '#EAEAEA',
    fontSize: theme.typography.fontSizes.xs,
    marginBottom: 12,
    lineHeight: 18,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  musicIconBg: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '500',
    maxWidth: 150,
  },
  musicSpinner: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
});
