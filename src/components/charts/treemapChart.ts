import type { TreemapSeriesOption, EChartsOption } from 'echarts';
import type { TreemapChartConfig } from '../types/uiTypes';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToHierarchicalData } from '../utils/dataUtils';

export const getTreemapChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: TreemapChartConfig
): EChartsOption => {
  const aggregated = aggregateData(data, elementColumns, config);
  const treemapData = transformToHierarchicalData(aggregated, config);

  const treemapSeriesOption: TreemapSeriesOption = {
    type: 'treemap',
    data: treemapData,
  };

  return {
    series: [treemapSeriesOption]
  };
};