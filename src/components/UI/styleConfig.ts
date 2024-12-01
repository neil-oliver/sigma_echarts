import { CustomPluginConfigOptions } from '@sigmacomputing/plugin';

export const getStyleConfig = (): CustomPluginConfigOptions[] => [
    {
        name: 'themeColors',
        type: 'text',
        label: 'Theme Colors',
        placeholder: 'Comma-separated hex codes',
        source: 'styleGroup'
    },
    {
        name: 'backgroundColor',
        type: 'color',
        label: 'Background Color',
        source: 'styleGroup'
    },
    {
        name: 'textColor',
        type: 'color',
        label: 'Text Color',
        source: 'styleGroup'
    },
    {
        name: 'fontFamily',
        type: 'text',
        label: 'Font Family',
        defaultValue: 'sans-serif',
        source: 'styleGroup'
    },
    {
        name: 'axisColor',
        type: 'color',
        label: 'Axis Color',
        source: 'styleGroup'
    },
    {
        name: 'gridColor',
        type: 'color',
        label: 'Grid Color',
        source: 'styleGroup'
    },
    {
        name: 'showDataLabels',
        type: 'toggle',
        label: 'Show Data Labels',
        defaultValue: false,
        source: 'styleGroup'
    },
    {
        name: 'labelPosition',
        type: 'dropdown',
        label: 'Label Position',
        defaultValue: 'top',
        values: ['top', 'left', 'right', 'bottom', 'inside'],
        source: 'styleGroup'
    },
    {
        name: 'gradientFill',
        type: 'toggle',
        label: 'Gradient Fill',
        defaultValue: true,
        source: 'styleGroup'
    },
    {
        name: 'stroke',
        type: 'toggle',
        label: 'Stroke',
        defaultValue: false,
        source: 'styleGroup'
    },
    {
        name: 'strokeColor',
        type: 'dropdown',
        label: 'Stroke Color',
        defaultValue: 'lighten',
        values: ['lighten', 'darken'],
        source: 'styleGroup'
    },
    {
        name: 'themeJSON',
        type: 'text',
        label: 'Custom Theme JSON',
        multiline: true,
        placeholder: 'Paste your theme JSON configuration here',
        source: 'styleGroup'
    }
]; 
