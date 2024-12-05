import type { PieSeriesOption, EChartsOption } from 'echarts';
import type { PieChartConfig } from '../types/uiTypes';
import { getBaseChartOptions } from './baseChart';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToEChartsDataset } from '../utils/dataUtils';

export const getPieChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: PieChartConfig
): EChartsOption => {
  const baseOptions = getBaseChartOptions(data, elementColumns, config);

  const aggregated = aggregateData(data, elementColumns, config);
  const { dimensions, source } = transformToEChartsDataset(aggregated);

  const pieSeriesOption: PieSeriesOption = {
    type: 'pie',
    radius: '50%',
    label: {
      formatter: (params: any) => {
        const value = typeof params.value === 'object' ? params.value[dimensions[1]] : params.value;
        return `${params.name}: ${value} (${params.percent}%)`;
      }
    },
    encode: {
      itemName: dimensions[0],
      value: dimensions[1]
    }
  };

  return {
    ...baseOptions,
    dataset: { dimensions, source },
    tooltip: {
      trigger: 'item'
    },
    series: [pieSeriesOption]
  };
};