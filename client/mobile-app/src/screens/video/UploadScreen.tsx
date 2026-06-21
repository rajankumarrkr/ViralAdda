import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Alert, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { Upload, Sparkles, Film, Music, ArrowRight, Image as ImageIcon, CheckCircle } from 'lucide-react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useUploadVideoMutation } from '../../api/videos/videosApi';
import { useAppSelector } from '../../hooks/redux';
import * as ImagePicker from 'expo-image-picker';

export function UploadScreen() {
  const navigation = useNavigation<any>();
  const token = useAppSelector((state) => state.auth.accessToken);
  const [uploadVideo, { isLoading: isUploading }] = useUploadVideoMutation();

  const [selectedVideo, setSelectedVideo] = useState<{ uri: string; name: string; type: string } | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<{ uri: string; name: string; type: string } | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState('');

  const categories = [
    { label: 'Gaming', value: 'gaming' },
    { label: 'Music', value: 'music' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Tech', value: 'tech' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Education', value: 'education' },
  ];

  const handlePickVideo = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to select a video.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedVideo({
          uri: asset.uri,
          name: asset.fileName || 'video.mp4',
          type: asset.mimeType || 'video/mp4',
        });
        const baseName = asset.fileName ? asset.fileName.replace(/\.[^/.]+$/, "") : "My New Video";
        setTitle(baseName);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Error', 'Failed to pick video');
    }
  };

  const handlePickThumbnail = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to select a thumbnail.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedThumbnail({
          uri: asset.uri,
          name: asset.fileName || 'thumbnail.jpg',
          type: asset.mimeType || 'image/jpeg',
        });
      }
    } catch (error) {
      console.error('Error picking thumbnail:', error);
      Alert.alert('Error', 'Failed to pick thumbnail');
    }
  };

  const handleUpload = async () => {
    if (!token) {
      Alert.alert('Unauthorized', 'Please log in to upload videos.');
      return;
    }
    if (!selectedVideo) {
      setFormError('Please select a video file first');
      return;
    }
    if (title.trim().length < 2 || title.trim().length > 120) {
      setFormError('Title must be between 2 and 120 characters');
      return;
    }
    setFormError('');

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      if (description.trim()) formData.append('description', description.trim());
      if (category) formData.append('category', category);

      if (Platform.OS === 'web') {
        const response = await fetch(selectedVideo.uri);
        const blob = await response.blob();
        (formData as any).append('video', blob, selectedVideo.name);
      } else {
        formData.append('video', {
          uri: selectedVideo.uri,
          name: selectedVideo.name,
          type: selectedVideo.type,
        } as any);
      }

      if (selectedThumbnail) {
        if (Platform.OS === 'web') {
          const response = await fetch(selectedThumbnail.uri);
          const blob = await response.blob();
          (formData as any).append('thumbnail', blob, selectedThumbnail.name);
        } else {
          formData.append('thumbnail', {
            uri: selectedThumbnail.uri,
            name: selectedThumbnail.name,
            type: selectedThumbnail.type,
          } as any);
        }
      }

      await uploadVideo(formData).unwrap();
      Alert.alert('Success', 'Video uploaded successfully! It is pending review.');
      handleCancel();
    } catch (err: any) {
      console.error('Upload failed:', err);
      setFormError(err?.data?.message || 'Upload failed. Please try again.');
    }
  };

  const handleCancel = () => {
    setSelectedVideo(null);
    setSelectedThumbnail(null);
    setTitle('');
    setDescription('');
    setCategory('');
    setFormError('');
  };

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.guestContainer}>
          <View style={styles.guestIconContainer}>
            <View style={styles.guestIconRing}>
              <Upload size={36} color={theme.colors.primary} />
            </View>
          </View>
          <Text style={styles.guestTitle}>Unlock Creator Studio</Text>
          <Text style={styles.guestSubtitle}>
            Sign in to ViralAdda to upload videos, share original audio, and reach millions of viewers worldwide.
          </Text>
          
          <View style={styles.guestButtonGroup}>
            <Button
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
              variant="gradient"
              style={styles.guestButton}
            />
            <Button
              title="Create Account"
              onPress={() => navigation.navigate('Register')}
              variant="outline"
              style={styles.guestButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.glowOverlay} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Sparkles size={28} color={theme.colors.primary} />
          <Text style={styles.title}>Creator Studio</Text>
          <Text style={styles.subtitle}>Upload your next viral masterpiece</Text>
        </View>

        {formError ? <Text style={styles.errorTextBanner}>{formError}</Text> : null}

        {!selectedVideo ? (
          <>
            {/* Upload Card */}
            <Pressable 
              onPress={handlePickVideo}
              style={({ pressed }) => [styles.uploadCard, pressed && styles.uploadCardPressed]}
            >
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
          </>
        ) : (
          <View style={styles.formContainer}>
            {/* Video File Indicator */}
            <View style={styles.videoFileCard}>
              <CheckCircle size={20} color={theme.colors.success} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.videoFileName} numberOfLines={1}>
                  {selectedVideo.name}
                </Text>
                <Text style={styles.videoFileType}>
                  Selected Video File
                </Text>
              </View>
            </View>

            {/* Title Input */}
            <Input
              label="Video Title (required)"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. My Awesome Short Video"
              maxLength={120}
              editable={!isUploading}
            />

            {/* Description Input */}
            <Input
              label="Description (optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Tell your viewers about your video..."
              multiline
              numberOfLines={4}
              maxLength={2000}
              inputStyle={{ height: 80, paddingTop: 10, textAlignVertical: 'top' }}
              editable={!isUploading}
            />

            {/* Category Selector */}
            <Text style={styles.sectionLabel}>Category (optional)</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat.value}
                  onPress={() => !isUploading && setCategory(cat.value)}
                  style={[
                    styles.categoryChip,
                    category === cat.value && styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat.value && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Thumbnail Picker */}
            <Pressable
              onPress={handlePickThumbnail}
              disabled={isUploading}
              style={({ pressed }) => [
                styles.thumbnailPicker,
                pressed && styles.thumbnailPickerPressed,
                selectedThumbnail && styles.thumbnailPickerSelected,
              ]}
            >
              <ImageIcon size={18} color={selectedThumbnail ? theme.colors.success : theme.colors.textMuted} />
              <Text
                style={[
                  styles.thumbnailPickerText,
                  selectedThumbnail && styles.thumbnailPickerTextSelected,
                ]}
              >
                {selectedThumbnail ? `Thumbnail: ${selectedThumbnail.name}` : 'Choose Custom Thumbnail (optional)'}
              </Text>
            </Pressable>

            {/* Action Buttons */}
            <View style={styles.actionButtonGroup}>
              <Button
                title={isUploading ? 'Uploading video...' : 'Upload Video'}
                onPress={handleUpload}
                variant="gradient"
                loading={isUploading}
                style={styles.actionButton}
              />
              <Button
                title="Cancel"
                onPress={handleCancel}
                variant="ghost"
                disabled={isUploading}
                style={styles.actionButton}
                textStyle={{ color: theme.colors.textMuted }}
              />
            </View>
          </View>
        )}

        {/* Status Area */}
        <View style={styles.statusSection}>
          <View style={styles.statusIndicator} />
          <Text style={styles.statusText}>Beta Creator Program is currently invite-only</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
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
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
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
  errorTextBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: theme.colors.error,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    width: '100%',
    maxWidth: 450,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  formContainer: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  videoFileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  videoFileName: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
  videoFileType: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  sectionLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing.md,
  },
  categoryChip: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  categoryChipActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderColor: theme.colors.primary,
  },
  categoryChipText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: theme.typography.weights.medium,
  },
  categoryChipTextActive: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
  },
  thumbnailPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    gap: 10,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  thumbnailPickerPressed: {
    opacity: 0.8,
  },
  thumbnailPickerSelected: {
    borderStyle: 'solid',
    borderColor: theme.colors.success,
  },
  thumbnailPickerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
  },
  thumbnailPickerTextSelected: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.medium,
  },
  actionButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: theme.colors.background,
  },
  guestIconContainer: {
    marginBottom: 24,
  },
  guestIconRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    ...theme.shadows.glowSubtle,
  },
  guestTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  guestSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
    marginBottom: 32,
  },
  guestButtonGroup: {
    width: '100%',
    maxWidth: 280,
    gap: 12,
  },
  guestButton: {
    width: '100%',
  },
});

