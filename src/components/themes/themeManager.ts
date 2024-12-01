import * as echarts from 'echarts';
import { vintageTheme } from './vintage';
import { darkTheme } from './dark';
import { darkenColor, getGradientColor, lightenColor } from '../utils/colorUtils';
import { deepMerge } from '../utils/mergeUtils';

export function initializeThemes() {
    echarts.registerTheme('vintage', vintageTheme);
    echarts.registerTheme('dark', darkTheme);
}

export function getThemeForConfig(config: any): string {
    const themeName = config?.theme ?? 'default';

    if (themeName !== 'custom') {
        return themeName;
    }

    let jsonTheme = {};
    if (config?.themeJSON) {
        try {
            jsonTheme = JSON.parse(config.themeJSON);
        } catch (error) {
            console.warn('Invalid JSON theme configuration:', error);
        }
    }

    const commonItemStyle = {
        borderColor: (params: any) => {
            const color = params.color ?? config?.textColor;
            return config?.stroke
                ? (config?.strokeColor === 'darken'
                    ? darkenColor(color, 0.3)
                    : lightenColor(color, 0.3))
                : undefined
        },
        borderWidth: config?.stroke ? 1 : 0,
        color: (params: any) => {
            const color = params.color ?? config?.fillColor;
            return config?.gradientFill ? getGradientColor(color) : color;
        }
    };

    // Build custom theme from config
    const customTheme = {
        ...(config?.themeColors && {
            color: config.themeColors.split(',')
                .filter(Boolean)
                .map((color: string) => color.trim())
        }),
        backgroundColor: config?.backgroundColor ?? '#ffffff',
        textStyle: {
            color: config?.textColor ?? '#333333',
            fontFamily: config?.fontFamily ?? 'sans-serif',
        },
        categoryAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: config?.axisColor ?? '#333333'
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: config?.axisColor ?? '#333333'
                }
            },
            splitLine: {
                lineStyle: {
                    color: config?.gridColor ?? '#e0e0e0'
                }
            }
        },
        valueAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: config?.axisColor ?? '#333333'
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: config?.axisColor ?? '#333333'
                }
            },
            splitLine: {
                lineStyle: {
                    color: config?.gridColor ?? '#e0e0e0'
                }
            }
        },
        label: {
            show: config?.showDataLabels ?? false,
            position: config?.labelPosition ?? 'top',
            color: config?.textColor ?? '#333333'
        },
        bar: {
            itemStyle: { ...commonItemStyle,
                borderRadius: config?.curvedEdges ? [5, 5, 5, 5] : undefined,
            },
        },
        line: { itemStyle: { ...commonItemStyle } },
        pie: { itemStyle: { ...commonItemStyle } },
        scatter: { itemStyle: { ...commonItemStyle } },
        radar: { itemStyle: { ...commonItemStyle } },
        candlestick: { itemStyle: { ...commonItemStyle } }
    };

    const mergedTheme = deepMerge(customTheme, jsonTheme);

    echarts.registerTheme('custom', mergedTheme);
    return 'custom';
} 