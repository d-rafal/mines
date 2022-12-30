import { blockTabEvent } from "../../../utilities/blockTabEvent";
import { findFirstFocusableElement } from "../../../utilities/findFirstFocusableElement";
import { FocusTrapProps } from "../FocusTrap";
import { setFocusTrap } from "../utilities/setFocusTrap";
import styles from "./FocusTrapBoundary.module.scss";

interface FocusTrapBoundaryProps extends Pick<FocusTrapProps, "childRef"> {
  findFocusableElement: typeof findFirstFocusableElement;
}

const FocusTrapBoundary = ({
  childRef,
  findFocusableElement,
}: FocusTrapBoundaryProps) => {
  return (
    <div
      className={styles.focusTrapBoundary}
      tabIndex={0}
      onFocus={() => {
        setFocusTrap(childRef, findFocusableElement);
      }}
      onKeyDown={blockTabEvent}
    />
  );
};

export default FocusTrapBoundary;
