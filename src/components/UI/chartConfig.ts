import { CustomPluginConfigOptions } from '@sigmacomputing/plugin';

export const getChartTypeConfig = (): CustomPluginConfigOptions[] => [
    {
        type: 'group',
        name: 'chartSelectionSettings',
        label: 'Chart Type'
    },
    {
        name: 'chartType',
        label: 'Chart Type',
        type: 'dropdown',
        defaultValue: 'bar',
        values: ['bar', 'line', 'scatter', 'area', 'pie', 'nightingale', 'treemap', 'calendar', 'sunburst'],
        source: 'chartSelectionSettings'
    }
]; 