import { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router';
import api from '../../services/axios';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { newPassword });
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#000', // Full black background
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 5,
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#00EFFF", mb: 1 }}
      >
        Reset Password
      </Typography>

      {message && <Typography sx={{ color: '#3CE8F2', textAlign: 'center', mb: 2 }}>{message}</Typography>}
      {error && <Typography sx={{ color: 'red', textAlign: 'center', mb: 2 }}>{error}</Typography>}

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'secondary.main' },
            },
            '& .MuiInputLabel-root': { color: '#ccc' },
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'secondary.main' },
            },
            '& .MuiInputLabel-root': { color: '#ccc' },
          }}
        />

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: 'secondary.main',
            color: '#000000',
            fontWeight: 'bold',
            borderRadius: '8px',
            py: 1.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ color: '#000' }} />
              Processing...
            </>
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
    </Box>
  );
}
