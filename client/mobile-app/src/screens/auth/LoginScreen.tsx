import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Platform, Alert } from 'react-native';
import { useLoginMutation } from '../../api/auth/authApi';
import { setCredentials } from '../../redux/authSlice';
import { useAppDispatch } from '../../hooks/redux';
import { tokenStorage } from '../../services/storage';
import { theme } from '../../theme/theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react-native';

export function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const submit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    try {
      const auth = await login({ email, password }).unwrap();
      await tokenStorage.setTokens(auth.accessToken, auth.refreshToken);
      dispatch(setCredentials(auth));
      // Navigates automatically due to token state, but fallback to tabs if stack doesn't unmount
      navigation.navigate('Tabs');
    } catch (e: any) {
      setError(e?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.header}>
          <Text style={styles.brandTitle}>ViralAdda</Text>
          <Text style={styles.brandTagline}>Enter your credentials to stream premium content</Text>
        </View>

        {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

        <Input
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email address"
          leftIcon={<Mail size={18} color={theme.colors.textMuted} />}
        />

        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          leftIcon={<Lock size={18} color={theme.colors.textMuted} />}
        />

        <Button
          title={isLoading ? 'Logging you in...' : 'Sign In'}
          onPress={submit}
          variant="solid"
          icon={<LogIn size={18} color="#FFF" style={{ marginRight: 8 }} />}
          loading={isLoading}
          style={styles.loginBtn}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>New to ViralAdda? </Text>
          <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkBtn}>
            <Text style={styles.linkText}>Create Account</Text>
            <ArrowRight size={14} color={theme.colors.primary} style={{ marginLeft: 4 }} />
          </Pressable>
        </View>

        <Pressable onPress={() => navigation.navigate('Tabs')} style={styles.skipBtn}>
          <Text style={styles.skipText}>Continue as Guest</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
  cardWrapper: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: theme.typography.weights.heavy,
    color: theme.colors.text,
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: theme.colors.error,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  loginBtn: {
    marginTop: theme.spacing.md,
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
  skipBtn: {
    marginTop: theme.spacing.lg,
    alignSelf: 'center',
    padding: theme.spacing.xs,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  skipText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.medium,
    textDecorationLine: 'underline',
  },
});
