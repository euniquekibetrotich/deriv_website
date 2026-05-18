import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { AuthForm } from '../components/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);

    try {
      await login({
        email: form.get('email'),
        password: form.get('password')
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <AuthForm
        title="Welcome back"
        subtitle="Access your affiliate reporting, links, and commission details."
        submitLabel="Login"
        error={error}
        onSubmit={handleSubmit}
        fields={[
          { label: 'Email', name: 'email', type: 'email', autoComplete: 'email' },
          { label: 'Password', name: 'password', type: 'password', autoComplete: 'current-password' }
        ]}
        footer={
          <Box>
            <Typography sx={{ color: '#344054' }}>
              New affiliate? <Link to="/register">Create an account</Link>
            </Typography>
          </Box>
        }
      />
    </Container>
  );
}
