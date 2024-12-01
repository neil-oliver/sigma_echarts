import type { ScatterSeriesOption, EChartsOption } from 'echarts';
import type { ScatterChartConfig } from '../types/uiTypes';
import { getCartesianChartOptions } from './cartesianChart';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToEChartsDataset } from '../utils/dataUtils';

export const getScatterChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: ScatterChartConfig
): EChartsOption => {
  const cartesianOptions = getCartesianChartOptions(data, elementColumns, config);
  
  const aggregated = aggregateData(data, elementColumns, config);
  const { dimensions, source } = transformToEChartsDataset(aggregated);

  const series = dimensions.slice(1).map(dimension => ({
    name: dimension,
    type: 'scatter' as const,
    label: {
      show: config.showDataLabels,
      position: config.labelPosition || 'top'
    },
    encode: {
      x: 'category',
      y: dimension
    }
  })) as ScatterSeriesOption[];

  return {
    dataset: { dimensions, source },
    ...cartesianOptions,
    series
  };
}; 
