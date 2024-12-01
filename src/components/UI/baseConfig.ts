import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";

export const getBaseChartConfig = (): CustomPluginConfigOptions[] => [
    {
        name: 'dataSource',
        label: 'Data Source',
        type: 'element'
    },
    {
        type: 'group',
        name: 'chartSettings',
        label: 'Chart Settings'
    }
]; 