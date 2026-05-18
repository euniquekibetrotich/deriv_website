import { useEffect } from 'react';
import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  CheckCircle2,
  CopyCheck,
  LineChart,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import { api } from '../api/client.js';
import { bots } from '../data/bots.js';
import { LiveMarkets } from '../components/LiveMarkets.jsx';
import { ManualTrader } from '../components/ManualTrader.jsx';
import { AnalysisTool } from '../components/AnalysisTool.jsx';

const features = [
  ['No-code Bot Builder', 'Build Deriv trading bots visually with ready-made logic blocks and strategy templates.', Blocks],
  ['Copy Trading', 'Follow high-performing bot creators and promote managed strategy offers to your referrals.', CopyCheck],
  ['Free Bot Library', 'Showcase starter bots for volatility indices, forex, gold, and synthetic market campaigns.', Bot],
  ['Affiliate Dashboard', 'Track clicks, registrations, referral codes, commissions, and partner performance.', BarChart3]
];

const steps = [
  ['01', 'Create account', 'Register as an affiliate and receive your unique tracking code.'],
  ['02', 'Promote bot offers', 'Share bot-builder, copy-trading, and Deriv onboarding campaign links.'],
  ['03', 'Track commissions', 'Monitor referral activity and commission status inside your dashboard.']
];

function BuilderBlock({ color, title, subtitle }) {
  return (
    <Box
      sx={{
        p: 1.4,
        pl: 1.8,
        borderRadius: 2,
        bgcolor: color,
        color: '#ffffff',
        boxShadow: '0 10px 24px rgba(0,0,0,0.22)',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          left: -8,
          top: 18,
          width: 16,
          height: 16,
          borderRadius: '50%',
          bgcolor: color
        }
      }}
    >
      <Typography fontWeight={900}>{title}</Typography>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.86)' }}>
        {subtitle}
      </Typography>
    </Box>
  );
}

