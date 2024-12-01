import { CustomPluginConfigOptions } from '@sigmacomputing/plugin';
import { getCartesianChartConfig } from "./cartesianConfig";

export const getAreaChartConfig = (): CustomPluginConfigOptions[] => [
    ...getCartesianChartConfig(),
    {
      name: 'stackType',
      type: 'dropdown',
      label: 'Stack Type',
      defaultValue: 'none',
      source: 'chartSettings',
      values: ['none', 'total']
    },
    {
      name: 'smoothLine',
      type: 'toggle',
      defaultValue: false,
      label: 'Smooth Line',
      source: 'chartSettings'
    }
  ]; 