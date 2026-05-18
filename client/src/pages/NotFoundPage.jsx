import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '60vh',
          justifyContent: 'center',
        }}
      >
        {/* Error Code */}
        <Box
          sx={{
            position: 'relative',
            mb: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 120, md: 180 },
              fontWeight: 900,
              color: '#ff444f',
              lineHeight: 1,
              textShadow: '0 4px 20px rgba(255, 68, 79, 0.3)',
            }}
          >
            404
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <AlertTriangle
              size={64}
              color="#ffffff"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            />
          </Box>
        </Box>

        {/* Message */}
        <Typography variant="h4" sx={{ color: '#101828', fontWeight: 800, mb: 2 }}>
          Page not found
        </Typography>
        <Typography
          sx={{
            color: '#475467',
            fontSize: { xs: 16, md: 18 },
            maxWidth: 520,
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </Typography>

        {/* Search Suggestion */}
        <Box
          sx={{
            p: 3,
            bgcolor: '#f8fafc',
            border: '1px solid #d0d5dd',
            borderRadius: 3,
            maxWidth: 520,
            width: '100%',
            mb: 4,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Search size={20} color="#475467" />
            <Typography sx={{ color: '#101828', fontWeight: 700 }}>
              Popular pages
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            useFlexGap
            flexWrap="wrap"
          >
            {[
              { label: 'Bot Builder', href: '/#bot-builder' },
              { label: 'Free Bots', href: '/bots' },
              { label: 'Copy Trading', href: '/#copy-trading' },
              { label: 'Manual Trader', href: '/#manual-trader' },
            ].map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.href}
                variant="outlined"
                size="small"
                sx={{
                  color: '#ff444f',
                  borderColor: '#ff444f',
                  '&:hover': {
                    bgcolor: '#ff444f',
                    color: '#ffffff',
                    borderColor: '#ff444f',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<Home size={20} />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 700,
            }}
          >
            Go to homepage
          </Button>
          <Button
            component="a"
            href="https://wa.me/254722199199"
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              color: '#101828',
              borderColor: '#d0d5dd',
              fontWeight: 700,
              '&:hover': {
                bgcolor: '#f8fafc',
                borderColor: '#ff444f',
                color: '#ff444f',
              },
            }}
          >
            Contact support
          </Button>
        </Stack>

        {/* Additional Info */}
        <Typography
          sx={{
            mt: 6,
            color: '#94a3b8',
            fontSize: '0.8rem',
          }}
        >
          If you believe this is an error, please contact our support team.
        </Typography>
      </Box>
    </Container>
  );
}