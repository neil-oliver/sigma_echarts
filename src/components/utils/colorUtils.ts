import * as echarts from 'echarts';

export function lightenColor(color?: string, amount?: number): string {
  if (!color) return "#FFF";

  const hex = color.replace('#', '');
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const lightenComponent = (c: number) => Math.min(255, Math.round(c + (255 - c) * (amount ?? 0)));
  
  const rr = lightenComponent(r).toString(16).padStart(2, '0');
  const gg = lightenComponent(g).toString(16).padStart(2, '0');
  const bb = lightenComponent(b).toString(16).padStart(2, '0');
  
  return `#${rr}${gg}${bb}`;
}

export function darkenColor(color?: string, amount?: number): string {
  if (!color) return "#FFF";

  const hex = color.replace('#', '');
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const darkenComponent = (c: number) => Math.max(0, Math.round(c - c * (amount ?? 0)));
  
  const rr = darkenComponent(r).toString(16).padStart(2, '0');
  const gg = darkenComponent(g).toString(16).padStart(2, '0');
  const bb = darkenComponent(b).toString(16).padStart(2, '0');
  
  return `#${rr}${gg}${bb}`;
}

export function getGradientColor(color?: string): echarts.LinearGradientObject | undefined {
  if (!color) return undefined;
  
  return {
    type: 'linear' as const,
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
      offset: 0,
      color: color
    }, {
      offset: 1,
        color: lightenColor(color, 0.3)
    }]
  };
} 