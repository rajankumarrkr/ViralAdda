import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, Platform } from 'react-native';
import { theme } from '../../theme/theme';
import { Button } from '../../components/common/Button';
import { Flame, Sparkles, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PAGES = [
  {
    icon: <Flame size={64} color={theme.colors.primary} />,
    title: 'Discover What Is Hot & Trending',
    description: 'Explore viral shorts, music videos, movie trailers, and full-length episodes curated specifically for you.',
  },
  {
    icon: <TrendingUp size={64} color={theme.colors.secondary} />,
    title: 'Share Your Creativity with the World',
    description: 'Upload high-definition clips, manage your channel stats, and connect instantly with a global audience.',
  },
  {
    icon: <Sparkles size={64} color={theme.colors.success} />,
    title: 'Experience Dark Premium Streaming',
    description: 'Beautiful glassmorphic styles, modern controls, zero lag, and an immersive theater mode interface.',
  },
];

export function OnboardingScreen({ navigation }: { navigation: any }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < PAGES.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.slideContainer}>
        <View style={styles.iconContainer}>{PAGES[currentPage].icon}</View>
        <Text style={styles.title}>{PAGES[currentPage].title}</Text>
        <Text style={styles.description}>{PAGES[currentPage].description}</Text>
      </View>

      <View style={styles.footer}>
        {/* Progress Dots */}
        <View style={styles.dotsRow}>
          {PAGES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentPage === i ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <Button
          title={currentPage === PAGES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="solid"
          style={styles.actionBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing.lg,
  },
  skipBtn: {
    padding: theme.spacing.xs,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  skipText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.weights.heavy,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.lineHeights.xl,
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.md,
  },
  footer: {
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xl,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: theme.colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: theme.colors.border,
  },
  actionBtn: {
    width: '100%',
    maxWidth: 300,
  },
});
