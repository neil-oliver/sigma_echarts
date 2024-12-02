import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";

export const getGanttChartConfig = (): CustomPluginConfigOptions[] => [
    {
      name: 'taskField',
      type: 'column',
      label: 'Task Name',
      source: 'dataSource',
      allowedTypes: ['text'],
      allowMultiple: false
    },
    {
      name: 'startField',
      type: 'column',
      label: 'Start Date',
      source: 'dataSource',
      allowedTypes: ['datetime'],
      allowMultiple: false
    },
    {
      name: 'endField',
      type: 'column',
      label: 'End Date',
      source: 'dataSource',
      allowedTypes: ['datetime'],
      allowMultiple: false  
    },
    {
      name: 'progressField',
      type: 'column',
      label: 'Progress (%)',
      source: 'dataSource',
      allowedTypes: ['number'],
      allowMultiple: false
    },
    {
      name: 'groupField',
      type: 'column',
      label: 'Group',
      source: 'dataSource',
      allowedTypes: ['text'],
      allowMultiple: false
    },
    {
      name: 'showProgress',
      type: 'toggle',
      label: 'Show Progress',
      defaultValue: true,
      source: 'chartSettings',
    }
  ]; 