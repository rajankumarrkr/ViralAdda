import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Platform, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideosQuery } from '../../api/videos/videosApi';
import { VideoCard } from '../../components/video/VideoCard';
import { VideoCardSkeleton } from '../../components/common/ShimmerPlaceholder';
import { theme } from '../../theme/theme';
import { Search, X, Flame, Compass, Sparkles, ChevronRight } from 'lucide-react-native';

const TRENDING_SEARCHES = [
  'cyberpunk lofi beats',
  'how to learn react native in 2026',
  'nextjs 16 tutorial',
  'indie gaming reviews',
  'marvel movies breakdown',
  'chill gaming playlist'
];

const DISCOVER_CATEGORIES = [
  { id: 'cat1', name: 'Comedy', color: '#FF3B30', icon: '🎭' },
  { id: 'cat2', name: 'Gaming', color: '#007AFF', icon: '🎮' },
  { id: 'cat3', name: 'Movies', color: '#FF9500', icon: '🎬' },
  { id: 'cat4', name: 'Music', color: '#4CD964', icon: '🎵' },
  { id: 'cat5', name: 'News', color: '#5856D6', icon: '📰' },
  { id: 'cat6', name: 'Education', color: '#FFCC00', icon: '🎓' },
  { id: 'cat7', name: 'Tech & AI', color: '#90e0ef', icon: '🤖' },
  { id: 'cat8', name: 'Sports', color: '#ff70a6', icon: '⚽' },
];

export function SearchScreen() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();
  const { data, isLoading } = useVideosQuery({ search }, { skip: !search });

  const handleClear = () => {
    setSearch('');
  };

  const handleTrendingPress = (term: string) => {
    setSearch(term);
  };

  const renderDiscovery = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.discoveryScroll}>
        {/* Trending Searches */}
        <View style={styles.sectionHeader}>
          <Flame size={18} color="#FF3B30" fill="#FF3B30" />
          <Text style={styles.sectionTitle}>Trending Searches</Text>
        </View>
        
        <View style={styles.trendingList}>
          {TRENDING_SEARCHES.map((term, index) => (
            <Pressable
              key={index}
              onPress={() => handleTrendingPress(term)}
              style={({ pressed }) => [styles.trendingItem, pressed && styles.trendingItemPressed]}
            >
              <Text style={styles.trendingText}>{term}</Text>
              <ChevronRight size={14} color={theme.colors.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* Categories Discovery */}
        <View style={styles.sectionHeader}>
          <Compass size={18} color={theme.colors.primary} />
          <Text style={styles.sectionTitle}>Discover Categories</Text>
        </View>

        <View style={styles.categoryGrid}>
          {DISCOVER_CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => handleTrendingPress(cat.name)}
              style={({ pressed }) => [
                styles.categoryCard,
                { borderLeftColor: cat.color },
                pressed && styles.categoryCardPressed
              ]}
            >
              <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input Container */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <Search size={18} color={theme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search creators, titles, tags..."
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {search.length > 0 && (
            <Pressable onPress={handleClear} style={styles.clearButton}>
              <X size={16} color={theme.colors.text} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Main Content Area */}
      {search.length === 0 ? (
        renderDiscovery()
      ) : isLoading ? (
        <ScrollView contentContainerStyle={styles.listContent}>
          <VideoCardSkeleton />
          <VideoCardSkeleton />
        </ScrollView>
      ) : (
        <FlatList
          data={data?.data ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <VideoCard
              video={item}
              onPress={() => navigation.navigate('VideoDetail', { id: item.id })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptySearchContainer}>
              <Sparkles size={40} color={theme.colors.textMuted} style={{ marginBottom: 12 }} />
              <Text style={styles.emptySearchTitle}>No results found</Text>
              <Text style={styles.emptySearchDesc}>Try searching for different keywords or categories.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? 36 : 0,
  },
  searchBarWrapper: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    height: 48,
    paddingHorizontal: theme.spacing.md,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    height: '100%',
    ...Platform.select({
      web: { outlineStyle: 'none' } as any,
    }),
  },
  clearButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  discoveryScroll: {
    padding: theme.spacing.lg,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    gap: 8,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.weights.heavy,
  },
  trendingList: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  trendingItemPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  trendingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.medium,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  categoryCard: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderLeftWidth: 4,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  categoryCardPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    transform: [{ scale: 0.98 }],
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryName: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
  listContent: {
    paddingVertical: theme.spacing.md,
    paddingBottom: 100,
  },
  emptySearchContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptySearchTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.weights.bold,
    marginBottom: 6,
  },
  emptySearchDesc: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    textAlign: 'center',
    lineHeight: 18,
  },
});
