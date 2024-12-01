import { CustomPluginConfigOptions } from '@sigmacomputing/plugin';

export const getPresetConfig = (): CustomPluginConfigOptions[] => [
    {
        type: 'group',
        name: 'styleGroup',
        label: 'Styling'
    },
    {
        name: 'theme',
        type: 'dropdown',
        label: 'Preset',
        defaultValue: 'default',
        values: ['default', 'vintage', 'dark', 'custom'],
        source: 'styleGroup'
    }
]; 