function MiniWorkspace() {
  return (
    <Paper className="tk-dark-card" elevation={0} sx={{ p: { xs: 2, md: 2.5 }, color: '#ffffff', borderRadius: 4 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box sx={{ width: 40, height: 40, borderRadius: 2.5, bgcolor: '#ff444f', display: 'grid', placeItems: 'center' }}>
              <Blocks size={22} />
            </Box>
            <Box>
              <Typography sx={{ color: '#ffffff', fontWeight: 900 }}>Deriv Bot Builder</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.86)' }}>
                Visual strategy workspace
              </Typography>
            </Box>
          </Stack>
          <Chip size="small" label="NO CODE" sx={{ bgcolor: '#16a34a', color: '#ffffff', fontWeight: 900 }} />
        </Stack>

        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 1.5, height: '100%', borderRadius: 3, bgcolor: '#0b1220', border: '1px solid rgba(255,255,255,0.18)' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.78)', fontWeight: 900 }}>
                TOOLBOX
              </Typography>
              <Stack spacing={1} sx={{ mt: 1.2 }}>
                {[
                  ['Trade', '#ff444f'],
                  ['Logic', '#377cfc'],
                  ['Math', '#f59e0b'],
                  ['Analysis', '#16a34a']
                ].map(([label, color]) => (
                  <Stack direction="row" spacing={1} alignItems="center" key={label} sx={{ p: 1, bgcolor: '#111827', borderRadius: 2 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
                    <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 800 }}>{label}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                p: 1.5,
                minHeight: 270,
                borderRadius: 3,
                bgcolor: '#151717',
                border: '1px solid rgba(255,255,255,0.18)',
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '22px 22px'
              }}
            >
              <Stack spacing={1.2} sx={{ maxWidth: 330 }}>
                <BuilderBlock color="#ff444f" title="1. Choose market" subtitle="Volatility 75 Index" />
                <Box sx={{ ml: 4 }}>
                  <BuilderBlock color="#377cfc" title="2. Check signal" subtitle="RSI below 30 and trend is rising" />
                </Box>
                <Box sx={{ ml: 8 }}>
                  <BuilderBlock color="#16a34a" title="3. Buy contract" subtitle="Rise/Fall • Stake $10" />
                </Box>
                <Box sx={{ ml: 12 }}>
                  <BuilderBlock color="#f59e0b" title="4. Protect account" subtitle="Take profit $48 • Stop loss $22" />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={1.2}>
          {[
            ['Stake', '$10'],
            ['Take profit', '$48'],
            ['Stop loss', '$22'],
            ['Runtime', '24/7']
          ].map(([label, value]) => (
            <Grid item xs={6} sm={3} key={label}>
              <Box sx={{ p: 1.3, borderRadius: 2.5, bgcolor: '#ffffff', color: '#101828', border: '1px solid #d0d5dd' }}>
                <Typography variant="caption" sx={{ color: '#475467', fontWeight: 800 }}>
                  {label}
                </Typography>
                <Typography sx={{ color: '#101828', fontWeight: 900 }}>{value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
}

function DerivBuilderShell() {
  const toolbox = ['Trade parameters', 'Purchase conditions', 'Sell conditions', 'Restart trading', 'Analysis', 'Utility'];
  const settings = [
    ['Market', 'Volatility 75'],
    ['Trade type', 'Rise/Fall'],
    ['Stake', '$10'],
    ['Duration', '5 ticks'],
    ['Take profit', '$48'],
    ['Stop loss', '$22']
  ];

  return (
    <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 4, bgcolor: '#0e0e0e', color: '#ffffff', border: '1px solid rgba(255,255,255,0.18)' }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 1.2, bgcolor: '#151717', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff444f' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#16a34a', mr: 1 }} />
        <Typography sx={{ color: '#ffffff', fontWeight: 900 }}>Deriv Bot Builder</Typography>
        <Stack direction="row" spacing={1} sx={{ ml: 'auto', display: { xs: 'none', sm: 'flex' } }}>
          {['Import', 'Save', 'Reset', 'Run'].map((item, index) => (
            <Chip key={item} size="small" label={item} sx={{ bgcolor: index === 3 ? '#16a34a' : '#ffffff', color: index === 3 ? '#ffffff' : '#101828' }} />
          ))}
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #d0d5dd', overflowX: 'auto' }}>
        {['Bot Builder', 'Chart', 'Transactions', 'Journal', 'Analysis'].map((tab, index) => (
          <Box key={tab} sx={{ px: 2, py: 1.2, bgcolor: index === 0 ? '#ff444f' : '#ffffff', color: index === 0 ? '#ffffff' : '#101828', fontWeight: 900, whiteSpace: 'nowrap' }}>
            {tab}
          </Box>
        ))}
      </Stack>

      <Grid container>
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, height: '100%', bgcolor: '#f8fafc', borderRight: { md: '1px solid #d0d5dd' } }}>
            <Typography variant="caption" sx={{ color: '#475467', fontWeight: 900 }}>
              BLOCK MENU
            </Typography>
            <Stack spacing={1} sx={{ mt: 1.5 }}>
              {toolbox.map((item, index) => (
                <Box key={item} sx={{ p: 1.2, borderRadius: 2, bgcolor: index === 1 ? '#fff1f2' : '#ffffff', border: '1px solid #d0d5dd' }}>
                  <Typography variant="body2" sx={{ color: index === 1 ? '#be123c' : '#101828', fontWeight: 900 }}>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              minHeight: 410,
              bgcolor: '#eef2f6',
              backgroundImage:
                'linear-gradient(#d0d5dd 1px, transparent 1px), linear-gradient(90deg, #d0d5dd 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            <Stack spacing={1.4} sx={{ maxWidth: 370 }}>
              <BuilderBlock color="#ff444f" title="Trade parameters" subtitle="Market: Volatility 75 • Contract: Rise/Fall" />
              <Box sx={{ ml: 5 }}>
                <BuilderBlock color="#377cfc" title="Purchase conditions" subtitle="RSI < 30 and candle closes bullish" />
              </Box>
              <Box sx={{ ml: 10 }}>
                <BuilderBlock color="#16a34a" title="Purchase Rise" subtitle="Stake $10 • Duration 5 ticks" />
              </Box>
              <Box sx={{ ml: 10 }}>
                <BuilderBlock color="#f59e0b" title="After result" subtitle="Stop at $22 loss or $48 profit" />
              </Box>
              <Box sx={{ ml: 5 }}>
                <BuilderBlock color="#7c3aed" title="Restart trading" subtitle="Reset conditions and continue" />
              </Box>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, height: '100%', bgcolor: '#ffffff' }}>
            <Typography variant="caption" sx={{ color: '#475467', fontWeight: 900 }}>
              CONFIGURATION
            </Typography>
            <Stack spacing={1.1} sx={{ mt: 1.5 }}>
              {settings.map(([label, value]) => (
                <Box key={label} sx={{ p: 1.2, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #d0d5dd' }}>
                  <Typography variant="caption" sx={{ color: '#475467', fontWeight: 800 }}>{label}</Typography>
                  <Typography sx={{ color: '#101828', fontWeight: 900 }}>{value}</Typography>
                </Box>
              ))}
              <Button component={Link} to="/bots" variant="contained" color="secondary" startIcon={<Bot size={18} />}>
                Load template
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export function LandingPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const referralCode = searchParams.get('ref');
    if (!referralCode) return;

    const visitorId = localStorage.getItem('visitorId') || crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);
    api.post('/referrals/track', { referralCode, visitorId }).catch(() => {});
  }, [searchParams]);

  return (
    <>
      <Box id="bot-builder" className="hero-market market-grid" sx={{ color: 'white' }}>
        <Container maxWidth="lg" sx={{ minHeight: { xs: 720, md: 760 }, display: 'flex', alignItems: 'center', py: 8 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6.7}>
              <Stack spacing={4}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label="Deriv Bot Builder" sx={{ bgcolor: '#ff444f', color: 'white', fontWeight: 800 }} />
                  <Chip label="Copy Trading Platform" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.32)' }} />
                </Stack>
                <Box>
                  <Typography variant="h1" sx={{ fontSize: { xs: 42, sm: 58, md: 76 }, lineHeight: 0.98, mb: 2 }}>
                    Professional Trading Bot Builder
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.55, maxWidth: 680 }}>
                    Create, promote, and monetize Deriv trading bots without coding. Add copy trading offers, free bot templates, and affiliate links from one platform.
                  </Typography>
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button component={Link} to="/register" size="large" variant="contained" color="secondary" endIcon={<ArrowRight size={18} />}>
                    Start trading smarter
                  </Button>
                  <Button component={Link} to="/bots" size="large" variant="outlined" startIcon={<Play size={18} />} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)' }}>
                    Browse bots
                  </Button>
                </Stack>
                <Grid container spacing={2} sx={{ maxWidth: 680 }}>
                  {[
                    ['Free', 'Bot templates'],
                    ['No code', 'Visual builder'],
                    ['24/7', 'Referral tracking']
                  ].map(([value, label]) => (
                    <Grid item xs={4} key={label}>
                      <Typography variant="h5" fontWeight={900}>
                        {value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.82)' }}>
                        {label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5.3}>
              <MiniWorkspace />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="analysis-tool" sx={{ py: 8, bgcolor: '#1a1a2e', color: '#ffffff' }}>
        <Container maxWidth="lg">
          <Stack spacing={1.2} textAlign="center" sx={{ mb: 5 }}>
            <Typography sx={{ color: '#377cfc', fontWeight: 900 }}>Technical Analysis</Typography>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 900 }}>
              Advanced Analysis Tool with Real-Time Indicators
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 760, mx: 'auto' }}>
              Professional-grade technical analysis with RSI, MACD, Bollinger Bands, and automated trading signals powered by live Deriv market data.
            </Typography>
          </Stack>
          <AnalysisTool />
        </Container>
      </Box>

      <Box id="strategies" sx={{ py: 8, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Stack spacing={1.5} textAlign="center" sx={{ mb: 5 }}>
            <Typography color="primary" fontWeight={900}>
              Everything traders need
            </Typography>
            <Typography variant="h4">A TradersKit-style platform for bots, signals, and affiliates</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
              The frontend mirrors the same product categories: automated bot creation, copy trading, strategy templates, and conversion-focused partner onboarding.
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            {features.map(([title, copy, Icon]) => (
              <Grid item xs={12} sm={6} md={3} key={title}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid #eaeced', borderRadius: 4 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: '#ff444f14', display: 'grid', placeItems: 'center', mb: 2 }}>
                    <Icon size={24} color="#ff444f" />
                  </Box>
                  <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography color="text.secondary">{copy}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: '#1a1a2e', color: '#ffffff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography sx={{ color: '#4ade80', fontWeight: 900, mb: 1 }}>
                No-code builder
              </Typography>
              <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 900, mb: 2 }}>
                Build bots with blocks, settings, and ready templates
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.86)', lineHeight: 1.8, mb: 3 }}>
                The reference sites focus on Deriv Bot, free bot downloads, and easy setup. This section gives visitors that same journey: choose a template, adjust risk controls, download XML, and import it into Deriv Bot.
              </Typography>
              <Stack spacing={1.4}>
                {[
                  'Visual strategy blocks for entry, logic, stake, and risk',
                  'Ready-made XML download flow in the bot library',
                  'Deriv Bot import button and setup steps',
                  'Affiliate tracking from bot selection to dashboard'
                ].map((item) => (
                  <Stack direction="row" spacing={1.2} alignItems="center" key={item}>
                    <CheckCircle2 color="#4ade80" size={20} />
                    <Typography sx={{ color: '#ffffff' }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                <Button component={Link} to="/bots" variant="contained" color="secondary" startIcon={<Bot size={18} />}>
                  Open bot library
                </Button>
                <Button component="a" href="https://app.deriv.com/bot" target="_blank" rel="noreferrer" variant="outlined" sx={{ color: '#101828', bgcolor: '#ffffff' }}>
                  Open Deriv Bot
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <DerivBuilderShell />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="bot-library" sx={{ py: 8, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography color="primary" fontWeight={900} sx={{ mb: 1 }}>
                Bot marketplace
              </Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Promote ready-made trading bots
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Create a polished library of free and premium trading bots, then route each download or signup through your affiliate tracking flow.
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                {bots.slice(0, 3).map((bot) => (
                  <Grid item xs={12} sm={4} key={bot.name}>
                    <Paper elevation={0} sx={{ p: 2.5, height: '100%', border: '1px solid #eaeced', borderRadius: 4 }}>
                      <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between">
                          <Bot color="#ff444f" />
                          <Chip size="small" label={bot.risk} sx={{ bgcolor: '#fff1f2', color: '#9f1239' }} />
                        </Stack>
                        <Box>
                          <Typography fontWeight={900}>{bot.name}</Typography>
                          <Typography color="text.secondary" variant="body2">
                            {bot.market}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={2}>
                          <Box>
                            <Typography variant="caption" color="text.secondary">Win rate</Typography>
                            <Typography fontWeight={900}>{bot.win}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">Users</Typography>
                            <Typography fontWeight={900}>{bot.users}</Typography>
                          </Box>
                        </Stack>
                        <Button component={Link} to="/bots" variant="contained" size="small">
                          Use bot
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="manual-trader" sx={{ py: 8, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Stack spacing={1.2} textAlign="center" sx={{ mb: 4 }}>
            <Typography sx={{ color: '#ff444f', fontWeight: 900 }}>Manual trading</Typography>
            <Typography variant="h4" sx={{ color: '#101828', fontWeight: 900 }}>
              Trade Volatility markets with live Deriv charts
            </Typography>
            <Typography sx={{ color: '#344054', maxWidth: 760, mx: 'auto' }}>
              A TraderKit-style manual trader panel with real Volatility Index candles, live spot updates, and manual Rise/Fall controls.
            </Typography>
          </Stack>
          <ManualTrader />
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <LiveMarkets />
        </Container>
      </Box>

      <Box id="copy-trading" sx={{ py: 8, bgcolor: '#0e0e0e', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Paper className="tk-dark-card" elevation={0} sx={{ p: 3, color: 'white', borderRadius: 4 }}>
                <Stack spacing={2}>
                  {[
                    ['Strategy Provider', 'Deriv Synthetic Pro', '+18.4%', Users],
                    ['Copied Accounts', '1,284 active followers', '+156', CopyCheck],
                    ['Monthly Volume', '$2.4M tracked', '+24.8%', LineChart]
                  ].map(([label, value, gain, Icon]) => (
                    <Box className="tk-block" sx={{ p: 2 }} key={label}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ width: 44, height: 44, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', display: 'grid', placeItems: 'center' }}>
                          <Icon size={22} color="#4ade80" />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.82)' }}>{label}</Typography>
                          <Typography fontWeight={900}>{value}</Typography>
                        </Box>
                        <Typography color="#4ade80" fontWeight={900}>{gain}</Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="#4ade80" fontWeight={900} sx={{ mb: 1 }}>
                Copy trading
              </Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Turn winning strategies into affiliate revenue
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.86)', lineHeight: 1.8, mb: 3 }}>
                Give visitors a simple path: choose a strategy, open a Deriv account, copy a bot, and let your dashboard record the referral journey.
              </Typography>
              <Stack spacing={1.4}>
                {['Verified strategy profiles', 'Referral-aware signup links', 'Commission records in Postgres', 'Deriv API placeholder ready'].map((item) => (
                  <Stack direction="row" spacing={1.2} alignItems="center" key={item}>
                    <CheckCircle2 color="#4ade80" size={20} />
                    <Typography>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Stack spacing={1.5} textAlign="center" sx={{ mb: 5 }}>
            <Typography color="primary" fontWeight={900}>
              Getting started
            </Typography>
            <Typography variant="h4">Launch in three steps</Typography>
          </Stack>
          <Grid container spacing={3}>
            {steps.map(([number, title, copy]) => (
              <Grid item xs={12} md={4} key={title}>
                <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid #eaeced', borderRadius: 4 }}>
                  <Typography color="primary" fontWeight={900} fontSize={36}>
                    {number}
                  </Typography>
                  <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography color="text.secondary">{copy}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: '#151717', color: 'white' }}>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Sparkles size={36} color="#ff444f" />
            <Typography variant="h3" fontWeight={900}>
              Build your trading bot affiliate portal
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.86)', maxWidth: 680 }}>
              Register now, generate your unique referral links, and start customizing the bot builder, copy trading, and Deriv campaign sections.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={Link} to="/register" size="large" variant="contained" color="secondary" startIcon={<Zap size={18} />}>
                Get started free
              </Button>
              <Button component={Link} to="/login" size="large" variant="outlined" startIcon={<ShieldCheck size={18} />} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.75)' }}>
                Login to dashboard
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
