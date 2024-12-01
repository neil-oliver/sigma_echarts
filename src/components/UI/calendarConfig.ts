import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";

export const getCalendarChartConfig = (): CustomPluginConfigOptions[] => [
    {
      name: 'dateField',
      type: 'column',
      label: 'Date',
      source: 'dataSource',
      allowedTypes: ['datetime'],
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
  ]; 