import {
  CellData,
  LayoutConfig,
} from "../../../../../models/layoutConfigModel";

import _ from "lodash";

export const getShallowLayoutConfigCloneWithNewCellRef = (
  pos: CellData["pos"],
  layoutConfig: LayoutConfig
) => {
  const newCellDataRef = _.cloneDeep(layoutConfig[pos.row][pos.col]);

  let shallowLayoutConfigClone = layoutConfig.map((tab) =>
    tab.map((cellData) => (cellData.pos === pos ? newCellDataRef : cellData))
  );

  return [newCellDataRef, shallowLayoutConfigClone] as const;
};
