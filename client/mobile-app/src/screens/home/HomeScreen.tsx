import React, { useState } from 'react';
import { FlatList, RefreshControl, View, Text, StyleSheet, ScrollView, Pressable, Platform, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideosQuery } from '../../api/videos/videosApi';
import { useProfileQuery } from '../../api/users/usersApi';
import { VideoCard } from '../../components/video/VideoCard';
import { HeroBanner } from '../../components/video/HeroBanner';
import { CategoryChip } from '../../components/common/CategoryChip';
import { UserAvatar } from '../../components/common/UserAvatar';
import { VideoCardSkeleton, HeroBannerSkeleton } from '../../components/common/ShimmerPlaceholder';
import { theme } from '../../theme/theme';
import { Sparkles, Bell, Search } from 'lucide-react-native';

const CATEGORIES = ['All', 'Trending', 'Comedy', 'Movies', 'Gaming', 'News', 'Education', 'Music'];

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { data, isLoading, error, refetch, isFetching } = useVideosQuery({
    sort: 'trending',
    search: selectedCategory === 'All' ? undefined : selectedCategory
  });
  
  const { data: profile } = useProfileQuery();

  const videos = data?.data ?? [];
  const featuredVideo = videos[0];
  const feedVideos = videos.slice(1);

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    // Notify or open modal (mock action)
    Alert.alert('Notifications', 'No new notifications');
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        {/* Horizontal Category Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* Featured Hero Banner */}
        {featuredVideo ? (
          <HeroBanner
            title={featuredVideo.title}
            thumbnailUrl={featuredVideo.thumbnailUrl}
            creator={featuredVideo.uploadedBy?.username || 'ViralAdda Creator'}
            views={featuredVideo.views}
            onPress={() => navigation.navigate('VideoDetail', { id: featuredVideo.id })}
          />
        ) : !isLoading ? (
          <View style={styles.noFeatured}>
            <Text style={styles.noFeaturedText}>No featured videos found</Text>
          </View>
        ) : null}
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Top Navbar */}
        <View style={styles.topRow}>
          <View style={styles.logoRow}>
            <Sparkles size={24} color={theme.colors.primary} />
            <Text style={styles.logoText}>ViralAdda</Text>
          </View>
          <View style={styles.rightActions}>
            <Pressable style={styles.iconButton}>
              <Search size={22} color={theme.colors.text} />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Bell size={22} color={theme.colors.text} />
            </Pressable>
            <UserAvatar size="sm" />
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
          <HeroBannerSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.topRow}>
        <View style={styles.logoRow}>
          <Sparkles size={24} color={theme.colors.primary} />
          <Text style={styles.logoText}>ViralAdda</Text>
        </View>
        <View style={styles.rightActions}>
          <Pressable onPress={handleSearchPress} style={styles.iconButton}>
            <Search size={22} color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={handleNotificationPress} style={styles.iconButton}>
            <Bell size={22} color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={handleProfilePress}>
            <UserAvatar uri={profile?.profileImage} size="sm" />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={feedVideos}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            onPress={() => navigation.navigate('VideoDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No videos found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? 36 : 0,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.weights.heavy,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  iconButton: {
    padding: theme.spacing.xs,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  headerContainer: {
    backgroundColor: theme.colors.background,
    paddingBottom: theme.spacing.sm,
  },
  categoriesContainer: {
    marginVertical: theme.spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: 100,
  },
  noFeatured: {
    marginHorizontal: theme.spacing.lg,
    height: 120,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
  },
  noFeaturedText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
  },
});
