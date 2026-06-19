/**
 * UserAvatar — Premium avatar with gradient ring & status indicator
 */
import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { LAYOUT } from '../../theme/spacing';

interface UserAvatarProps {
  uri?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  showStatusIndicator?: boolean;
  statusColor?: string;
  showRing?: boolean;
  ringColor?: string;
  style?: ViewStyle;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  uri,
  size = 'md',
  showStatusIndicator = false,
  statusColor = theme.colors.success,
  showRing = false,
  ringColor,
  style,
}) => {
  const avatarSize = LAYOUT.AVATAR_SIZES[size];
  const ringWidth = size === 'xl' || size === 'xxl' ? 2.5 : size === 'lg' ? 2 : 1.5;
  const statusSize = Math.max(avatarSize * 0.26, 8);
  const defaultImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

  return (
    <View style={[{ width: avatarSize, height: avatarSize }, style]}>
      {/* Gradient ring */}
      {showRing && (
        <View
          style={[
            styles.ringOuter,
            {
              width: avatarSize + ringWidth * 4,
              height: avatarSize + ringWidth * 4,
              borderRadius: (avatarSize + ringWidth * 4) / 2,
              position: 'absolute',
              top: -(ringWidth * 2),
              left: -(ringWidth * 2),
            },
          ]}
        >
          <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.primary, borderRadius: 9999 }]} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.secondary, borderRadius: 9999, opacity: 0.5, left: '30%' }]} />
          <View
            style={[
              styles.ringInner,
              {
                width: avatarSize + ringWidth * 2,
                height: avatarSize + ringWidth * 2,
                borderRadius: (avatarSize + ringWidth * 2) / 2,
              },
            ]}
          />
        </View>
      )}

      {/* Avatar image */}
      <Image
        source={{ uri: uri || defaultImage }}
        style={[
          styles.image,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            borderWidth: showRing ? 0 : ringWidth,
            borderColor: showRing ? 'transparent' : theme.colors.border,
          },
        ]}
      />

      {/* Status dot */}
      {showStatusIndicator && (
        <View
          style={[
            styles.status,
            {
              backgroundColor: statusColor,
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              bottom: 0,
              right: 0,
              borderWidth: 2,
              borderColor: theme.colors.background,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: theme.colors.surface,
  },
  ringOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ringInner: {
    backgroundColor: theme.colors.background,
    zIndex: 1,
  },
  status: {
    position: 'absolute',
  },
});
