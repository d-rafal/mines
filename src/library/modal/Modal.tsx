import { useEffect, useRef, useState } from "react";
import { findFirstFocusableElement } from "../../utilities/findFirstFocusableElement";
import { findLastFocusableElement } from "../../utilities/findLastFocusableElement";
import { isHTMLElement } from "../../utilities/isHTMLElement";
import { isEscapeKeyPressed } from "../../utilities/keyPressedDetection/isEscapeKeyPressed";
import { isTabKeyPressed } from "../../utilities/keyPressedDetection/isTabKeyPressed";
import { FocusTrap } from "../focus-trap/FocusTrap";
import { setFocusTrap } from "../focus-trap/utilities/setFocusTrap";
import Portal from "../portal/Portal";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: JSX.Element;
  // children: Exclude<React.ReactNode, undefined | null>;
  onClose?: () => void;
  shouldFocusRoot?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnClickOutside?: boolean;
}

const mockFn = () => {};

const Modal = ({
  onClose = mockFn,
  shouldCloseOnEsc = true,
  shouldCloseOnClickOutside = true,
  shouldFocusRoot = true,
  children,
}: ModalProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementWitchOpenModalRef = useRef<Element | null>(null);

  const [isPortalAdded, setIsPortalAdded] = useState(false);

  useEffect(() => {
    if (shouldFocusRoot && isPortalAdded) {
      rootRef.current?.focus();
    }
  }, [isPortalAdded, shouldFocusRoot]);

  useEffect(() => {
    elementWitchOpenModalRef.current = document.activeElement;

    return () => {
      if (
        elementWitchOpenModalRef.current &&
        isHTMLElement(elementWitchOpenModalRef.current)
      ) {
        elementWitchOpenModalRef.current.focus();
      }
    };
  }, []);

  const rootOnKeyDownHandle = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target === rootRef.current) {
      if (isTabKeyPressed(e)) {
        e.stopPropagation();
        e.preventDefault();

        let findFocusableElement = findFirstFocusableElement;
        if (e.shiftKey) {
          findFocusableElement = findLastFocusableElement;
        }

        setFocusTrap(containerRef, findFocusableElement);
      } else if (shouldCloseOnEsc && isEscapeKeyPressed(e)) {
        onClose();
      }
    }
  };

  const rootOnClickHandle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (shouldCloseOnClickOutside && e.target === rootRef.current) {
      onClose();
    }
  };

  return (
    <Portal setIsPortalAdded={setIsPortalAdded}>
      <div
        className={styles.root}
        tabIndex={-1}
        ref={rootRef}
        onClick={rootOnClickHandle}
        onKeyDown={rootOnKeyDownHandle}
      >
        <FocusTrap childRef={containerRef}>
          <div ref={containerRef}>{children}</div>
        </FocusTrap>
      </div>
    </Portal>
  );
};

export default Modal;
