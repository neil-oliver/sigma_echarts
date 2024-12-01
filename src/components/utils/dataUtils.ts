import { WorkbookElementColumns } from "@sigmacomputing/plugin";

export interface AggregatedDataItem {
  value: number;
  split?: string;
}

export const aggregateData = (
  data: Record<string, any[]>,
  elementColumns: WorkbookElementColumns,
  config: { 
    xField?: string; 
    yField?: string; 
    groupField?: string;
    categoryField?: string;
    sectorField?: string;
    valueField?: string;
    dateField?: string;
  }
): Record<string, AggregatedDataItem | number> => {
  // Get column types from elementColumns
  const xColumnType = config.xField ? elementColumns[config.xField]?.columnType : undefined;
  const yColumnType = config.yField ? elementColumns[config.yField]?.columnType : undefined;

  const categoryArray = config.xField ? data[config.xField] 
    : config.categoryField ? data[config.categoryField]
    : config.sectorField ? data[config.sectorField]
    : config.dateField ? data[config.dateField]
    : [];

  const valueArray = config.yField ? data[config.yField]
    : config.valueField ? data[config.valueField]
    : [];

  // Add early return if arrays are missing
  if (!categoryArray || !valueArray) {
    return {};
  }

  // Format x-axis values based on column type
  const formattedCategoryArray = categoryArray.map(value => {
    if (xColumnType === 'datetime' && value) {
      return new Date(value).toISOString();
    }
    return value;
  });

  // Format y-axis values based on column type
  const formattedValueArray = valueArray.map(value => {
    if (yColumnType === 'number') {
      return parseFloat(String(value)) || 0;
    }
    return value;
  });

  const splitArray = config.groupField ? data[config.groupField] : undefined;

  // Return empty object if required arrays are missing or empty
  if (!formattedCategoryArray || !formattedValueArray) {
    return {};
  }

  const aggregatedData: { [key: string]: any } = {};
  
  // Ensure we only iterate up to the length of the shortest array
  const length = Math.min(formattedCategoryArray.length, formattedValueArray.length);
  
  for (let i = 0; i < length; i++) {
    const category = formattedCategoryArray[i];
    const value = formattedValueArray[i];
    const split = splitArray?.[i];
    
    // Add validation for datetime values
    if (xColumnType === 'datetime') {
      const date = new Date(category);
      if (isNaN(date.getTime())) {
        console.warn('Skipping invalid date:', category);
        continue; // Skip invalid dates
      }
    }
    
    // Skip empty categories, splits, or NaN values
    if (!category || category === '' || isNaN(value) || (split !== undefined && !split)) {
      console.warn('Skipping invalid entry:', { category, value, split });
      continue;
    }

    if (split !== undefined) {
      if (!aggregatedData[category]) {
        aggregatedData[category] = {};
      }
      if (!aggregatedData[category][split]) {
        aggregatedData[category][split] = 0;
      }
      aggregatedData[category][split] += value;
    } else {
      aggregatedData[category] = (aggregatedData[category] || 0) + value;
    }
  }
  
  // Sort the data if it's a datetime column
  if (xColumnType === 'datetime') {
    const sortedData: { [key: string]: any } = {};
    Object.keys(aggregatedData)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .forEach(key => {
        // For stacked data, preserve the inner object structure
        if (typeof aggregatedData[key] === 'object' && aggregatedData[key] !== null) {
          sortedData[key] = { ...aggregatedData[key] };
        } else {
          sortedData[key] = aggregatedData[key];
        }
      });
    return sortedData;
  }
  
  return aggregatedData;
};

export interface TreemapDataItem {
  name: string;
  value: number;
  children?: TreemapDataItem[];
}

export const transformToTreemapData = (
  aggregated: ReturnType<typeof aggregateData>,
  config: { groupField?: string }
): TreemapDataItem[] => {
  // For non-grouped data
  if (!config.groupField) {
    return Object.entries(aggregated).map(([category, value]) => ({
      name: category,
      value: typeof value === 'number' ? value : 0
    }));
  }

  // For grouped data
  const result: TreemapDataItem[] = [];
  
  Object.entries(aggregated).forEach(([category, valueObj]) => {
    // Skip if not an object (shouldn't happen with groupField)
    if (typeof valueObj !== 'object' || valueObj === null) return;

    // Create category node
    const categoryNode: TreemapDataItem = {
      name: category,
      value: 0,
      children: []
    };

    // Add all groups under this category
    Object.entries(valueObj).forEach(([groupName, groupValue]) => {
      const value = typeof groupValue === 'number' ? groupValue : 0;
      categoryNode.value += value;
      categoryNode.children!.push({
        name: groupName,
        value: value
      });
    });

    result.push(categoryNode);
  });

  return result;
};

export interface CalendarDataItem {
  date: string;  // date string
  value: number;
}

export const transformToCalendarData = (
  aggregated: ReturnType<typeof aggregateData>
): CalendarDataItem[] => {
  return Object.entries(aggregated)
    .map(([dateValue, value]) => {
      try {
        // Handle both timestamp numbers and date strings
        const parsedDate = typeof dateValue === 'number' || !isNaN(Number(dateValue))
          ? new Date(Number(dateValue))  // Handle timestamp
          : new Date(dateValue);         // Handle date string
        
        if (isNaN(parsedDate.getTime()) || 
            parsedDate.getFullYear() < 1970 || 
            parsedDate.getFullYear() > 2100) {
          console.warn(`Invalid date encountered: ${dateValue}`);
          return null;
        }
        
        return {
          date: parsedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
          value: typeof value === 'number' ? value : 0
        };
      } catch (error) {
        console.warn(`Error processing date: ${dateValue}`, error);
        return null;
      }
    })
    .filter((item): item is CalendarDataItem => item !== null);
};

export interface EChartsDataset {
  dimensions: any[];
  source: Record<string, any>[];
}

export const transformToEChartsDataset = (
  aggregated: ReturnType<typeof aggregateData>
): EChartsDataset => {
  const firstValue = Object.values(aggregated)[0];
  const isStacked = firstValue && typeof firstValue === 'object';

  if (!isStacked) {
    return {
      dimensions: ['category', 'value'],
      source: Object.entries(aggregated).map(([category, value]) => ({
        category,
        value: typeof value === 'number' ? value : 0
      }))
    };
  }

  // For stacked data
  const allSplits = new Set<string>();
  Object.values(aggregated).forEach(item => {
    if (typeof item === 'object') {
      Object.keys(item).forEach(split => allSplits.add(split));
    }
  });

  return {
    dimensions: ['category', ...Array.from(allSplits)],
    source: Object.entries(aggregated).map(([category, splits]) => {
      const row: any = { category };
      if (typeof splits === 'object') {
        Object.entries(splits).forEach(([split, value]) => {
          row[split] = value;
        });
      }
      return row;
    })
  };
};

