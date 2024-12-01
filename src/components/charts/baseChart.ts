import type { EChartsOption } from 'echarts';
import type { ChartConfig } from '../types/uiTypes';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';

export type BaseChartOptions = Omit<EChartsOption, 'series'>;

export const getBaseChartOptions = (
    data: WorkbookElementData,
    elementColumns: WorkbookElementColumns,
    config: ChartConfig
): Partial<BaseChartOptions> => {
    return {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
    };
};