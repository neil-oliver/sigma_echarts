import type { EChartsOption, LineSeriesOption } from "echarts";
import { getCartesianChartOptions } from './cartesianChart';
import { AreaChartConfig } from "../types/uiTypes";
import { WorkbookElementColumns, WorkbookElementData } from "@sigmacomputing/plugin";
import { aggregateData, transformToEChartsDataset } from '../utils/dataUtils';

export const getAreaChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: AreaChartConfig
): EChartsOption => {
  const cartesianOptions = getCartesianChartOptions(data, elementColumns, config);

  const aggregated = aggregateData(data, elementColumns, config);
  const { dimensions, source } = transformToEChartsDataset(aggregated);

  const series = dimensions.slice(1).map(dimension => ({
    name: dimension,
    type: 'line' as const,
    smooth: config.smoothLine,
    areaStyle: {},
    stack: config.stackType === 'none' ? undefined : config.stackType,
    stackStrategy: config.stackType === 'percentage' ? 'percentage' : undefined,
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