import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { theme } from '../../theme/theme';

export function SplashScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Animated-feeling Pulse Brand Ring */}
        <View style={styles.ring}>
          <Text style={styles.logoText}>VA</Text>
        </View>
        <Text style={styles.brandTitle}>ViralAdda</Text>
        <Text style={styles.brandTagline}>The Premium Video Hub</Text>
      </View>
      <View style={styles.footer}>
        <ActivityIndicator color={theme.colors.primary} size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  ring: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  logoText: {
    fontSize: 36,
    fontWeight: theme.typography.weights.heavy,
    color: theme.colors.text,
  },
  brandTitle: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.weights.heavy,
    color: theme.colors.text,
    letterSpacing: 1.5,
  },
  brandTagline: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
  },
});
