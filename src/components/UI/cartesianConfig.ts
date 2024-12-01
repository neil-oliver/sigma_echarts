import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";

export const getCartesianChartConfig = (): CustomPluginConfigOptions[] => [
    {
      name: 'xField',
      type: 'column',
      label: 'X Axis',
      source: 'dataSource',
      allowedTypes: ['number', 'datetime', 'text'],
      allowMultiple: false
    },
    {
      name: 'yField',
      type: 'column',
      label: 'Y Axis',
      source: 'dataSource',
      allowedTypes: ['number', 'datetime', 'text'],
      allowMultiple: false
    },
    {
      name: 'groupField',
      type: 'column',
      label: 'Group By',
      source: 'dataSource',
      allowedTypes: ['text'],
      allowMultiple: false
    },
    {
      name: 'xAxisLabel',
      type: 'text',
      label: 'X-Axis Label',
      placeholder: 'X-Axis Label',
      source: 'chartSettings'
    },
    {
      name: 'yAxisLabel',
      type: 'text',
      label: 'Y-Axis Label',
      placeholder: 'Y-Axis Label',
      source: 'chartSettings'
    },
    {
      name: 'miniMap',
      type: 'toggle',
      defaultValue: false,
      label: 'Mini Map',
      source: 'chartSettings'
    },
  ]; 