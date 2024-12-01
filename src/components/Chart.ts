import type { ChartConfig } from "./types/uiTypes";
import { EChartsOption } from "echarts";
import { WorkbookElementColumns, WorkbookElementData } from "@sigmacomputing/plugin";

import { getAreaChartOptions } from "./charts/areaChart";
import { getBarChartOptions } from "./charts/barChart";
import { getLineChartOptions } from "./charts/lineChart";
import { getScatterChartOptions } from "./charts/scatterChart";
import { getPieChartOptions } from "./charts/pieChart";
import { getNightingaleChartOptions } from "./charts/nightingaleChart";
import { getTreemapChartOptions } from "./charts/treemapChart";
import { getCalendarChartOptions } from "./charts/calendarChart";

export const getChartOptions = (data: WorkbookElementData, elementColumns: WorkbookElementColumns, config: ChartConfig): EChartsOption => {
  switch (config.chartType) {
    case 'bar':
      return getBarChartOptions(data, elementColumns, config);
    case 'line':
      return getLineChartOptions(data, elementColumns, config);
    case 'scatter':
      return getScatterChartOptions(data, elementColumns, config);
    case 'area':
      return getAreaChartOptions(data, elementColumns, config);
    case 'pie':
      return getPieChartOptions(data, elementColumns, config);
    case 'nightingale':
      return getNightingaleChartOptions(data, elementColumns, config);
    case 'treemap':
      return getTreemapChartOptions(data, elementColumns, config);
    case 'calendar':
      return getCalendarChartOptions(data, elementColumns, config);
    default:
      return getBarChartOptions(data, elementColumns, config);
  }
}; 