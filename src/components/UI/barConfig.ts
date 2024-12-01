import { CustomPluginConfigOptions } from '@sigmacomputing/plugin';
import { getCartesianChartConfig } from "./cartesianConfig";

export const getBarChartConfig = (): CustomPluginConfigOptions[] => [
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
      name: 'curvedEdges',
      type: 'toggle',
      defaultValue: false,
      label: 'Curved Edges',
      source: 'chartSettings'
    },
    {
      name: 'radial',
      type: 'toggle',
      defaultValue: false,
      label: 'Radial',
      source: 'chartSettings'
    }
  ]; 