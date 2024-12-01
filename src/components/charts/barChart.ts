import type { EChartsOption, BarSeriesOption } from 'echarts';
import type { BarChartConfig } from '../types/uiTypes';
import { getCartesianChartOptions } from './cartesianChart';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToEChartsDataset } from '../utils/dataUtils';

export const getBarChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: BarChartConfig
): EChartsOption => {
  const cartesianOptions = getCartesianChartOptions(data, elementColumns, config);

  const aggregated = aggregateData(data, elementColumns, config);
  const { dimensions, source } = transformToEChartsDataset(aggregated);

  const series = dimensions.slice(1).map(dimension => ({
    name: dimension,
    type: 'bar' as const,
    stack: config.stackType === 'none' ? undefined : config.stackType as 'percentage' | 'total',
    stackStrategy: config.stackType === 'percentage' ? 'percentage' : undefined,
    coordinateSystem: config.radial ? 'polar' : 'cartesian2d',
    label: {
      show: config.showDataLabels,
      position: config.labelPosition || 'top'
    },
    encode: {
      x: 'category',
      y: dimension
    }
  })) as BarSeriesOption[];

  return {
    dataset: { dimensions, source },
    angleAxis: config.radial ? {} : undefined,
    radiusAxis: config.radial ? { type: 'category', z: 10 } : undefined,
    polar: config.radial ? {} : undefined,
    ...cartesianOptions,
    series
  };
};