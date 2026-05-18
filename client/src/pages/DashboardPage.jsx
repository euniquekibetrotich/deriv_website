import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Copy, DollarSign, MousePointerClick, UserPlus, Wallet } from 'lucide-react';
import { api } from '../api/client.js';
import { bots } from '../data/bots.js';

const statIcons = {
  clicks: MousePointerClick,
  registrations: UserPlus,
  fundedAccounts: Wallet,
  pending: DollarSign
};

export function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const selectedBot = bots.find((bot) => bot.slug === localStorage.getItem('selectedBot'));

  useEffect(() => {
    api
      .get('/dashboard')
      .then(({ data }) => setDashboard(data))
      .catch((err) => setError(err.response?.data?.message || 'Could not load dashboard'));
  }, []);

  const copyLink = async (label, value) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(''), 1600);
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!dashboard) {
    return <LinearProgress />;
  }

  const stats = [
    ['Clicks', dashboard.stats.clicks, 'clicks'],
    ['Registrations', dashboard.stats.registrations, 'registrations'],
    ['Funded Accounts', dashboard.stats.fundedAccounts, 'fundedAccounts'],
    ['Pending Commission', `$${dashboard.stats.commissions.pending.toFixed(2)}`, 'pending']
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4">Affiliate dashboard</Typography>
          <Typography sx={{ mt: 1, color: '#344054' }}>
            Referral code: {dashboard.affiliate.referralCode}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {stats.map(([label, value, key]) => {
            const Icon = statIcons[key];
            return (
              <Grid item xs={12} sm={6} md={3} key={label}>
                <Paper elevation={0} sx={{ p: 3, border: '1px solid #d0d5dd' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Icon size={28} color="#16a34a" />
                    <Box>
                      <Typography sx={{ color: '#344054' }} variant="body2">
                        {label}
                      </Typography>
                      <Typography variant="h5" fontWeight={800}>
                        {value}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #d0d5dd' }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={800}>
              Unique links
            </Typography>
            {Object.entries(dashboard.links).map(([label, value]) => (
              <Stack key={label} direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
                <TextField fullWidth label={`${label} link`} value={value} InputProps={{ readOnly: true }} />
                <Button variant="outlined" startIcon={<Copy size={18} />} onClick={() => copyLink(label, value)} sx={{ minWidth: 140 }}>
                  {copied === label ? 'Copied' : 'Copy'}
                </Button>
              </Stack>
            ))}
          </Stack>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #d0d5dd' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }} justifyContent="space-between">
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Selected bot
              </Typography>
              <Typography sx={{ color: '#344054' }}>
                {selectedBot ? `${selectedBot.name} - ${selectedBot.market}` : 'No bot selected yet. Choose one from the bot library.'}
              </Typography>
            </Box>
            <Button component="a" href="/bots" variant="contained">
              Open bot library
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #d0d5dd' }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
            Commissions
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(dashboard.stats.commissions).map(([status, amount]) => (
              <Grid item xs={12} sm={4} key={status}>
                <Box sx={{ p: 2, bgcolor: '#ffffff', border: '1px solid #d0d5dd', borderRadius: 1 }}>
                  <Typography sx={{ color: '#344054' }} textTransform="capitalize" fontWeight={700}>
                    {status}
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    ${amount.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Stack>
    </Container>
  );
}
