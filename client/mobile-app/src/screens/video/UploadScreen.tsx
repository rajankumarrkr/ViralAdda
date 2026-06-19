import React from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Alert } from 'react-native';
import { theme } from '../../theme/theme';
import { Upload, Sparkles, Film, Music, ArrowRight } from 'lucide-react-native';
import { Button } from '../../components/common/Button';

export function UploadScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.glowOverlay} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Sparkles size={28} color={theme.colors.primary} />
          <Text style={styles.title}>Creator Studio</Text>
          <Text style={styles.subtitle}>Upload your next viral masterpiece</Text>
        </View>

        {/* Upload UploadCard Option */}
        <Pressable style={({ pressed }) => [styles.uploadCard, pressed && styles.uploadCardPressed]}>
          <View style={styles.iconCircle}>
            <Upload size={38} color={theme.colors.primary} />
          </View>
          <Text style={styles.uploadTitle}>Select Video to Upload</Text>
          <Text style={styles.uploadDesc}>MP4 or MOV, up to 10 minutes (max 250MB)</Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Film size={12} color={theme.colors.textSecondary} />
              <Text style={styles.badgeText}>Shorts & Videos</Text>
            </View>
            <View style={styles.badge}>
              <Music size={12} color={theme.colors.textSecondary} />
              <Text style={styles.badgeText}>Original Audio</Text>
            </View>
          </View>
        </Pressable>

        {/* Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>🚀</Text>
            <Text style={styles.infoCardTitle}>High Definition</Text>
            <Text style={styles.infoCardText}>Supports up to 4K resolutions for stunning clarity.</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>⚡</Text>
            <Text style={styles.infoCardTitle}>Instant Share</Text>
            <Text style={styles.infoCardText}>Automated encoding for instantaneous streaming.</Text>
          </View>
        </View>

        {/* Status Area */}
        <View style={styles.statusSection}>
          <View style={styles.statusIndicator} />
          <Text style={styles.statusText}>Beta Creator Program is currently invite-only</Text>
        </View>

        {/* CTA */}
        <Button
          title="Apply for Creator Access"
          variant="solid"
          size="lg"
          style={styles.ctaButton}
          onPress={() => Alert.alert('Application Submitted', 'Your application is being reviewed. We will notify you soon!')}
        />
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
    padding: theme.spacing.lg,
  },
  glowOverlay: {
    position: 'absolute',
    top: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: theme.colors.primary,
    opacity: 0.1,
    filter: Platform.OS === 'web' ? 'blur(80px)' : undefined,
  },
  content: {
    width: '100%',
    maxWidth: 450,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.weights.heavy,
    marginTop: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    textAlign: 'center',
    marginTop: 4,
  },
  uploadCard: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.md,
  },
  uploadCardPressed: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(255, 59, 48, 0.02)',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  uploadTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.weights.bold,
    marginBottom: 4,
  },
  uploadDesc: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeText: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: theme.typography.weights.medium,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  infoCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  infoCardTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
    marginBottom: 4,
  },
  infoCardText: {
    color: theme.colors.textMuted,
    fontSize: 10,
    lineHeight: 14,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: 'rgba(255, 199, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 199, 0, 0.2)',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFC700',
  },
  statusText: {
    color: '#FFC700',
    fontSize: 11,
    fontWeight: theme.typography.weights.medium,
  },
  ctaButton: {
    width: '100%',
  },
});
