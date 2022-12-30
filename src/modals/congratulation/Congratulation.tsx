import { BsAward } from "react-icons/bs";
import ModalContentContainer from "../../components/modal-content-container/ModalContentContainer";
import ModalOptionsButtons from "../../components/modal-options-buttons/ModalOptionsButtons";
import styles from "./Congratulation.module.scss";

interface CongratulationProps {
  onClose: () => void;
  onStartNewGame: () => void;
}

const Congratulation = ({ onClose, onStartNewGame }: CongratulationProps) => {
  return (
    <ModalContentContainer customizedClassName={styles.root}>
      <div className={styles.information}>
        <BsAward className={styles.icon} />
        <div className={styles.text}>
          <p>Congratulation, you won the game!!!</p>
        </div>
      </div>

      <ModalOptionsButtons
        cancelBtnContent="Close"
        onCancelBtnClickHandle={onClose}
        yesBtnContent="Start New Game"
        onYesBtnClickHandle={onStartNewGame}
      />
    </ModalContentContainer>
  );
};

export default Congratulation;
