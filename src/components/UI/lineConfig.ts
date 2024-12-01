import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";
import { getCartesianChartConfig } from "./cartesianConfig";

export const getLineChartConfig = (): CustomPluginConfigOptions[] => [
    ...getCartesianChartConfig(),
    {
      name: 'smoothLine',
      type: 'toggle',
      label: 'Smooth Line',
      defaultValue: false,
      source: 'chartSettings'
    },
    {
      name: 'gradientFill',
      type: 'toggle',
      label: 'Gradient Fill',
      defaultValue: false,
      source: 'chartSettings'
    }
  ]; 