import React from "react";
import cx from "classnames";
import { FaFlagCheckered } from "react-icons/fa";
import { GrFlagFill } from "react-icons/gr";
import { useSelectGameStatus } from "../../app/store/features/game-config/gameConfigSlice";
import { onCellClickActionCreator } from "../../app/store/features/layout-config/action-creators/onCellClickActionCreator";
import { onCellContextMenuActionCreator } from "../../app/store/features/layout-config/action-creators/onCellContextMenuActionCreator";
import { onCellDoubleClickActionCreator } from "../../app/store/features/layout-config/action-creators/onCellDoubleClickActionCreator";
import { useSelectCell } from "../../app/store/features/layout-config/layoutConfigSlice";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import { type CellData } from "../../models/layoutConfigModel";
import styles from "./GameLayoutCell.module.scss";
import { ReactComponent as Mine } from "./../../assets/img/mine.svg";

interface GameLayoutCellProps {
  cellPos: CellData["pos"];
}

const GameLayoutCell = ({ cellPos }: GameLayoutCellProps) => {
  const cellData = useSelectCell(cellPos);
  const dispatch = useAppDispatch();
  const gameStatus = useSelectGameStatus();

  const onClickHandle = () => {
    dispatch(onCellClickActionCreator(cellPos));
  };

  const onContextMenuHandle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(onCellContextMenuActionCreator(cellPos));
  };

  const onDoubleClickHandle = () => {
    dispatch(onCellDoubleClickActionCreator(cellPos));
  };

  let content = null;

  if (typeof cellData.status === "number") {
    content = cellData.status;
  } else if (
    cellData.status === "marked" ||
    cellData.status === "wrongMark" ||
    cellData.status === "correctMark"
  ) {
    content = <GrFlagFill fontSize="0.85em" />;
  } else if (cellData.status === "uncertainMark") {
    content = <FaFlagCheckered fontSize="0.85em" />;
  } else if (gameStatus === "fault" && cellData.hasMine) {
    content = <Mine width="75%" />;
  }
  return (
    <div
      className={cx(
        {
          [styles.unrevealed]: cellData.status === "unrevealed",
          [styles.empty]: cellData.status === "empty",
          [styles.fault]: cellData.status === "fault",
          [styles.marked]: cellData.status === "marked",
          [styles.wrongMark]: cellData.status === "wrongMark",
          [styles.correctMark]: cellData.status === "correctMark",
          [styles.uncertainMark]: cellData.status === "uncertainMark",
          [styles.oneBomb]: cellData.status === 1,
          [styles.twoBombs]: cellData.status === 2,
          [styles.threeBombs]: cellData.status === 3,
          [styles.fourBombs]: cellData.status === 4,
          [styles.fiveBombs]: cellData.status === 5,
          [styles.sixBombs]: cellData.status === 6,
          [styles.sevenBombs]: cellData.status === 7,
          [styles.eightBombs]: cellData.status === 8,
        },
        styles.root
      )}
      onContextMenu={onContextMenuHandle}
      onClick={onClickHandle}
      onDoubleClick={onDoubleClickHandle}
    >
      {content}
    </div>
  );
};

export default React.memo(GameLayoutCell);
