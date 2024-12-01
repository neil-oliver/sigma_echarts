import type { PieSeriesOption, EChartsOption } from 'echarts';
import type { NightingaleChartConfig } from '../types/uiTypes';
import { getBaseChartOptions } from './baseChart';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToEChartsDataset } from '../utils/dataUtils';

export const getNightingaleChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: NightingaleChartConfig
): EChartsOption => {
  const baseOptions = getBaseChartOptions(data, elementColumns, config);

  const aggregated = aggregateData(data, elementColumns, config);
  const { dimensions, source } = transformToEChartsDataset(aggregated);

  const nightingaleSeriesOption: PieSeriesOption = {
    type: 'pie',
    roseType: 'area',
    radius: ['20%', '70%'],
    itemStyle: {
      borderRadius: 8
    },
    label: {
      formatter: '{b}: {c}'
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
    series: [nightingaleSeriesOption]
  };
};