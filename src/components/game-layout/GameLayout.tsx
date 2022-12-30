import cx from "classnames";
import { useSelectGameStatus } from "../../app/store/features/game-config/gameConfigSlice";
import { useSelectLayoutConfig } from "../../app/store/features/layout-config/layoutConfigSlice";
import {
  FLEX_CENTER_CLASS_NAME,
  GAME_LAYOUT_BORDER_WIDTH,
} from "../../style/consts";
import GameLayoutCell from "../game-layout-cell/GameLayoutCell";
import styles from "./GameLayout.module.scss";

declare module "csstype" {
  interface Properties {
    // Add a missing property
    // WebkitRocketLauncher?: string;

    // Add a CSS Custom Property
    "--columns-size"?: string;
    "--rows-size"?: string;
    "--game-layout-border-width"?: string;

    // ...or allow any other property
    // [index: string]: any;
  }
}

const GameLayout = () => {
  const layoutConfig = useSelectLayoutConfig();
  const gameStatus = useSelectGameStatus();

  const cells = layoutConfig.map((tab) => {
    return tab.map((cellData) => (
      <GameLayoutCell
        key={String(cellData.pos.row) + String(cellData.pos.col)}
        cellPos={cellData.pos}
      />
    ));
  });

  return (
    <div
      className={cx(
        {
          [styles.inactive]:
            gameStatus !== "active" && gameStatus !== "readyToStart",
        },
        styles.root
      )}
    >
      <div
        className={styles.cellsLayout}
        style={{
          "--rows-size": String(cells.length),
          "--columns-size": String(cells[0].length),
          "--game-layout-border-width": GAME_LAYOUT_BORDER_WIDTH + "px",
        }}
      >
        {cells}
      </div>
      {gameStatus === "paused" && (
        <div className={cx(styles.layoutBackdrop, FLEX_CENTER_CLASS_NAME)}>
          Paused
        </div>
      )}
    </div>
  );
};

export default GameLayout;
