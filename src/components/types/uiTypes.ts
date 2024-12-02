export type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'area' | 'nightingale' | 'treemap' | 'calendar' | 'sunburst';

export type ThemePreset = 'default' | 'vintage' | 'dark' | 'custom';

export interface PresetConfig extends BaseChartConfig {
  preset: ThemePreset;
}

export interface StyleConfig extends BaseChartConfig {
  backgroundColor?: string;
  textColor?: string;
  axisColor?: string;
  gridColor?: string;
  colorPalette?: string[];
  fontFamily?: string;
}


export interface BaseChartConfig {
  dataSource?: string;
  chartType?: ChartType;
  fillColor?: string;
  gradientFill?: boolean;
  stroke?: boolean;
  strokeColor?: string;
  showDataLabels?: boolean;
  labelPosition?: ['top' | 'left' | 'right' | 'bottom' | 'inside' | 'outside'];
  radial?: boolean;
  miniMap?: boolean;
}

// Common interface for cartesian properties
interface CartesianConfig extends BaseChartConfig {
  xField?: string;
  yField?: string;
  groupField?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface PieConfig extends BaseChartConfig {
  sectorField?: string;
  valueField?: string;
}

export interface LineChartConfig extends CartesianConfig {
  smoothLine?: boolean;
}

export interface BarChartConfig extends CartesianConfig {
  curvedEdges?: boolean;
  radial?: boolean;
  stackType?: 'none' | 'total' | 'percentage';
}

export interface ScatterChartConfig extends CartesianConfig {
}

export interface AreaChartConfig extends CartesianConfig {
  smoothLine?: boolean;
  stackType?: 'none' | 'total' | 'percentage';
}

export interface PieChartConfig extends PieConfig {
}

export interface NightingaleChartConfig extends PieConfig {
}

export interface CalendarChartConfig extends BaseChartConfig {
  categoryField?: string;
  valueField?: string;
}

export interface TreemapChartConfig extends BaseChartConfig {
  categoryField?: string;
  valueField?: string;
  groupField?: string;
}

export interface SunburstChartConfig extends BaseChartConfig {
  sectorField?: string;
  valueField?: string;
  groupField?: string;
}

export type CartesianChartConfig = LineChartConfig | BarChartConfig | ScatterChartConfig | AreaChartConfig;
export type ChartConfig = CartesianChartConfig | PieChartConfig | NightingaleChartConfig | TreemapChartConfig | CalendarChartConfig | PresetConfig | StyleConfig | SunburstChartConfig; 
