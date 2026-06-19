import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useLoginMutation } from '../services/adminApi';
import { setAdminAuth } from '../redux/authSlice';
import { useAppDispatch } from '../hooks/redux';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    const auth = await login({ email, password }).unwrap();
    dispatch(setAdminAuth({ user: auth.user, token: auth.accessToken }));
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: 'background.default', p: 2 }}>
      <Paper sx={{ width: 420, maxWidth: '100%', p: 3 }} elevation={1}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Login</Typography>
        {error ? <Alert severity="error" sx={{ mb: 2 }}>Login failed</Alert> : null}
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={submit} disabled={isLoading}>{isLoading ? 'Signing in...' : 'Login'}</Button>
      </Paper>
    </Box>
  );
}
