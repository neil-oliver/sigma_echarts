import { client, CustomPluginConfigOptions } from '@sigmacomputing/plugin';
import type { BaseChartConfig, ChartConfig } from '../types/uiTypes';
import { getBaseChartConfig } from './baseConfig';
import { getScatterChartConfig } from './scatterConfig';
import { getBarChartConfig } from './barConfig';
import { getLineChartConfig } from './lineConfig';
import { getPieChartConfig } from './pieConfig';
import { getAreaChartConfig } from './areaConfig';
import { getNightingaleChartConfig } from './nightingaleConfig';
import { getPresetConfig } from './presetConfig';
import { getStyleConfig } from './styleConfig';
import { getChartTypeConfig } from './chartConfig';
import { getTreemapChartConfig } from './treemapConfig';
import { getCalendarChartConfig } from './calendarConfig';

// Map chart types to their config functions
const CHART_CONFIG_MAP = {
  scatter: getScatterChartConfig,
  bar: getBarChartConfig,
  line: getLineChartConfig,
  pie: getPieChartConfig,
  area: getAreaChartConfig,
  nightingale: getNightingaleChartConfig,
  treemap: getTreemapChartConfig,
  calendar: getCalendarChartConfig
} as const;

export const initializeEditorPanel = () => {
  const configurePanel = () => {
    const currentConfig = client.config.get() as ChartConfig;
    const chartType = (currentConfig as BaseChartConfig)?.chartType || 'bar';
    const theme = ('theme' in currentConfig ? currentConfig.theme : 'default') as string;
    
    const getChartConfig = CHART_CONFIG_MAP[chartType as keyof typeof CHART_CONFIG_MAP];
    const chartSpecificConfig = getChartConfig ? getChartConfig() : [];
    
    const configOptions: CustomPluginConfigOptions[] = [
      ...getChartTypeConfig(),
      ...getBaseChartConfig(),
      ...getPresetConfig(),
      ...(theme === 'custom' ? getStyleConfig() : []),
      ...chartSpecificConfig
    ];

    client.config.configureEditorPanel(configOptions);
  };

  // Initial configuration
  configurePanel();

  // Subscribe to changes
  return () => client.config.subscribe(configurePanel);
};

