import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Footer } from './Footer.jsx';

const navItems = [
  ['Bot Builder', '/#bot-builder'],
  ['Analysis Tool', '/#analysis-tool'],
  ['Manual Trader', '/#manual-trader'],
  ['Copy Trading', '/#copy-trading'],
  ['Free Bots', '/bots'],
  ['Strategies', '/#strategies']
];

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const element = document.querySelector(location.hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e4e7ec' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 'auto' }}>
              <TrendingUp size={28} color="#ff444f" />
              <Typography variant="h6" fontWeight={800}>
                TradesKit Affiliate
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
              {navItems.map(([item, target]) => (
                <Button key={item} component={Link} to={target} color="inherit" size="small" sx={{ color: '#344054', fontWeight: 800 }}>
                  {item}
                </Button>
              ))}
            </Stack>
            {user ? (
              <>
                <Button component={Link} to="/dashboard" color="primary">
                  Dashboard
                </Button>
                <Button variant="outlined" color="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="primary">
                  Login
                </Button>
                <Button component={Link} to="/register" variant="contained" color="primary">
                  Join
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" id="main-content" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
