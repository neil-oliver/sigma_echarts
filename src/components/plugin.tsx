import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useElementData, useElementColumns, useConfig } from '@sigmacomputing/plugin';
import { initializeEditorPanel } from './UI/config';
import { getChartOptions } from './Chart';
import { initializeThemes, getThemeForConfig } from './themes/themeManager';

export default function EChartsPlugin() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const config = useConfig();
  const elementData = useElementData(config?.dataSource);
  const elementColumns = useElementColumns(config?.dataSource);

  useEffect(() => {
    initializeEditorPanel();
    initializeThemes();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      const theme = getThemeForConfig(config);
      chartInstance.current = echarts.init(chartRef.current, theme);

      // Reapply options with the new theme
      if (chartInstance.current && lastOptions.current) {
        chartInstance.current.setOption(lastOptions.current, true);
      }

      // Set up ResizeObserver for the container
      resizeObserverRef.current = new ResizeObserver((entries) => {
        if (chartInstance.current) {
          const entry = entries[0];
          chartInstance.current.resize({
            width: entry.contentRect.width,
            height: entry.contentRect.height
          });
        }
      });

      resizeObserverRef.current.observe(chartRef.current);
    }

    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [config]);

  // Store the last used options to reapply after theme changes
  const lastOptions = useRef<any>(null);

  useEffect(() => {
    if (!elementData || !elementColumns || !config) {
      return;
    }

    const baseOptions = getChartOptions(elementData, elementColumns, config);
    
    lastOptions.current = baseOptions;

    if (chartInstance.current) {
      chartInstance.current.setOption(baseOptions, true);
    }
  }, [config, elementData, elementColumns]);

  if (!elementData || !config) {
    return <div>Please configure chart settings</div>;
  }

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }} 
    />
  );
}

