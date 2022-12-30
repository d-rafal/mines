import React from "react";
import Button from "../../library/button/Button";
import styles from "./ModalOptionsButtons.module.scss";

interface ModalOptionButtonsProps {
  readonly cancelBtnContent: Exclude<React.ReactNode, undefined | null>;
  readonly yesBtnContent: Exclude<React.ReactNode, undefined | null>;
  onYesBtnClickHandle(): void;
  onCancelBtnClickHandle(): void;
}

const ModalOptionsButtons = ({
  cancelBtnContent,
  yesBtnContent,
  onCancelBtnClickHandle,
  onYesBtnClickHandle,
}: ModalOptionButtonsProps) => {
  return (
    <div className={styles.root}>
      <Button
        customizedClassName={styles.optionBtn}
        onClick={onCancelBtnClickHandle}
      >
        {cancelBtnContent}
      </Button>
      <Button
        customizedClassName={styles.optionBtn}
        onClick={onYesBtnClickHandle}
      >
        {yesBtnContent}
      </Button>
    </div>
  );
};

export default ModalOptionsButtons;
