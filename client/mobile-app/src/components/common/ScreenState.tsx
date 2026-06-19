/**
 * ScreenState — Premium loading, error, and empty states
 * Replaces ActivityIndicator with shimmer skeleton loaders.
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { theme } from '../../theme/theme';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';
import { VideoCardSkeleton } from './ShimmerPlaceholder';

interface ScreenStateProps {
  loading?: boolean;
  error?: unknown;
  children: React.ReactNode;
  onRetry?: () => void;
  skeletonCount?: number;
}

export function ScreenState({ loading, error, children, onRetry, skeletonCount = 3 }: ScreenStateProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIconCircle}>
          <AlertTriangle size={28} color={theme.colors.error} />
        </View>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>
          We couldn't load the content. Please check your connection and try again.
        </Text>
        {onRetry && (
          <Pressable onPress={onRetry} style={styles.retryButton}>
            <RefreshCw size={16} color={theme.colors.text} />
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    color: theme.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  retryText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});
