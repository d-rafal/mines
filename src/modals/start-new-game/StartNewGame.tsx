import { SlQuestion } from "react-icons/sl";
import ModalContentContainer from "../../components/modal-content-container/ModalContentContainer";
import ModalOptionsButtons from "../../components/modal-options-buttons/ModalOptionsButtons";
import styles from "./StartNewGame.module.scss";

interface StartNewGameProps {
  onKeepCurrentGame: () => void;
  onStartNewGame: () => void;
}

const StartNewGame = ({
  onKeepCurrentGame,
  onStartNewGame,
}: StartNewGameProps) => {
  return (
    <ModalContentContainer customizedClassName={styles.root}>
      <div className={styles.information}>
        <SlQuestion className={styles.icon} />
        <div className={styles.text}>
          <p>Do you want to start a new game?</p>
          <p>If you start a new game, your current progress will be lost.</p>
        </div>
      </div>

      <ModalOptionsButtons
        cancelBtnContent="Keep Current Game"
        onCancelBtnClickHandle={onKeepCurrentGame}
        yesBtnContent="Start New Game"
        onYesBtnClickHandle={onStartNewGame}
      />
    </ModalContentContainer>
  );
};

export default StartNewGame;
