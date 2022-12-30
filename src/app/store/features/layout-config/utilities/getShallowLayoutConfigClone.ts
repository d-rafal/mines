import { LayoutConfig } from "../../../../../models/layoutConfigModel";

export const getShallowLayoutConfigClone = (layoutConfig: LayoutConfig) =>
  layoutConfig.map((tab) => tab.map((cellData) => cellData));
