import { useState } from "react";
import Modal from "../../library/modal/Modal";
import styles from "./WelcomeDialog.module.scss";
import ModalContentContainer from "../../components/modal-content-container/ModalContentContainer";
import Button from "../../library/button/Button";
import { MdClose } from "react-icons/md";

const WelcomeDialog = () => {
  const [shouldDhowWelcomeDialog, setShouldShowWelcomeDialog] = useState(true);

  const onCloseWelcomeDialogHandle = () => {
    setShouldShowWelcomeDialog(false);
  };
  return shouldDhowWelcomeDialog ? (
    <Modal onClose={onCloseWelcomeDialogHandle}>
      <ModalContentContainer>
        <div className={styles.header}>
          <h1>Welcome to my App</h1>
          <Button
            onClick={onCloseWelcomeDialogHandle}
            customizedClassName={styles.closeBtn}
          >
            <MdClose className={styles.icon} />
          </Button>
        </div>
        <div className={styles.content}>
          <p>
            This <strong>SPA</strong> is a web clone of linux ubuntu mines app.
          </p>

          <p>
            It's based on Create React App environment configuration, written in
            Typescript and uses following libraries:
          </p>
          <ul className={styles.usedLibraries}>
            <li>react</li>
            <li>redux (Redux Toolkit)</li>
            <li>react-hook-form</li>
            <li>react-router</li>
          </ul>

          <p>
            <strong>Enjoy!</strong>
          </p>

          <Button
            customizedClassName={styles.submitBtn}
            onClick={onCloseWelcomeDialogHandle}
          >
            Start
          </Button>
        </div>
      </ModalContentContainer>
    </Modal>
  ) : null;
};

export default WelcomeDialog;
