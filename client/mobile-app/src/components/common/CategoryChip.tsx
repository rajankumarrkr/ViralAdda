/**
 * CategoryChip — Premium category pill with gradient selection
 */
import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Platform, Animated, View } from 'react-native';
import { theme } from '../../theme/theme';
import { SCALE, DURATION, EASING } from '../../theme/animations';

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string; // Emoji icon
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  selected,
  onPress,
  icon,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: SCALE.pressInSubtle,
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

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.chip, selected ? styles.selectedChip : styles.unselectedChip]}
      >
        {/* Gradient simulation for selected state */}
        {selected && (
          <>
            <View style={[StyleSheet.absoluteFill, styles.gradientBase]} />
            <View style={[StyleSheet.absoluteFill, styles.gradientOverlay]} />
          </>
        )}
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text
          style={[
            styles.text,
            selected ? styles.selectedText : styles.unselectedText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 36,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  selectedChip: {
    borderColor: 'transparent',
  },
  unselectedChip: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
  },
  gradientBase: {
    backgroundColor: theme.colors.primary,
    borderRadius: 9999,
  },
  gradientOverlay: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 9999,
    opacity: 0.5,
    left: '40%',
  },
  icon: {
    fontSize: 14,
    marginRight: 4,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    zIndex: 1,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: theme.colors.textMuted,
  },
});
