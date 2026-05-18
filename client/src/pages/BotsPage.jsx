import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Bot, CheckCircle2, Copy, Download, Eye, MessageCircle, Play, ShieldCheck, Wallet } from 'lucide-react';
import { botSourceUrl, botXml, bots, packages } from '../data/bots.js';
import { useAuth } from '../context/AuthContext.jsx';
import { LiveMarkets } from '../components/LiveMarkets.jsx';
import { ManualTrader } from '../components/ManualTrader.jsx';

const riskStyles = {
  Low: { bgcolor: '#dcfce7', color: '#14532d', border: '1px solid #86efac' },
  Medium: { bgcolor: '#fef3c7', color: '#78350f', border: '1px solid #fcd34d' },
  High: { bgcolor: '#ffe4e6', color: '#881337', border: '1px solid #fda4af' }
};

function SectionTitle({ eyebrow, title, copy, dark = false }) {
  return (
    <Stack spacing={1.2} textAlign="center" sx={{ mb: 4 }}>
      <Typography sx={{ color: dark ? '#4ade80' : '#ff444f', fontWeight: 900 }}>
        {eyebrow}
      </Typography>
      <Typography variant="h4" sx={{ color: dark ? '#ffffff' : '#101828', fontWeight: 900 }}>
        {title}
      </Typography>
      {copy ? (
        <Typography sx={{ color: dark ? 'rgba(255,255,255,0.86)' : '#344054', maxWidth: 760, mx: 'auto' }}>
          {copy}
        </Typography>
      ) : null}
    </Stack>
  );
}

