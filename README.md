# Echarts Sigma Computing Plugin

A powerful and flexible charting plugin for Sigma Computing that leverages the capabilities of Apache ECharts. This plugin supports multiple chart types with extensive customization options.

## Installation

[Install Instructions](https://github.com/sigmacomputing/sigma-sample-plugins/blob/main/sample-plugin-bar-chart/README.md)

Hosted Plugin:[https://sigma-echarts.netlify.app](https://sigma-echarts.netlify.app)

## Supported Chart Types

- Bar Chart
- Line Chart
- Scatter Plot
- Area Chart
- Pie Chart
- Nightingale Rose Chart
- Treemap
- Calendar Heat Map

## Features

### Data Configuration
- Flexible data source mapping
- Support for multiple data types (text, number, datetime)
- Group by functionality for most chart types

### Chart-Specific Features

#### Cartesian Charts (Bar, Line, Scatter, Area)
- X and Y axis customization
- Optional mini map
- Custom axis labels
- Group by functionality

#### Bar Chart
- Stack types (none, total)
- Curved edges option
- Radial layout option

#### Line Chart
- Smooth line option
- Gradient fill option

#### Area Chart
- Stack types (none, total)
- Smooth line option

#### Pie & Nightingale Charts
- Sector and value mapping
- Radial data visualization

#### Treemap
- Hierarchical data visualization
- Category, value, and grouping support

#### Calendar Chart
- Date-based heat map visualization
- Perfect for temporal data analysis

### Styling Options

#### Theme Presets
- Default theme
- Vintage theme
- Dark theme
- Custom theme support

#### Customization Options
- Custom color palettes (comma-separated hex codes)
- Background color
- Text color and font family
- Axis and grid colors
- Data label display and positioning
- Gradient fill effects
- Stroke customization
- Advanced theme customization via JSON

## Configuration Guide

### Basic Setup
1. Select your data source
2. Choose a chart type
3. Map your data fields to the appropriate axes or dimensions

### Style Customization
1. Select a preset theme or choose 'custom'
2. Customize colors, fonts, and other visual elements
3. Enable/disable features like data labels and gradients
4. For advanced customization, use the Custom Theme JSON option