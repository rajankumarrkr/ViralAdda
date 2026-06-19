/**
 * FloatingTabBar — Custom floating bottom navigation with glassmorphism
 * Center upload button with gradient & scale animation.
 */
import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Film, Plus, Search, User } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { LAYOUT, SPACING } from '../../theme/spacing';
import { DURATION, EASING, SCALE } from '../../theme/animations';

const TAB_ICONS: Record<string, typeof Home> = {
  Home: Home,
  Shorts: Film,
  Upload: Plus,
  Search: Search,
  Profile: User,
};

const TAB_LABELS: Record<string, string> = {
  Home: 'Home',
  Shorts: 'Shorts',
  Upload: '',
  Search: 'Search',
  Profile: 'Profile',
};

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.tabBar}>
        {/* Glass background layers */}
        <View style={styles.glassBg} />
        <View style={styles.glassBorder} />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isUpload = route.name === 'Upload';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isUpload) {
            return (
              <UploadTabButton key={route.key} onPress={onPress} />
            );
          }

          return (
            <TabItem
              key={route.key}
              name={route.name}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

/** Individual tab item */
function TabItem({ name, isFocused, onPress }: { name: string; isFocused: boolean; onPress: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dotAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(dotAnim, {
      toValue: isFocused ? 1 : 0,
      duration: DURATION.fast,
      easing: EASING.standard,
      useNativeDriver: true,
    }).start();
  }, [isFocused, dotAnim]);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: SCALE.pressInHeavy,
      duration: DURATION.instant,
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

  const Icon = TAB_ICONS[name] || Home;
  const label = TAB_LABELS[name] || name;
  const iconColor = isFocused ? theme.colors.text : theme.colors.textMuted;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabItem}
    >
      <Animated.View style={[styles.tabIconContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Icon size={22} color={iconColor} />
        <Text style={[styles.tabLabel, { color: iconColor }]}>{label}</Text>
        {/* Active dot indicator */}
        <Animated.View
          style={[
            styles.activeDot,
            {
              opacity: dotAnim,
              transform: [{ scale: dotAnim }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

/** Center upload button with gradient & pulse */
function UploadTabButton({ onPress }: { onPress: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1500,
          easing: EASING.standard,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: EASING.standard,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.85,
      duration: DURATION.instant,
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

  return (
    <View style={styles.uploadContainer}>
      {/* Glow ring */}
      <Animated.View style={[styles.uploadGlow, { transform: [{ scale: pulseAnim }] }]} />

      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.uploadButton, { transform: [{ scale: scaleAnim }] }]}>
          {/* Gradient layers */}
          <View style={[StyleSheet.absoluteFill, styles.gradientBase]} />
          <View style={[StyleSheet.absoluteFill, styles.gradientOverlay]} />
          <Plus size={26} color="#FFFFFF" style={{ zIndex: 1 }} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const { width: screenWidth } = Dimensions.get('window');
const TAB_BAR_WIDTH = Math.min(screenWidth - 32, 400);

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: TAB_BAR_WIDTH,
    height: LAYOUT.BOTTOM_TAB_HEIGHT,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    ...theme.shadows.lg,
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 15, 22, 0.92)',
  },
  glassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 22,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 2,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 3,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    marginTop: 3,
  },
  // Upload center button
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    marginTop: -20,
    zIndex: 3,
  },
  uploadGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
  },
  uploadButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...theme.shadows.glow,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  gradientBase: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
  },
  gradientOverlay: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    opacity: 0.5,
    left: '40%',
  },
});
