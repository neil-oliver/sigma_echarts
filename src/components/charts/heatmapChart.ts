import type { EChartsOption } from 'echarts';
import type { HeatmapChartConfig } from '../types/uiTypes';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { aggregateData, transformToEChartsDataset } from '../utils/dataUtils';

export const getHeatmapChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: HeatmapChartConfig
): EChartsOption => {
  const aggregated = aggregateData(data, elementColumns, config);
  const { dimensions, source } = transformToEChartsDataset(aggregated);

  // Calculate min and max values for the visualMap
  const values = source.map(item => item.value);
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 1;

  return {
    dataset: { dimensions, source },
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        return `${params.data.x}, ${params.data.y}: ${params.data.value}`;
      }
    },
    grid: {
      containLabel: true,
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      position: 'bottom',
    },
    yAxis: {
      type: 'category',
    },
    visualMap: {
      min: minValue,
      max: maxValue,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 20,
    },
    series: [{
      type: 'heatmap',
      label: {
        show: config.showDataLabels,
      },
      encode: {
        x: 'x',
        y: 'y',
        value: 'value'
      }
    }]
  };
}; 