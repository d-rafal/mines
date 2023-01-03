import { forwardRef, useState } from "react";
import { BsClock } from "react-icons/bs";
import { restartGameActionCreator } from "../../app/store/features/game-config/action-creators/restartGameActionCreator";
import { switchToActiveActionCreator } from "../../app/store/features/game-config/action-creators/switchToActiveActionCreator";
import { switchToIdleActionCreator } from "../../app/store/features/game-config/action-creators/switchToIdleActionCreator";
import { switchToPausedActionCreator } from "../../app/store/features/game-config/action-creators/switchToPausedActionCreator";
import {
  useSelectGameDuration,
  useSelectGameStatus,
  useSelectMinesStatus,
  useSelectPausedByPauseBtn,
} from "../../app/store/features/game-config/gameConfigSlice";
import { showBestResults } from "../../app/store/features/show-elemetns/showElementsSlice";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import Button from "../../library/button/Button";
import Modal from "../../library/modal/Modal";
import StartNewGame from "../../modals/start-new-game/StartNewGame";
import styles from "./SideBar.module.scss";
import { convertMsToMinutesSecondsString } from "./utilities/convertMsToMinutesSecondsString";

interface SideBarProps {}

const SideBar = forwardRef<HTMLDivElement, SideBarProps>((_, ref) => {
  const [minesQn, markedMines] = useSelectMinesStatus();
  const gameDuration = useSelectGameDuration();

  const pausedByPauseBtn = useSelectPausedByPauseBtn();

  const dispatch = useAppDispatch();

  const [isStartOverModalOpen, setIsStartOverModalOpen] = useState(false);
  const [isChangeDifficultyModalOpen, setIsChangeDifficultyModalOpen] =
    useState(false);

  const gameStatus = useSelectGameStatus();

  const shouldShowPlayAgainBtn = gameStatus === "fault" || gameStatus === "won";

  const onPlayAgainHandle = () => {
    if (shouldShowPlayAgainBtn) {
      dispatch(restartGameActionCreator);
    }
  };

  const shouldShowStartOverBtn =
    gameStatus === "readyToStart" ||
    gameStatus === "active" ||
    gameStatus === "paused";

  const shouldShowPausedBtn =
    gameStatus === "readyToStart" ||
    gameStatus === "active" ||
    gameStatus === "paused";

  const onStartOverHandle = () => {
    if (gameStatus === "active") {
      dispatch(switchToPausedActionCreator({ byPauseBtn: false }));
      setIsStartOverModalOpen(true);
    } else if (gameStatus === "paused") {
      setIsStartOverModalOpen(true);
    }
  };

  const onStartOverModalClose = () => {
    if (!pausedByPauseBtn) {
      dispatch(switchToActiveActionCreator);
    }

    setIsStartOverModalOpen(false);
  };

  const shouldShowBestTimesBtn = gameStatus === "won" || gameStatus === "fault";

  const onBestTimesHandle = () => {
    if (shouldShowBestTimesBtn) {
      dispatch(showBestResults());
    }
  };

  const onChangeDifficultyHandle = () => {
    if (
      gameStatus === "readyToStart" ||
      gameStatus === "won" ||
      gameStatus === "fault"
    ) {
      dispatch(switchToIdleActionCreator);
    } else if (gameStatus === "active") {
      dispatch(switchToPausedActionCreator({ byPauseBtn: false }));
      setIsChangeDifficultyModalOpen(true);
    } else if (gameStatus === "paused") {
      setIsChangeDifficultyModalOpen(true);
    }
  };

  const onChangeDifficultyModalClose = () => {
    if (!pausedByPauseBtn) {
      dispatch(switchToActiveActionCreator);
    }

    setIsChangeDifficultyModalOpen(false);
  };

  const onPauseHandle = () => {
    if (gameStatus === "paused") {
      dispatch(switchToActiveActionCreator);
    } else {
      dispatch(switchToPausedActionCreator({ byPauseBtn: true }));
    }
  };

  return (
    <>
      <div className={styles.root} ref={ref}>
        <p className={styles.remainingMines}>
          {markedMines}/{minesQn}
        </p>

        <div className={styles.timer}>
          <BsClock className={styles.icon} />
          <p>{convertMsToMinutesSecondsString(gameDuration)}</p>
        </div>

        {shouldShowPlayAgainBtn && (
          <Button
            customizedClassName={styles.optionBtn}
            onClick={onPlayAgainHandle}
          >
            Play again
          </Button>
        )}
        {shouldShowBestTimesBtn && (
          <Button
            customizedClassName={styles.optionBtn}
            onClick={onBestTimesHandle}
          >
            Best times
          </Button>
        )}
        {shouldShowStartOverBtn && (
          <Button
            customizedClassName={styles.optionBtn}
            onClick={onStartOverHandle}
            disabled={gameStatus !== "active" && gameStatus !== "paused"}
          >
            Start over
          </Button>
        )}
        <Button
          customizedClassName={styles.optionBtn}
          onClick={onChangeDifficultyHandle}
        >
          Change Difficulty
        </Button>
        {shouldShowPausedBtn && (
          <Button
            customizedClassName={styles.optionBtn}
            onClick={onPauseHandle}
            disabled={gameStatus !== "active" && gameStatus !== "paused"}
          >
            {gameStatus === "paused" ? "Resume" : "Pause"}
          </Button>
        )}
      </div>
      {isStartOverModalOpen && (
        <Modal onClose={onStartOverModalClose}>
          <StartNewGame
            onKeepCurrentGame={onStartOverModalClose}
            onStartNewGame={() => {
              dispatch(restartGameActionCreator);
              setIsStartOverModalOpen(false);
            }}
          />
        </Modal>
      )}
      {isChangeDifficultyModalOpen && (
        <Modal onClose={onChangeDifficultyModalClose}>
          <StartNewGame
            onKeepCurrentGame={onChangeDifficultyModalClose}
            onStartNewGame={() => {
              dispatch(switchToIdleActionCreator);
            }}
          />
        </Modal>
      )}
    </>
  );
});

export default SideBar;