export function BotsPage() {
  const { user } = useAuth();
  const [market, setMarket] = useState('all');
  const [selected, setSelected] = useState(bots[0]);
  const [message, setMessage] = useState('');
  const [checkout, setCheckout] = useState(null);

  const markets = useMemo(() => ['all', ...new Set(bots.map((bot) => bot.market))], []);
  const visibleBots = market === 'all' ? bots : bots.filter((bot) => bot.market === market);

  const selectBot = (bot) => {
    localStorage.setItem('selectedBot', bot.slug);
  };

  const copyXml = async (bot) => {
    await navigator.clipboard.writeText(botXml(bot));
    setMessage(`${bot.name} XML copied`);
  };

  const downloadXml = (bot) => {
    const sourceUrl = botSourceUrl(bot);
    if (sourceUrl) {
      window.open(sourceUrl, '_blank', 'noopener,noreferrer');
      setMessage(`${bot.name} opened from the public Forex bot source`);
      return;
    }

    const blob = new Blob([botXml(bot)], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${bot.slug}.xml`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setMessage(`${bot.name} XML downloaded`);
  };

  const openCheckout = (item) => {
    setCheckout(item);
    setMessage('');
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: 'calc(100vh - 72px)' }}>
      <Box sx={{ bgcolor: '#0e0e0e', color: '#ffffff', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={2.5}>
                <Chip label="Free bots • Premium bots • Deriv XML templates" sx={{ alignSelf: 'flex-start', bgcolor: '#ff444f', color: '#ffffff' }} />
                <Typography variant="h2" sx={{ color: '#ffffff', fontWeight: 900, lineHeight: 1 }}>
                  Trading Bot Library
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
                  Browse Deriv-style bots inspired by the trading portals you shared. Preview, copy XML, download templates, and route buyers through your affiliate flow.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button component={Link} to={user ? '/dashboard' : '/register'} onClick={() => selectBot(selected)} variant="contained" color="secondary" startIcon={<Play size={18} />}>
                    {user ? 'Open dashboard' : 'Start with a bot'}
                  </Button>
                  <Button component="a" href="https://app.deriv.com/bot" target="_blank" rel="noreferrer" variant="outlined" sx={{ color: '#101828', borderColor: '#ffffff' }}>
                    Open Deriv Bot
                  </Button>
                  <Button component="a" href="https://wa.me/254722199199" target="_blank" rel="noreferrer" variant="outlined" startIcon={<MessageCircle size={18} />} sx={{ color: '#101828', borderColor: '#ffffff' }}>
                    WhatsApp support
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className="tk-dark-card" elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 900 }}>
                    Featured bot
                  </Typography>
                  <Box className="tk-block" sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography sx={{ color: '#ffffff', fontWeight: 900 }}>{selected.name}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.86)' }}>{selected.market}</Typography>
                      </Box>
                      <Chip size="small" label={selected.risk} sx={riskStyles[selected.risk]} />
                    </Stack>
                  </Box>
                  <Grid container spacing={1.5}>
                    {[
                      ['Win rate', selected.win],
                      ['Users', selected.users],
                      ['Price', selected.price],
                      ['Type', selected.type]
                    ].map(([label, value]) => (
                      <Grid item xs={6} key={label}>
                        <Box className="tk-block" sx={{ p: 1.5 }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.82)' }}>{label}</Typography>
                          <Typography sx={{ color: '#ffffff', fontWeight: 900 }}>{value}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={5}>
          {message ? <Alert severity="success" onClose={() => setMessage('')}>{message}</Alert> : null}

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Stack spacing={2.5}>
                <Paper className="light-card" elevation={0} sx={{ p: 2.5, borderRadius: 3 }}>
                  <TextField
                    select
                    fullWidth
                    label="Filter bots by market"
                    value={market}
                    onChange={(event) => setMarket(event.target.value)}
                  >
                    {markets.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item === 'all' ? 'All markets' : item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Paper>

                <Grid container spacing={2}>
                  {visibleBots.map((bot) => {
                    const isSelected = selected.slug === bot.slug;
                    return (
                    <Grid item xs={12} sm={6} key={bot.slug}>
                      <Paper
                        className="light-card"
                        elevation={0}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelected(bot)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelected(bot);
                          }
                        }}
                        sx={{
                          p: 2.5,
                          height: '100%',
                          borderRadius: 4,
                          cursor: 'pointer',
                          borderColor: isSelected ? '#ff444f' : '#d0d5dd',
                          boxShadow: isSelected ? '0 0 0 3px rgba(255,68,79,0.16)' : 'none',
                          transition: 'border-color .15s, box-shadow .15s, transform .15s',
                          '&:hover': {
                            borderColor: '#ff444f',
                            transform: 'translateY(-2px)'
                          },
                          '&:focus-visible': {
                            outline: '3px solid rgba(255,68,79,0.35)',
                            outlineOffset: 2
                          }
                        }}
                      >
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: '#fff1f2', display: 'grid', placeItems: 'center' }}>
                              <Bot color="#ff444f" />
                            </Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                              {isSelected ? <Chip size="small" label="Selected" sx={{ bgcolor: '#ff444f', color: '#ffffff' }} /> : null}
                              <Chip size="small" label={bot.risk} sx={riskStyles[bot.risk]} />
                            </Stack>
                          </Stack>
                          <Box>
                            <Typography sx={{ color: '#101828', fontWeight: 900 }}>{bot.name}</Typography>
                            <Typography sx={{ color: '#344054' }} variant="body2">{bot.market}</Typography>
                          </Box>
                          <Typography sx={{ color: '#344054' }} variant="body2">
                            {bot.description}
                          </Typography>
                          <Grid container spacing={1}>
                            {[
                              ['Win', bot.win],
                              ['Users', bot.users],
                              ['Price', bot.price]
                            ].map(([label, value]) => (
                              <Grid item xs={4} key={label}>
                                <Box sx={{ p: 1.2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e4e7ec' }}>
                                  <Typography variant="caption" sx={{ color: '#475467' }}>{label}</Typography>
                                  <Typography sx={{ color: '#101828', fontWeight: 900 }}>{value}</Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<Eye size={16} />}
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelected(bot);
                              }}
                            >
                              Preview
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Copy size={16} />}
                              onClick={(event) => {
                                event.stopPropagation();
                                copyXml(bot);
                              }}
                            >
                              Copy XML
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Download size={16} />}
                              onClick={(event) => {
                                event.stopPropagation();
                                downloadXml(bot);
                              }}
                            >
                              {bot.sourceFile ? 'Source file' : 'Download'}
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Wallet size={16} />}
                              onClick={(event) => {
                                event.stopPropagation();
                                openCheckout(bot);
                              }}
                            >
                              Buy
                            </Button>
                          </Stack>
                        </Stack>
                      </Paper>
                    </Grid>
                    );
                  })}
                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper className="light-card" elevation={0} sx={{ p: 3, borderRadius: 4, position: { md: 'sticky' }, top: 96 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Bot color="#ff444f" />
                    <Typography variant="h6" sx={{ color: '#101828', fontWeight: 900 }}>
                      {selected.name}
                    </Typography>
                  </Stack>
                  <Chip label={selected.source} sx={{ alignSelf: 'flex-start', bgcolor: '#eef2ff', color: '#3730a3' }} />
                  <Typography sx={{ color: '#344054' }}>{selected.description}</Typography>
                  <Stack spacing={1}>
                    {selected.settings.map((setting) => (
                      <Stack direction="row" spacing={1} alignItems="center" key={setting}>
                        <ShieldCheck size={17} color="#16a34a" />
                        <Typography variant="body2" sx={{ color: '#101828' }}>{setting}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button component={Link} to={user ? '/dashboard' : `/register?bot=${selected.slug}`} onClick={() => selectBot(selected)} variant="contained" color="secondary" startIcon={<Play size={18} />}>
                    {user ? 'Use in dashboard' : 'Use this bot'}
                  </Button>
                  <Button variant="contained" onClick={() => openCheckout(selected)} startIcon={<Wallet size={18} />}>
                    Buy bot
                  </Button>
                  {selected.sourceFile ? (
                    <Button variant="outlined" onClick={() => downloadXml(selected)} startIcon={<Download size={18} />}>
                      Open source file
                    </Button>
                  ) : (
                    <Button variant="outlined" onClick={() => copyXml(selected)} startIcon={<Copy size={18} />}>
                      Copy strategy XML
                    </Button>
                  )}
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <ManualTrader />

          <LiveMarkets />

          <Paper className="light-card" elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
            <SectionTitle
              eyebrow="Setup process"
              title="Import and run in minutes"
              copy="These actions are local placeholders for now, ready for real Deriv, checkout, and support integrations."
            />
            <Grid container spacing={2}>
              {[
                ['1', 'Open a Deriv account', 'Create or log in to Deriv, then open the Deriv Bot workspace.'],
                ['2', 'Choose a bot', 'Preview a strategy, copy the XML, or download the template file.'],
                ['3', 'Import and configure', 'Load the XML in Deriv Bot, set stake size, stop loss, and profit target.'],
                ['4', 'Track referrals', 'Send visitors through your unique affiliate links and monitor commissions.']
              ].map(([number, title, copy]) => (
                <Grid item xs={12} sm={6} md={3} key={title}>
                  <Box sx={{ p: 2, height: '100%', bgcolor: '#f8fafc', border: '1px solid #d0d5dd', borderRadius: 3 }}>
                    <Typography sx={{ color: '#ff444f', fontWeight: 900, fontSize: 28 }}>{number}</Typography>
                    <Typography sx={{ color: '#101828', fontWeight: 900 }}>{title}</Typography>
                    <Typography sx={{ color: '#344054' }} variant="body2">{copy}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Box>
            <SectionTitle eyebrow="Packages" title="Bundle bots for bigger offers" />
            <Grid container spacing={3}>
              {packages.map((plan) => (
                <Grid item xs={12} md={4} key={plan.name}>
                  <Paper className="light-card" elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="h6" sx={{ color: '#101828', fontWeight: 900 }}>{plan.name}</Typography>
                        <Typography sx={{ color: '#344054' }}>{plan.description}</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ color: '#101828', fontWeight: 900 }}>{plan.price}</Typography>
                      <Stack spacing={1}>
                        {plan.items.map((item) => (
                          <Stack direction="row" spacing={1} alignItems="center" key={item}>
                            <CheckCircle2 size={18} color="#16a34a" />
                            <Typography variant="body2" sx={{ color: '#101828' }}>{item}</Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button variant="contained" color="secondary" onClick={() => openCheckout(plan)}>
                        Buy {plan.name}
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: '#0e0e0e', color: '#ffffff', border: '1px solid #1f2937' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={5}>
                <Typography sx={{ color: '#4ade80', fontWeight: 900 }}>Results-style proof</Typography>
                <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 900, my: 1 }}>Show confidence before checkout</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.86)' }}>
                  Add performance cards, support links, and risk reminders so visitors understand the offer before they download or buy.
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  {[
                    ['18+', 'Bot templates'],
                    ['5 min', 'Import setup'],
                    ['24/7', 'Bot runtime'],
                    ['M-Pesa', 'Payment placeholder']
                  ].map(([value, label]) => (
                    <Grid item xs={6} sm={3} key={label}>
                      <Box className="tk-block" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 900 }}>{value}</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.86)' }}>{label}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>

      <Dialog open={Boolean(checkout)} onClose={() => setCheckout(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#101828', fontWeight: 900 }}>{checkout?.name ? `Complete ${checkout.name}` : 'Complete purchase'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Alert severity="info">
              This is a safe local placeholder. Connect M-Pesa, Stripe, PayPal, or your Deriv partner checkout here.
            </Alert>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #d0d5dd', borderRadius: 2 }}>
              <Typography sx={{ color: '#101828', fontWeight: 900 }}>Payment instructions</Typography>
              <Typography sx={{ color: '#344054' }}>Paybill: 303030</Typography>
              <Typography sx={{ color: '#344054' }}>Account: TRADESKIT</Typography>
              <Typography sx={{ color: '#344054' }}>Amount: {checkout?.price || 'Custom'}</Typography>
            </Box>
            <TextField label="Paste payment confirmation SMS" multiline minRows={3} placeholder="Paste M-Pesa or payment confirmation here..." />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCheckout(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setMessage(`${checkout?.name || 'Package'} marked as paid. Download links are ready.`);
              setCheckout(null);
            }}
          >
            Verify placeholder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
