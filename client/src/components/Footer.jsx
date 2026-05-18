import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TrendingUp, Github, Twitter, MessageCircle } from 'lucide-react';

const currentYear = new Date().getFullYear();

const footerLinks = {
  product: [
    { label: 'Bot Builder', href: '/#bot-builder' },
    { label: 'Copy Trading', href: '/#copy-trading' },
    { label: 'Free Bots', href: '/bots' },
    { label: 'Manual Trader', href: '/#manual-trader' },
  ],
  company: [
    { label: 'About', href: '/#strategies' },
    { label: 'Features', href: '/#bot-builder' },
    { label: 'Pricing', href: '/bots' },
    { label: 'Contact', href: 'https://wa.me/254722199199' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Support', href: 'https://wa.me/254722199199' },
    { label: 'Status', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Risk Disclosure', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0e0e0e',
        color: '#ffffff',
        py: { xs: 6, md: 8 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand Section */}
          <Grid item xs={12} md={3}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp size={28} color="#ff444f" />
                <Typography variant="h6" fontWeight={800} color="#ffffff">
                  TradesKit
                </Typography>
              </Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                Professional trading bot builder and affiliate platform powered by Deriv. Build, deploy, and monetize trading strategies without code.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.14)',
                      color: '#ffffff',
                    },
                  }}
                >
                  <Twitter size={18} />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.14)',
                      color: '#ffffff',
                    },
                  }}
                >
                  <Github size={18} />
                </Link>
                <Link
                  href="https://wa.me/254722199199"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.14)',
                      color: '#ffffff',
                    },
                  }}
                >
                  <MessageCircle size={18} />
                </Link>
              </Stack>
            </Stack>
          </Grid>

          {/* Product Links */}
          <Grid item xs={6} sm={3} md={2.5}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 3, color: '#ffffff' }}>
              Product
            </Typography>
            <Stack spacing={2}>
              {footerLinks.product.map((link) => (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#ffffff',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 3, color: '#ffffff' }}>
              Company
            </Typography>
            <Stack spacing={2}>
              {footerLinks.company.map((link) => (
                <Link
                  key={link.label}
                  component={link.href.startsWith('/') ? RouterLink : 'a'}
                  to={link.href.startsWith('/') ? link.href : undefined}
                  href={link.href.startsWith('/') ? undefined : link.href}
                  target={link.href.startsWith('/') ? undefined : '_blank'}
                  rel={link.href.startsWith('/') ? undefined : 'noreferrer'}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#ffffff',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Resources Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 3, color: '#ffffff' }}>
              Resources
            </Typography>
            <Stack spacing={2}>
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('/') ? undefined : '_blank'}
                  rel={link.href.startsWith('/') ? undefined : 'noreferrer'}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#ffffff',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={6} sm={3} md={2.5}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 3, color: '#ffffff' }}>
              Legal
            </Typography>
            <Stack spacing={2}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#ffffff',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            pt: 4,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
            © {currentYear} TradesKit Affiliate. All rights reserved.
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', maxWidth: 400, textAlign: { xs: 'center', md: 'right' } }}>
            Trading involves risk. Past performance is not indicative of future results. This platform is for educational and affiliate purposes.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}