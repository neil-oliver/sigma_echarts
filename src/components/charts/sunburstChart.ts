import type { EChartsOption } from 'echarts';
import type { SunburstChartConfig } from '../types/uiTypes';
import { getBaseChartOptions } from './baseChart';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToHierarchicalData } from '../utils/dataUtils';

export const getSunburstChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: SunburstChartConfig
): EChartsOption => {
  const baseOptions = getBaseChartOptions(data, elementColumns, config);

  const aggregated = aggregateData(data, elementColumns, config);
  const sunburstData = transformToHierarchicalData(aggregated, config);

  return {
    ...baseOptions,
    series: [{
      type: 'sunburst',
      data: sunburstData,
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }]
  };
}; 