import type { EChartsOption, XAXisComponentOption, YAXisComponentOption } from 'echarts';
import type { CartesianChartConfig } from '../types/uiTypes';
import { getBaseChartOptions } from './baseChart';
import { WorkbookElementColumns, WorkbookElementData, ValueType } from '@sigmacomputing/plugin';

export const getCartesianChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: CartesianChartConfig
): Partial<EChartsOption> => {
  const baseOptions = getBaseChartOptions(data, elementColumns, config);
  
  // Get column types
  const xColumnType = (config.xField ? elementColumns[config.xField]?.columnType : 'text') as ValueType;
  const yColumnType = (config.yField ? elementColumns[config.yField]?.columnType : 'number') as ValueType;

  // Configure axes based on data types
  const xAxisConfig: XAXisComponentOption = {
    type: (() => {
      switch (xColumnType) {
        case 'number':
          return 'value';
        case 'datetime':
          return 'time';
        case 'text':
        default:
          return 'category';
      }
    })(),
    name: config.xAxisLabel
  };

  const yAxisConfig: YAXisComponentOption = {
    type: (() => {
      switch (yColumnType) {
        case 'number':
          return 'value';
        case 'datetime':
          return 'time';
        case 'text':
        default:
          return 'value';
      }
    })(),
    name: config.yAxisLabel

  };

  return {
    ...baseOptions,
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        if (!Array.isArray(params)) {
          params = [params];
        }
        
        const xValue = xColumnType === 'datetime' 
          ? new Date(params[0].axisValue).toLocaleDateString()
          : params[0].axisValue;

        const lines = params.map((param: any) => {
          const value = param.value[param.dimensionNames[param.encode.y[0]]];
          const formattedValue = yColumnType === 'datetime' 
            ? new Date(value).toLocaleDateString()
            : value;
          
          return `${param.marker} ${param.seriesName}: ${formattedValue}`;
        });

        return `${xValue}<br/>${lines.join('<br/>')}`;
      }
    },
    toolbox: {
      feature: {
        dataZoom: { yAxisIndex: 'none' },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: config.miniMap ? [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ] : undefined,
    grid: {
      containLabel: true,
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '10%'
    },
    xAxis: config.radial ? undefined : xAxisConfig,
    yAxis: config.radial ? undefined : yAxisConfig
  };
};