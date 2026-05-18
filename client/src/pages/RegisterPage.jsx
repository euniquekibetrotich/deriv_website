import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { AuthForm } from '../components/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);

    try {
      await register({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password'),
        referredBy: searchParams.get('ref')
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <AuthForm
        title="Become an affiliate"
        subtitle="Create your partner account and start sharing tracked campaign links."
        submitLabel="Create account"
        error={error}
        onSubmit={handleSubmit}
        fields={[
          { label: 'Name', name: 'name', autoComplete: 'name' },
          { label: 'Email', name: 'email', type: 'email', autoComplete: 'email' },
          { label: 'Password', name: 'password', type: 'password', autoComplete: 'new-password', helperText: 'Use at least 8 characters.' }
        ]}
        footer={
          <Box>
            <Typography sx={{ color: '#344054' }}>
              Already registered? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        }
      />
    </Container>
  );
}
