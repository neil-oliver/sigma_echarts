import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";

export const getNightingaleChartConfig = (): CustomPluginConfigOptions[] => [
    {
      name: 'sectorField',
      type: 'column',
      label: 'Sector',
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
    }
  ]; 