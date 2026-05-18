import { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';

export function MarketChart({ candles, height = 320 }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !candles.length) return undefined;

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#344054'
      },
      grid: {
        vertLines: { color: '#eef2f6' },
        horzLines: { color: '#eef2f6' }
      },
      rightPriceScale: {
        borderColor: '#d0d5dd'
      },
      timeScale: {
        borderColor: '#d0d5dd',
        timeVisible: true,
        secondsVisible: false
      },
      crosshair: {
        mode: 1
      }
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#16a34a',
      downColor: '#ff444f',
      borderUpColor: '#16a34a',
      borderDownColor: '#ff444f',
      wickUpColor: '#16a34a',
      wickDownColor: '#ff444f'
    });

    candleSeries.setData(candles);
    chart.timeScale().fitContent();
    chartRef.current = chart;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [candles, height]);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
}
