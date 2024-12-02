import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";

export const getSunburstChartConfig = (): CustomPluginConfigOptions[] => [
    {
      name: 'categoryField',
      type: 'column',
      label: 'Category',
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
      name: 'groupField',
      type: 'column',
      label: 'Group By',
      source: 'dataSource',
      allowedTypes: ['text'],
      allowMultiple: false
    }
  ]; 