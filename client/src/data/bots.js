export const bots = [
  {
    slug: 'volatility-75-scalper',
    name: 'Volatility 75 Scalper',
    market: 'Volatility 75 Index',
    type: 'Rise/Fall',
    win: '74%',
    users: '1.8k',
    risk: 'Medium',
    price: 'Free',
    description: 'A fast synthetic-index bot template with trend confirmation, fixed stake controls, take profit, and stop loss.',
    settings: ['Stake: $10', 'Take profit: $48', 'Stop loss: $22', 'Signal: trend strength above 72%'],
    source: 'TradesKit-style'
  },
  {
    slug: 'jump-100-momentum',
    name: 'Jump 100 Momentum',
    market: 'Jump 100 Index',
    type: 'Matches/Differs',
    win: '69%',
    users: '1.2k',
    risk: 'Medium',
    price: 'Free',
    description: 'A momentum-style bot for jump markets with simple entry filters and conservative session limits.',
    settings: ['Stake: $5', 'Take profit: $35', 'Stop loss: $18', 'Signal: candle impulse filter'],
    source: 'TradesKit-style'
  },
  {
    slug: 'gold-trend-rider',
    name: 'Gold Trend Rider',
    market: 'XAU/USD',
    type: 'CFD Signal Bot',
    win: '68%',
    users: '940',
    risk: 'Low',
    price: '$30',
    description: 'A gold trend-following template for signal campaigns, account onboarding, and copy-trading funnels.',
    settings: ['Risk: 1%', 'Take profit: 1.8R', 'Stop loss: 1R', 'Signal: EMA trend and pullback'],
    source: 'DBTraders-style'
  },
  {
    slug: 'rise-fall-sniper',
    name: 'Rise/Fall Sniper',
    market: 'Deriv Synthetics',
    type: 'Rise/Fall',
    win: '71%',
    users: '2.4k',
    risk: 'Medium',
    price: '$50',
    description: 'A Deriv synthetic-market bot template designed for affiliate demonstrations and quick setup flows.',
    settings: ['Stake: $7', 'Take profit: $42', 'Stop loss: $21', 'Signal: RSI reversal zone'],
    source: 'TradesKit-style'
  },
  {
    slug: 'even-odd-builder',
    name: 'Even/Odd Builder',
    market: 'Volatility 10 Index',
    type: 'Even/Odd',
    win: '63%',
    users: '780',
    risk: 'High',
    price: 'Free',
    description: 'A simple digit-contract starter bot for education, testing, and Deriv bot-builder onboarding.',
    settings: ['Stake: $2', 'Take profit: $18', 'Stop loss: $10', 'Signal: last digit distribution'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'copy-trade-pro',
    name: 'Copy Trade Pro',
    market: 'Multi-market',
    type: 'Copy Trading',
    win: '76%',
    users: '3.1k',
    risk: 'Low',
    price: '$70',
    description: 'A strategy-profile placeholder for copy-trading offers, referral onboarding, and partner conversion tracking.',
    settings: ['Mode: follower', 'Max drawdown: 12%', 'Markets: Forex and synthetics', 'Signal: provider allocation'],
    source: 'TradesKit-style'
  },
  {
    slug: 'last-digit-pro',
    name: 'Last Digit Pro',
    market: 'R_10 · R_25 · R_50',
    type: 'Matches/Differs',
    win: '66%',
    users: '1.5k',
    risk: 'Low',
    price: 'KSh 1,499',
    description: 'A digit-contract template that targets selected final digits using recent tick distribution.',
    settings: ['Contract: Digits', 'Stake: KSh 150', 'Take profit: KSh 1,200', 'Signal: digit frequency scan'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'over-under-digits',
    name: 'Over / Under Digits',
    market: 'R_10 · R_25 · R_75',
    type: 'Over/Under',
    win: '65%',
    users: '1.1k',
    risk: 'Low',
    price: 'KSh 1,499',
    description: 'A digit bot that adjusts its threshold from recent tick behavior for over/under entries.',
    settings: ['Contract: Digits', 'Threshold: dynamic', 'Stop loss: session based', 'Signal: rolling tick distribution'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'kp-striker',
    name: 'KP Striker',
    market: 'Volatility 75',
    type: 'Scalping',
    win: '72%',
    users: '2.2k',
    risk: 'Low',
    price: 'KSh 2,999',
    description: 'A beginner-friendly volatility-index scalper for steady daily target campaigns.',
    settings: ['Daily target: 5% - 8%', 'Contract: Rise/Fall', 'Stake: configurable', 'Guide: beginner setup'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'kp-predator',
    name: 'KP Predator',
    market: 'Forex + Synthetic',
    type: 'Martingale Scanner',
    win: '76%',
    users: '3.7k',
    risk: 'Medium',
    price: 'KSh 4,999',
    description: 'A multi-market scanner with martingale-style recovery logic and automatic loss limits.',
    settings: ['Daily target: 12% - 18%', 'Markets: Forex and synthetics', 'Stop loss: enabled', 'Mode: scanner'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'kp-baddest',
    name: 'KP Baddest',
    market: 'All Markets',
    type: 'HFT',
    win: '79%',
    users: '2.9k',
    risk: 'High',
    price: 'KSh 9,999',
    description: 'A high-frequency concept bot for advanced users who want aggressive campaign positioning.',
    settings: ['Daily target: 25% - 40%', 'Runtime: 24/7', 'Markets: all unlocked', 'Risk mode: aggressive'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'oscars-grind',
    name: "Oscar's Grind",
    market: 'Volatility Index',
    type: 'Positive Progression',
    win: '70%',
    users: '860',
    risk: 'Low',
    price: 'KSh 2,499',
    description: 'A steady progression system that increases exposure after wins instead of chasing losses.',
    settings: ['Contract: Rise/Fall', 'Stake: unit based', 'Progression: after wins', 'Goal: slow compounding'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'dalembert-system',
    name: "D'Alembert System",
    market: 'R_50 · R_75',
    type: 'Progression',
    win: '67%',
    users: '740',
    risk: 'Medium',
    price: 'KSh 2,499',
    description: 'A measured recovery system that steps stake size up or down based on the previous result.',
    settings: ['Contract: Rise/Fall and Digits', 'Progression: plus/minus one unit', 'Stop loss: session based', 'Market: R_50 and R_75'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'anti-martingale',
    name: 'Anti-Martingale',
    market: 'Volatility 100',
    type: 'Streak Rider',
    win: '69%',
    users: '690',
    risk: 'Medium',
    price: 'KSh 2,499',
    description: 'A streak-based template that scales when winning and resets quickly when a loss appears.',
    settings: ['Contract: Rise/Fall', 'Progression: after wins', 'Reset: after loss', 'Market: Volatility 100'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'rsi-reversal',
    name: 'RSI Reversal',
    market: 'Forex + Synthetic',
    type: 'RSI Strategy',
    win: '71%',
    users: '1.6k',
    risk: 'Medium',
    price: 'KSh 3,999',
    description: 'A reversal template that looks for overbought and oversold market zones before entry.',
    settings: ['Indicator: RSI 14', 'Contract: Rise/Fall', 'Entry: extremes', 'Market: forex and synthetics'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'candle-pattern',
    name: 'Candle Pattern',
    market: 'Volatility 25 · 50',
    type: 'Candlestick',
    win: '70%',
    users: '970',
    risk: 'Medium',
    price: 'KSh 3,999',
    description: 'A pattern-reading strategy for engulfing, hammer, and doji-style reversal setups.',
    settings: ['Pattern: 3-candle confirmation', 'Contract: Rise/Fall', 'Timeframe: 1-minute ticks', 'Market: V25 and V50'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'accumulator-range',
    name: 'Accumulator Range',
    market: 'R_10 · R_25',
    type: 'Accumulator',
    win: '64%',
    users: '620',
    risk: 'High',
    price: 'KSh 3,999',
    description: 'A high-return accumulator concept that compounds while price remains inside a range.',
    settings: ['Contract: Accumulators', 'Growth: tick-by-tick', 'Risk: aggressive', 'Market: R_10 and R_25'],
    source: 'Kenyan Prince-style'
  },
  {
    slug: 'hypergal-alpha-ea',
    name: 'HyperGal Alpha EA',
    market: 'Forex Bots / MT4-MT5',
    type: 'Expert Advisor',
    win: 'EA',
    users: 'Forex',
    risk: 'Medium',
    price: 'Free source link',
    description: 'Forex expert-advisor package from the mkulimamdogo Forex bot manifest. Best positioned as an MT4/MT5 download offer.',
    settings: ['File: HyperGal Alpha EA.zip', 'Platform: MT4/MT5', 'Market: Forex', 'Use: EA package'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/HyperGal Alpha EA.zip'
  },
  {
    slug: 'aivex-ai-bot',
    name: 'AIVEX AI BOT',
    market: 'Forex Bots / MT4',
    type: 'Expert Advisor',
    win: 'AI',
    users: 'MT4',
    risk: 'Medium',
    price: 'Free source link',
    description: 'AI-branded MT4 expert advisor entry from the mkulimamdogo Forex bot manifest.',
    settings: ['File: AIVEX AI BOT.ex4', 'Platform: MT4', 'Market: Forex', 'Use: automated EA'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/AIVEX AI BOT.ex4'
  },
  {
    slug: 'btx-scalper-final',
    name: 'BTX SCALPER FINAL',
    market: 'Forex Bots / MT5',
    type: 'Scalper EA',
    win: 'Scalp',
    users: 'MT5',
    risk: 'High',
    price: 'Free source link',
    description: 'MT5 scalping expert advisor from the Forex bot manifest, suitable for short-term campaign positioning.',
    settings: ['File: BTX SCALPER FINAL.ex5', 'Platform: MT5', 'Style: scalping', 'Market: Forex'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/BTX SCALPER FINAL.ex5'
  },
  {
    slug: 'buas-mt4-ea',
    name: 'Buas MT4 EA',
    market: 'Forex Bots / MT4',
    type: 'Expert Advisor',
    win: 'EA',
    users: 'MT4',
    risk: 'Medium',
    price: 'Free source link',
    description: 'MT4 expert advisor from the mkulimamdogo Forex bot catalog.',
    settings: ['File: Buas MT4 EA.ex4', 'Platform: MT4', 'Market: Forex', 'Use: automated EA'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/Buas MT4 EA.ex4'
  },
  {
    slug: 'ea-black-dragon-mt5-v13',
    name: 'EA Black Dragon MT5 V13',
    market: 'Forex Bots / MT5',
    type: 'Expert Advisor',
    win: 'EA',
    users: 'MT5',
    risk: 'High',
    price: 'Free source link',
    description: 'Black Dragon MT5 expert advisor entry, paired with the M5 XAUUSD preset in the manifest.',
    settings: ['File: EA Black Dragon MT5 V13.ex5', 'Platform: MT5', 'Market: Forex', 'Companion preset: M5 XAUUSD'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/EA Black Dragon MT5 V13.ex5'
  },
  {
    slug: 'gold-angel-ea',
    name: 'Gold Angel EA',
    market: 'Forex Bots / Gold',
    type: 'Gold EA',
    win: 'Gold',
    users: 'MT4',
    risk: 'Medium',
    price: 'Free source link',
    description: 'Gold-focused MT4 expert advisor for XAU/USD style Forex campaigns.',
    settings: ['File: Gold Angel EA.ex4', 'Platform: MT4', 'Market: Gold / XAUUSD', 'Use: gold EA'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/Gold Angel EA.ex4'
  },
  {
    slug: 'm5-xauusd-black-dragon-preset',
    name: 'M5 XAUUSD Black Dragon Preset',
    market: 'Forex Bots / Gold',
    type: 'Preset',
    win: 'Set',
    users: 'MT5',
    risk: 'Medium',
    price: 'Free source link',
    description: 'XAUUSD M5 preset intended to pair with Black Dragon style MT5 setups.',
    settings: ['File: M5 Xauusd Black Dragon.set', 'Platform: MT5', 'Market: XAUUSD', 'Use: EA preset'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/M5 Xauusd Black Dragon.set'
  },
  {
    slug: 'predator-ea-mt4',
    name: 'Predator EA MT4',
    market: 'Forex Bots / MT4',
    type: 'Expert Advisor',
    win: 'EA',
    users: 'MT4',
    risk: 'High',
    price: 'Free source link',
    description: 'Predator-branded MT4 expert advisor from the Forex bot manifest.',
    settings: ['File: Predator EA MT4.ex4', 'Platform: MT4', 'Market: Forex', 'Use: automated EA'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/Predator EA MT4.ex4'
  },
  {
    slug: 'singlet-ex5',
    name: 'Singlet',
    market: 'Forex Bots / MT5',
    type: 'Expert Advisor',
    win: 'EA',
    users: 'MT5',
    risk: 'Medium',
    price: 'Free source link',
    description: 'MT5 expert advisor file listed in the mkulimamdogo Forex bot manifest.',
    settings: ['File: Singlet.ex5', 'Platform: MT5', 'Market: Forex', 'Use: automated EA'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/Singlet.ex5'
  },
  {
    slug: 'tpsprotrend-pro-indicator-v6',
    name: 'TPSproTREND Pro Indicator V6.0 MT4',
    market: 'Forex Bots / Indicator',
    type: 'Indicator',
    win: 'Signal',
    users: 'MT4',
    risk: 'Low',
    price: 'Free source link',
    description: 'MT4 trend indicator package from the Forex bot manifest, useful for signal and indicator offers.',
    settings: ['File: TPSproTREND PrO Indicator V6.0 MT4@YoforexPremium.rar', 'Platform: MT4', 'Type: indicator', 'Market: Forex'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/TPSproTREND PrO Indicator V6.0 MT4@YoforexPremium.rar'
  },
  {
    slug: 'trend-ai-ea',
    name: 'Trend AI EA',
    market: 'Forex Bots / MT5',
    type: 'AI Trend EA',
    win: 'AI',
    users: 'MT5',
    risk: 'Medium',
    price: 'Free source link',
    description: 'Trend-following AI-branded MT5 expert advisor from the Forex bot manifest.',
    settings: ['File: Trend AI EA.ex5', 'Platform: MT5', 'Style: trend following', 'Market: Forex'],
    source: 'Mkulima Mdogo Forex Bots',
    sourceFile: 'forex-bots/Trend AI EA.ex5'
  }
];

export const packages = [
  {
    name: 'Starter',
    price: 'KSh 2,999',
    description: 'Best for new Deriv bot users.',
    items: ['KP Striker-style bot', 'Volatility markets', 'PDF setup guide', '30-day support', 'VIP signals preview']
  },
  {
    name: 'Pro',
    price: 'KSh 7,999',
    description: 'For affiliates promoting multiple markets.',
    items: ['Striker + Predator-style bots', 'Forex + synthetic markets', 'Video walkthrough', '90-day WhatsApp support', 'Monthly live session']
  },
  {
    name: 'Elite',
    price: 'KSh 14,999',
    description: 'Complete bot arsenal for serious campaigns.',
    items: ['All bot templates', 'All markets unlocked', '1-on-1 setup call placeholder', 'Lifetime support placeholder', 'Future bot updates']
  }
];

export function botXml(bot) {
  return `<xml xmlns="https://developers.google.com/blockly/xml">
  <strategy name="${bot.name}">
    <market>${bot.market}</market>
    <contract>${bot.type}</contract>
    <risk>${bot.risk}</risk>
    <description>${bot.description}</description>
  </strategy>
</xml>`;
}

export function botSourceUrl(bot) {
  if (!bot.sourceFile) return null;
  return `https://mkulimamdogo.site/xml/${encodeURI(bot.sourceFile)}`;
}
