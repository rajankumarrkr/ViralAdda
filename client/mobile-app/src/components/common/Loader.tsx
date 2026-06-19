/**
 * Loader — Premium branded loading experience
 * Pulsing animation with ViralAdda branding.
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { Sparkles } from 'lucide-react-native';
import { DURATION, EASING } from '../../theme/animations';

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  message,
  size = 'large',
  style,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: DURATION.slow,
            easing: EASING.standard,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: DURATION.slow,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: DURATION.slow,
            easing: EASING.standard,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: DURATION.slow,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim, opacityAnim]);

  const iconSize = size === 'large' ? 36 : 24;

  const content = (
    <View style={[styles.content, style]}>
      <Animated.View
        style={[
          styles.iconContainer,
          size === 'large' && styles.iconContainerLarge,
          {
            transform: [{ scale: pulseAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Sparkles size={iconSize} color={theme.colors.primary} />
      </Animated.View>
      {message && <Text style={styles.messageText}>{message}</Text>}
    </View>
  );

  if (fullScreen) {
    return <View style={styles.fullScreenContainer}>{content}</View>;
  }

  return content;
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  messageText: {
    marginTop: 16,
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
});
