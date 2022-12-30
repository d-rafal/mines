import { useLayoutEffect, useRef, useState } from "react";
import { restartGameActionCreator } from "../../app/store/features/game-config/action-creators/restartGameActionCreator";
import {
  useSelectGameStatus,
  useSelectLayoutSize,
  useSelectWonMessageType,
  womMessageModalHidden,
} from "../../app/store/features/game-config/gameConfigSlice";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import ClearIntervalID from "../../components/clear-intervalID/ClearIntervalID";
import GameLayout from "../../components/game-layout/GameLayout";
import SideBar from "../../components/side-bar/SideBar";
import Modal from "../../library/modal/Modal";
import BestResultsWon from "../../modals/best-times-won/BestResultsWon";
import Congratulation from "../../modals/congratulation/Congratulation";
import { WonMessage } from "../../models/gameConfigModel";
import {
  GAME_LAYOUT_BORDER_WIDTH,
  MIN_CELL_DIMENSION,
  GAME_ROOT_BLOCK_PADDING,
  GAME_ROOT_INLINE_PADDING,
  SIDE_BAR_GAP,
} from "../../style/consts";
import debounce from "../../utilities/debounce";
import styles from "./Game.module.scss";

declare module "csstype" {
  interface Properties {
    // Add a missing property
    // WebkitRocketLauncher?: string;

    // Add a CSS Custom Property
    "--cell-dimension"?: string;
    "--side-bar-gap"?: string;
    "--game-root-inline-padding"?: string;
    "--game-root-block-padding"?: string;
    "--cell-font-size"?: string;

    // ...or allow any other property
    // [index: string]: any;
  }
}

const Game = () => {
  const gameStatus = useSelectGameStatus();
  const wonMessageType = useSelectWonMessageType();

  const [rowsSize, colsSize] = useSelectLayoutSize();
  const [cellDimension, setCellDimension] = useState(40);

  const rootRef = useRef<HTMLDivElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const resize = debounce(() => {
      const rootRect = rootRef.current?.getBoundingClientRect();
      const sideBarRect = sideBarRef.current?.getBoundingClientRect();

      if (rootRect && sideBarRect) {
        const { height: rootHeight, width: rootWidth } = rootRect;
        const { width: sideBarWidth } = sideBarRect;

        const calCellHeight = Math.floor(
          (rootHeight -
            2 * GAME_LAYOUT_BORDER_WIDTH -
            2 * GAME_ROOT_BLOCK_PADDING) /
            rowsSize
        );

        const calCellWidth = Math.floor(
          (rootWidth -
            sideBarWidth -
            2 * GAME_LAYOUT_BORDER_WIDTH -
            2 * GAME_ROOT_INLINE_PADDING) /
            colsSize
        );

        let calCellDimension =
          calCellHeight < calCellWidth ? calCellHeight : calCellWidth;

        if (calCellDimension < MIN_CELL_DIMENSION) {
          calCellDimension = MIN_CELL_DIMENSION;
        }

        setCellDimension(calCellDimension);
      }
    }, 100);
    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, [rowsSize, colsSize]);

  const dispatch = useAppDispatch();

  const onStartNewGame = () => {
    dispatch(restartGameActionCreator);
  };

  const onClose = () => {
    dispatch(womMessageModalHidden());
  };

  return (
    <>
      <div
        className={styles.root}
        ref={rootRef}
        style={{
          "--game-root-inline-padding": GAME_ROOT_INLINE_PADDING + "px",
          "--game-root-block-padding": GAME_ROOT_BLOCK_PADDING + "px",
        }}
      >
        <div
          className={styles.container}
          style={{
            "--cell-dimension": cellDimension + "px",
            "--side-bar-gap": SIDE_BAR_GAP + "px",
            "--cell-font-size": 0.7 * cellDimension + "px",
          }}
        >
          <GameLayout />
          <SideBar ref={sideBarRef} />
        </div>
      </div>

      <ClearIntervalID />

      {gameStatus === "won" && wonMessageType === WonMessage.Congratulation && (
        <Modal onClose={onClose}>
          <Congratulation onClose={onClose} onStartNewGame={onStartNewGame} />
        </Modal>
      )}

      {gameStatus === "won" && wonMessageType === WonMessage.BestTime && (
        <Modal
          onClose={onClose}
          shouldFocusRoot={false}
          shouldCloseOnClickOutside={false}
        >
          <BestResultsWon onClose={onClose} />
        </Modal>
      )}
    </>
  );
};

export default Game;
