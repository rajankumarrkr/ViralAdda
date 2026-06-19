import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, Platform, Dimensions, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfileQuery, useWatchHistoryQuery, useLikedVideosQuery } from '../../api/users/usersApi';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../redux/authSlice';
import { tokenStorage } from '../../services/storage';
import { ScreenState } from '../../components/common/ScreenState';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { theme } from '../../theme/theme';
import { Film, Heart, Grid, LogOut, Settings, Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 3;

export function ProfileScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  
  const [activeTab, setActiveTab] = useState<'history' | 'liked'>('history');

  const { data: profile, isLoading: isProfileLoading, error: profileError } = useProfileQuery();
  const { data: history, isLoading: isHistoryLoading, refetch: refetchHistory } = useWatchHistoryQuery();
  const { data: likedVideos, isLoading: isLikedLoading, refetch: refetchLiked } = useLikedVideosQuery();

  const handleLogout = async () => {
    await tokenStorage.clear();
    dispatch(logout());
  };
  const handleSettingsPress = () => {
    if (Platform.OS === 'web') {
      const confirmLogout = typeof global !== 'undefined' && (global as any).window ? (global as any).window.confirm('Are you sure you want to log out?') : true;
      if (confirmLogout) {
        handleLogout();
      }
    } else {
      Alert.alert(
        'Profile Settings',
        'Would you like to sign out of ViralAdda?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign Out', style: 'destructive', onPress: handleLogout },
        ]
      );
    }
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile features coming soon!');
  };

  const handleVideoPress = (videoId: string) => {
    navigation.navigate('VideoDetail', { id: videoId });
  };

  const renderGridItem = ({ item }: { item: any }) => {
    // History array can return objects with nested video or plain video
    const video = item.videoId || item;
    if (!video || !video.id) return null;

    return (
      <Pressable
        onPress={() => handleVideoPress(video.id)}
        style={({ pressed }) => [
          styles.gridItem,
          pressed && styles.gridItemPressed
        ]}
      >
        <Image
          source={{ uri: video.thumbnailUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=300&q=80' }}
          style={styles.gridImage}
          resizeMode="cover"
        />
        <View style={styles.gridOverlay}>
          <Play size={16} color="#FFF" fill="#FFF" />
          <Text style={styles.gridViewsText}>
            {video.views >= 1000 ? `${(video.views / 1000).toFixed(0)}K` : video.views}
          </Text>
        </View>
      </Pressable>
    );
  };

  const activeData = activeTab === 'history' ? (history ?? []) : (likedVideos ?? []);
  const isGridLoading = activeTab === 'history' ? isHistoryLoading : isLikedLoading;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenState loading={isProfileLoading} error={profileError}>
        <FlatList
          data={activeData}
          keyExtractor={(item, index) => (item.id || String(index))}
          numColumns={3}
          ListHeaderComponent={
            <>
              {/* Premium profile details */}
              <ProfileHeader
                user={profile}
                onEditProfile={handleEditProfile}
                onSettings={handleSettingsPress}
              />

              {/* Feed Tabs Selector */}
              <View style={styles.tabBar}>
                <Pressable
                  onPress={() => setActiveTab('history')}
                  style={[styles.tabItem, activeTab === 'history' && styles.activeTabItem]}
                >
                  <Film size={20} color={activeTab === 'history' ? theme.colors.primary : theme.colors.textMuted} />
                  <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
                    Watch History
                  </Text>
                </Pressable>
                
                <Pressable
                  onPress={() => setActiveTab('liked')}
                  style={[styles.tabItem, activeTab === 'liked' && styles.activeTabItem]}
                >
                  <Heart size={20} color={activeTab === 'liked' ? theme.colors.primary : theme.colors.textMuted} />
                  <Text style={[styles.tabText, activeTab === 'liked' && styles.activeTabText]}>
                    Liked Videos
                  </Text>
                </Pressable>
              </View>
            </>
          }
          renderItem={renderGridItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !isGridLoading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {activeTab === 'history'
                    ? 'No watch history yet. Start watching now!'
                    : 'No liked videos yet. Double tap posts to add!'}
                </Text>
              </View>
            ) : null
          }
        />
      </ScreenState>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? 36 : 0,
  },
  listContent: {
    paddingBottom: 100,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    marginTop: 8,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  activeTabItem: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textMuted,
  },
  activeTabText: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
  },
  gridItem: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 1.2,
    padding: 1,
    position: 'relative',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  gridItemPressed: {
    opacity: 0.8,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.card,
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  gridViewsText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    textAlign: 'center',
    lineHeight: 18,
  },
});
