import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff444f',
      light: '#fff1f2',
      dark: '#dc2626',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#16a34a',
      light: '#dcfce7',
      dark: '#15803d',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    },
    text: {
      primary: '#101828',
      secondary: '#475467',
      disabled: '#94a3b8'
    },
    divider: '#d0d5dd',
    action: {
      active: '#475467',
      hover: 'rgba(255, 68, 79, 0.04)',
      selected: 'rgba(255, 68, 79, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.12)',
      disabledBackground: 'rgba(0, 0, 0, 0.06)'
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: ['IBM Plex Sans', 'Roboto', 'Segoe UI', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: 0
    },
    h2: {
      fontWeight: 800,
      letterSpacing: 0
    },
    h4: {
      fontWeight: 700,
      letterSpacing: 0
    },
    button: {
      textTransform: 'none',
      fontWeight: 700
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10
        },
        contained: {
          color: '#ffffff'
        },
        outlined: {
          backgroundColor: '#ffffff'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700
        },
        label: {
          color: 'inherit'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#101828',
          backgroundImage: 'none'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#101828'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#475467'
        }
      }
    }
  }
});
