import type { EChartsOption, LineSeriesOption } from 'echarts';
import type { LineChartConfig } from '../types/uiTypes';
import { getCartesianChartOptions } from './cartesianChart';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToEChartsDataset } from '../utils/dataUtils';

export const getLineChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: LineChartConfig
): EChartsOption => {
  const cartesianOptions = getCartesianChartOptions(data, elementColumns, config);

  const aggregated = aggregateData(data, elementColumns, config);
  const { dimensions, source } = transformToEChartsDataset(aggregated);

  const series = dimensions.slice(1).map(dimension => ({
    name: dimension,
    type: 'line' as const,
    smooth: config.smoothLine,
    label: {
      show: config.showDataLabels,
      position: config.labelPosition || 'top'
    },
    encode: {
      x: 'category',
      y: dimension
    }
  })) as LineSeriesOption[];

  return {
    dataset: { dimensions, source },
    ...cartesianOptions,
    series
  };
};