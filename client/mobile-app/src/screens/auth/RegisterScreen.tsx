import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Platform } from 'react-native';
import { useRegisterMutation } from '../../api/auth/authApi';
import { useAppDispatch } from '../../hooks/redux';
import { setCredentials } from '../../redux/authSlice';
import { tokenStorage } from '../../services/storage';
import { theme } from '../../theme/theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react-native';

export function RegisterScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const submit = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (username.trim().length < 3 || username.trim().length > 32) {
      setError('Username must be between 3 and 32 characters');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 8 || password.length > 72) {
      setError('Password must be between 8 and 72 characters');
      return;
    }
    setError('');
    try {
      const auth = await register({ username: username.trim(), email: email.trim(), password }).unwrap();
      await tokenStorage.setTokens(auth.accessToken, auth.refreshToken);
      dispatch(setCredentials(auth));
      navigation.navigate('Tabs');
    } catch (e: any) {
      if (e?.data?.errors?.fieldErrors) {
        const fieldErrors = e.data.errors.fieldErrors;
        const messages = Object.keys(fieldErrors)
          .map((field) => `${field.toUpperCase()}: ${fieldErrors[field].join(', ')}`)
          .join('\n');
        setError(messages);
      } else {
        setError(e?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Join ViralAdda</Text>
          <Text style={styles.brandTagline}>Create an account to start sharing and streaming</Text>
        </View>

        {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          leftIcon={<User size={18} color={theme.colors.textMuted} />}
        />

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
          title={isLoading ? 'Creating account...' : 'Create Account'}
          onPress={submit}
          variant="solid"
          icon={<UserPlus size={18} color="#FFF" style={{ marginRight: 8 }} />}
          loading={isLoading}
          style={styles.actionBtn}
        />

        <View style={styles.footerRow}>
          <Pressable onPress={() => navigation.navigate('Login')} style={styles.backBtn}>
            <ArrowLeft size={16} color={theme.colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.backText}>Back to Sign In</Text>
          </Pressable>
        </View>
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
    fontSize: 28,
    fontWeight: theme.typography.weights.heavy,
    color: theme.colors.text,
    letterSpacing: 0.5,
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
  actionBtn: {
    marginTop: theme.spacing.md,
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  backText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.weights.bold,
  },
});
