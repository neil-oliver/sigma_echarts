import type { EChartsOption } from 'echarts';
import { WorkbookElementColumns, WorkbookElementData } from '@sigmacomputing/plugin';
import type { GanttChartConfig } from '../types/uiTypes';
import { aggregateGanttData } from '../utils/dataUtils';
import { darkenColor } from '../utils/colorUtils';

export const getGanttChartOptions = (
  data: WorkbookElementData,
  elementColumns: WorkbookElementColumns,
  config: GanttChartConfig
): EChartsOption => {
  const { tasks, minDate, maxDate } = aggregateGanttData(data, elementColumns, config);

  const groupedTasks = tasks.reduce((acc, task) => {
    const group = task.group || 'Ungrouped';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const dimensions = ['name', 'start', 'end', 'progress', 'isGroup'];
  const source = Object.entries(groupedTasks).flatMap(([groupName, groupTasks]) => [
    ...groupTasks.map(task => ({
      name: task.name,
      start: new Date(task.start).getTime(),
      end: new Date(task.end).getTime(),
      progress: task.progress,
      isGroup: false,
      groupName
    })),
    {
      name: groupName,
      start: Math.min(...groupTasks.map(t => new Date(t.start).getTime())),
      end: Math.max(...groupTasks.map(t => new Date(t.end).getTime())),
      progress: undefined,
      isGroup: true
    }
  ]);

  return {
    dataset: { dimensions, source },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const task = params[0];
        let tooltip = `Task: ${task.name}<br/>`;
        tooltip += `Start: ${new Date(task.value[0]).toLocaleDateString()}<br/>`;
        tooltip += `End: ${new Date(task.value[1]).toLocaleDateString()}<br/>`;
        if (task.value[2] !== undefined) {
          tooltip += `Progress: ${(task.value[2] * 100).toFixed(1)}%`;
        }
        return tooltip;
      }
    },
    xAxis: {
      type: 'time',
      min: minDate,
      max: maxDate
    },
    yAxis: {
      type: 'category',
      data: source.map(task => task.name),
      axisLabel: {
        formatter: (value: string) => value.trim()
      }
    },
    series: [{
      type: 'custom',
      renderItem: (params, api) => {
        const start = api.coord([api.value(1), api.value(0)]) as [number, number];
        const end = api.coord([api.value(2), api.value(0)]) as [number, number];
        const progress = api.value(3) as number;
        const isGroup = Boolean(api.value(4));
        const height = isGroup ? 12 : 20;
        const yOffset = 0;

        const baseColor = api.visual('color') as string;
        const darkerColor = darkenColor(baseColor, 0.3);

        const baseBar = {
          type: 'rect' as const,
          shape: {
            x: start[0],
            y: start[1] - height / 2 + yOffset,
            width: end[0] - start[0],
            height: height
          },
          style: {
            fill: isGroup ? '#e0e0e0' : baseColor,
            stroke: isGroup ? '#cccccc' : darkerColor,
            lineWidth: 1
          }
        };

        if (progress !== undefined && !isGroup && config.showProgress) {
          const progressBar = {
            type: 'rect' as const,
            shape: {
              x: start[0],
              y: start[1] - height / 2 + yOffset,
              width: (end[0] - start[0]) * progress,
              height: height
            },
            style: {
              fill: darkerColor
            }
          };
          return {
            type: 'group',
            children: [baseBar, progressBar]
          };
        }

        return baseBar;
      },
      encode: {
        x: [1, 2],
        y: 0
      }
    }]
  };
}; 