import { CustomPluginConfigOptions } from '@sigmacomputing/plugin';

export const getHeatmapChartConfig = (): CustomPluginConfigOptions[] => [
  {
    name: 'xField',
    type: 'column',
    label: 'X Axis',
    source: 'dataSource',
    allowedTypes: ['text'],
    allowMultiple: false
  },
  {
    name: 'yField',
    type: 'column',
    label: 'Y Axis',
    source: 'dataSource',
    allowedTypes: ['text'],
    allowMultiple: false
  },
  {
    name: 'valueField',
    type: 'column',
    label: 'Value',
    source: 'dataSource',
    allowedTypes: ['number'],
    allowMultiple: false
  },
  {
    name: 'showDataLabels',
    type: 'toggle',
    label: 'Show Data Labels',
    defaultValue: false,
    source: 'chartSettings'
  }
]; 