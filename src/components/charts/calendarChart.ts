import type { HeatmapSeriesOption, EChartsOption } from 'echarts';
import type { CalendarChartConfig } from '../types/uiTypes';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import { transformToCalendarData, aggregateData } from '../utils/dataUtils';

export const getCalendarChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: CalendarChartConfig
  ): EChartsOption => {
    const aggregated = aggregateData(data,elementColumns, config);
  const transformedData = transformToCalendarData(aggregated);

  // Transform data into [date, value] pairs for ECharts
  const calendarData = transformedData.map(d => [d.date, d.value]);

  // Get the date range from the transformed data
  const dates = transformedData.map(d => new Date(d.date));
  const minDate = dates.length ? new Date(Math.min(...dates.map(d => d.getTime()))) : new Date();
  const maxDate = dates.length ? new Date(Math.max(...dates.map(d => d.getTime()))) : new Date();

  const calendarSeriesOption: HeatmapSeriesOption = {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: calendarData,
  };

  return {
    calendar: {
      range: [minDate, maxDate],
    },
    series: [calendarSeriesOption],
    visualMap: {
      min: Math.min(...transformedData.map(d => d.value ?? 0), 0),
      max: Math.max(...transformedData.map(d => d.value ?? 0), 0),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 20
    }
  };
};