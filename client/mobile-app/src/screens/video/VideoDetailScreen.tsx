import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Image, KeyboardAvoidingView, TextInput, Animated } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useVideoQuery, useVideosQuery } from '../../api/videos/videosApi';
import { useAddCommentMutation, useCommentsQuery } from '../../api/comments/commentsApi';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { ScreenState } from '../../components/common/ScreenState';
import { theme } from '../../theme/theme';
import { UserAvatar } from '../../components/common/UserAvatar';
import { Button } from '../../components/common/Button';
import { ThumbsUp, MessageSquare, Share2, Play, Eye, Calendar, Sparkles, Send } from 'lucide-react-native';

export function VideoDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'VideoDetail'>>();
  const navigation = useNavigation<any>();
  const { data: video, isLoading, error } = useVideoQuery(route.params.id);
  const { data: comments } = useCommentsQuery(route.params.id);
  const { data: relatedData } = useVideosQuery({ sort: 'latest' });
  
  const [comment, setComment] = useState('');
  const [addComment, { isLoading: posting }] = useAddCommentMutation();
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [localLiked, setLocalLiked] = useState(false);
  const [localSubscribed, setLocalSubscribed] = useState(false);

  const likeScale = useRef(new Animated.Value(1)).current;

  const submit = async () => {
    if (!comment.trim()) return;
    try {
      await addComment({ videoId: route.params.id, comment }).unwrap();
      setComment('');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLikePress = () => {
    setLocalLiked(prev => !prev);
    
    // Spring feedback animation
    likeScale.setValue(0.7);
    Animated.spring(likeScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const handleSubscribePress = () => {
    setLocalSubscribed(prev => !prev);
  };

  const relatedVideos = relatedData?.data?.filter((v: any) => v.id !== route.params.id) || [];
  const likesCount = (video?.likesCount || 0) + (localLiked ? 1 : 0);

  return (
    <ScreenState loading={isLoading} error={error}>
      {video ? (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Custom Web/App Player component - fallback image preview */}
          <View style={styles.playerWrapper}>
            <Image
              source={{ uri: video.thumbnailUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80' }}
              style={styles.playerFallbackImage}
              resizeMode="cover"
            />
            {/* Visual gradient overlays on player */}
            <View style={styles.playerGradientTop} />
            <View style={styles.playerGradientBottom} />
            
            <View style={styles.playerPlayBtn}>
              <Play size={28} color="#FFF" fill="#FFF" />
            </View>
          </View>

          <ScrollView style={styles.contentScroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Title & Stats */}
            <Text style={styles.title}>{video.title}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statMeta}>
                <Eye size={12} color={theme.colors.textMuted} />
                <Text style={styles.viewsCount}>{video.views} views</Text>
              </View>
              <Text style={styles.dotDivider}>•</Text>
              <View style={styles.statMeta}>
                <Calendar size={12} color={theme.colors.textMuted} />
                <Text style={styles.viewsCount}>
                  {new Date(video.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </View>
            </View>

            {/* Quick Actions Row */}
            <View style={styles.actionsRow}>
              <Pressable onPress={handleLikePress} style={styles.actionItem}>
                <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                  <ThumbsUp
                    size={20}
                    color={localLiked ? theme.colors.primary : theme.colors.text}
                    fill={localLiked ? theme.colors.primary : 'transparent'}
                  />
                </Animated.View>
                <Text style={[styles.actionLabel, localLiked && styles.actionLabelActive]}>
                  {likesCount}
                </Text>
              </Pressable>
              
              <View style={styles.actionItem}>
                <MessageSquare size={20} color={theme.colors.text} />
                <Text style={styles.actionLabel}>
                  {comments?.data?.length || 0} Comments
                </Text>
              </View>

              <Pressable style={styles.actionItem}>
                <Share2 size={20} color={theme.colors.text} />
                <Text style={styles.actionLabel}>Share</Text>
              </Pressable>
            </View>

            {/* Channel Info Row */}
            <View style={styles.channelRow}>
              <View style={styles.channelInfo}>
                <UserAvatar uri={video.uploadedBy?.profileImage} size="md" showRing />
                <View style={{ marginLeft: theme.spacing.sm }}>
                  <Text style={styles.channelName}>{video.uploadedBy?.username || 'ViralAdda Creator'}</Text>
                  <Text style={styles.subscribersCount}>425K subscribers</Text>
                </View>
              </View>
              <Button
                title={localSubscribed ? "Subscribed" : "Subscribe"}
                onPress={handleSubscribePress}
                variant={localSubscribed ? "outline" : "solid"}
                size="sm"
                style={styles.subBtn}
              />
            </View>

            {/* Description Card */}
            <Pressable
              onPress={() => setIsDescExpanded(!isDescExpanded)}
              style={styles.descriptionCard}
            >
              <Text
                style={styles.descriptionText}
                numberOfLines={isDescExpanded ? undefined : 2}
              >
                {video.description || 'No description provided for this video.'}
              </Text>
              <Text style={styles.showMoreLink}>
                {isDescExpanded ? 'Show less' : 'Show more'}
              </Text>
            </Pressable>

            {/* Comments Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Comments ({comments?.data?.length || 0})</Text>
            </View>

            {/* Add Comment input */}
            <View style={styles.commentInputRow}>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Add a comment..."
                placeholderTextColor={theme.colors.textMuted}
                style={styles.commentInput}
              />
              <Pressable
                onPress={submit}
                disabled={posting || !comment.trim()}
                style={({ pressed }) => [
                  styles.sendButton,
                  (!comment.trim() || posting) && styles.sendButtonDisabled,
                  pressed && styles.sendButtonPressed
                ]}
              >
                <Send size={18} color="#FFF" />
              </Pressable>
            </View>

            {/* Comments list inside scroll */}
            {comments?.data && comments.data.length > 0 ? (
              <View style={styles.commentsList}>
                {comments.data.map((item: any) => (
                  <View key={item.id} style={styles.commentItem}>
                    <UserAvatar size="xs" uri={item.user?.profileImage} style={styles.commentAvatar} />
                    <View style={styles.commentDetails}>
                      <Text style={styles.commentAuthor}>{item.user?.username || 'User'}</Text>
                      <Text style={styles.commentBody}>{item.comment}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noComments}>Be the first to share your thoughts!</Text>
            )}

            {/* Related/Recommended Videos */}
            {relatedVideos.length > 0 && (
              <View style={styles.relatedSection}>
                <Text style={styles.sectionTitle}>Up Next</Text>
                <View style={{ marginTop: theme.spacing.md }}>
                  {relatedVideos.map((item: any) => (
                    <Pressable
                      key={item.id}
                      onPress={() => navigation.replace('VideoDetail', { id: item.id })}
                      style={styles.relatedCard}
                    >
                      <Image source={{ uri: item.thumbnailUrl }} style={styles.relatedThumb} />
                      <View style={styles.relatedInfo}>
                        <Text style={styles.relatedTitle} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <Text style={styles.relatedCreator} numberOfLines={1}>
                          {item.uploadedBy?.username || 'ViralAdda Creator'}
                        </Text>
                        <View style={styles.relatedMeta}>
                          <Eye size={10} color={theme.colors.textMuted} />
                          <Text style={styles.relatedMetaText}>{item.views} views</Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      ) : null}
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  playerWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerFallbackImage: {
    width: '100%',
    height: '100%',
  },
  playerGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: 'rgba(11, 11, 15, 0.4)',
  },
  playerGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: 'rgba(11, 11, 15, 0.4)',
  },
  playerPlayBtn: {
    position: 'absolute',
    backgroundColor: theme.colors.primary,
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 60,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.weights.heavy,
    lineHeight: 22,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: 8,
  },
  statMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewsCount: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
  },
  dotDivider: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md,
    gap: 24,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  actionLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
  actionLabelActive: {
    color: theme.colors.primary,
  },
  channelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelName: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.weights.bold,
  },
  subscribersCount: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  subBtn: {
    height: 32,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
  },
  descriptionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  descriptionText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    lineHeight: 18,
  },
  showMoreLink: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: theme.typography.weights.bold,
    marginTop: theme.spacing.xs,
  },
  sectionHeader: {
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.weights.heavy,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  commentInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    height: 44,
    fontSize: theme.typography.fontSizes.xs,
    ...Platform.select({
      web: { outlineStyle: 'none' } as any,
    }),
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' } as any,
    }),
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
  sendButtonPressed: {
    opacity: 0.8,
  },
  commentsList: {
    gap: theme.spacing.md,
  },
  commentItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  commentAvatar: {
    marginRight: theme.spacing.sm,
  },
  commentDetails: {
    flex: 1,
  },
  commentAuthor: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
    marginBottom: 4,
  },
  commentBody: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.xs,
    lineHeight: 16,
  },
  noComments: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  relatedSection: {
    marginTop: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.xl,
  },
  relatedCard: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  relatedThumb: {
    width: 110,
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  relatedInfo: {
    flex: 1,
    padding: theme.spacing.sm,
    justifyContent: 'center',
  },
  relatedTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
    lineHeight: 14,
    marginBottom: 4,
  },
  relatedCreator: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginBottom: 2,
  },
  relatedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedMetaText: {
    color: theme.colors.textMuted,
    fontSize: 9,
    marginLeft: 4,
  },
});
