/**
 * Button — Premium button with gradient variant & press animation
 */
import React, { useRef } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle, Platform, Animated, View } from 'react-native';
import { theme } from '../../theme/theme';
import { SCALE, DURATION, EASING } from '../../theme/animations';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'solid' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'solid',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: SCALE.pressIn,
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

  const getButtonStyles = (): ViewStyle[] => {
    const stylesList: ViewStyle[] = [styles.base];

    if (variant === 'solid') {
      stylesList.push({
        backgroundColor: theme.colors.primary,
        borderColor: 'transparent',
      });
    } else if (variant === 'outline') {
      stylesList.push({
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
      });
    } else if (variant === 'ghost') {
      stylesList.push({
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      });
    } else if (variant === 'gradient') {
      stylesList.push({
        borderColor: 'transparent',
        overflow: 'hidden',
      });
    }

    if (size === 'sm') stylesList.push(styles.sm);
    else if (size === 'lg') stylesList.push(styles.lg);
    else stylesList.push(styles.md);

    if (fullWidth) stylesList.push({ width: '100%' } as ViewStyle);
    if (disabled || loading) stylesList.push(styles.disabled);
    if (style) stylesList.push(style);

    return stylesList;
  };

  const getTextColor = (): string => {
    if (variant === 'outline') return theme.colors.primary;
    if (variant === 'ghost') return theme.colors.primary;
    return '#FFFFFF';
  };

  const getTextSize = (): number => {
    if (size === 'sm') return 12;
    if (size === 'lg') return 16;
    return 14;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={getButtonStyles()}
      >
        {/* Gradient background for gradient variant */}
        {variant === 'gradient' && (
          <>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.primary, borderRadius: 12 }]} />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.secondary, borderRadius: 12, opacity: 0.5, left: '40%' }]} />
          </>
        )}

        {loading ? (
          <ActivityIndicator
            color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : '#FFF'}
            size="small"
          />
        ) : (
          <View style={styles.contentRow}>
            {icon && iconPosition === 'left' && (
              <View style={styles.iconLeft}>{icon}</View>
            )}
            <Text
              style={[
                styles.textBase,
                {
                  color: getTextColor(),
                  fontSize: getTextSize(),
                  zIndex: 1,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
            {icon && iconPosition === 'right' && (
              <View style={styles.iconRight}>{icon}</View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      } as any,
    }),
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 8,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 46,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    height: 54,
    borderRadius: 14,
  },
  disabled: {
    opacity: 0.5,
    ...Platform.select({
      web: { cursor: 'not-allowed' } as any,
    }),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textBase: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
