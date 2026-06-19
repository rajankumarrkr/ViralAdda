/**
 * ProfileHeader — Instagram-style profile header with stats and gradient avatar ring
 */
import React from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import type { UserDto } from '@viraladda/shared-types';
import { theme } from '../../theme/theme';
import { UserAvatar } from '../common/UserAvatar';
import { Settings, Edit3 } from 'lucide-react-native';

interface ProfileHeaderProps {
  user?: UserDto;
  onEditProfile?: () => void;
  onSettings?: () => void;
}

export function ProfileHeader({ user, onEditProfile, onSettings }: ProfileHeaderProps) {
  const stats = [
    { label: 'Posts', value: (user as any)?.videosCount || 12 },
    { label: 'Followers', value: formatStat((user as any)?.followersCount || 1248) },
    { label: 'Following', value: formatStat((user as any)?.followingCount || 342) },
  ];

  return (
    <View style={styles.container}>
      {/* Top bar with settings */}
      <View style={styles.topRow}>
        <Text style={styles.username}>@{user?.username || 'Guest'}</Text>
        <View style={styles.topActions}>
          {onEditProfile && (
            <Pressable onPress={onEditProfile} style={styles.iconBtn}>
              <Edit3 size={20} color={theme.colors.text} />
            </Pressable>
          )}
          {onSettings && (
            <Pressable onPress={onSettings} style={styles.iconBtn}>
              <Settings size={20} color={theme.colors.text} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Avatar + Stats row */}
      <View style={styles.profileRow}>
        <UserAvatar
          uri={user?.profileImage}
          size="xl"
          showRing
        />
        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bio section */}
      <View style={styles.bioSection}>
        <Text style={styles.displayName}>{user?.username || 'Guest User'}</Text>
        {user?.email && (
          <Text style={styles.email}>{user.email}</Text>
        )}
        <Text style={styles.bio}>
          {(user as any)?.bio || '🎬 Content Creator on ViralAdda\n📱 Follow for daily content'}
        </Text>
      </View>
    </View>
  );
}

function formatStat(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  topActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  bioSection: {
    marginBottom: 16,
  },
  displayName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  email: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginBottom: 6,
  },
  bio: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
