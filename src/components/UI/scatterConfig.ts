import { CustomPluginConfigOptions } from "@sigmacomputing/plugin";
import { getCartesianChartConfig } from "./cartesianConfig";

export const getScatterChartConfig = (): CustomPluginConfigOptions[] => [
    ...getCartesianChartConfig(),
  ]; 