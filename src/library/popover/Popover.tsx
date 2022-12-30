import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { findFirstFocusableElement } from "../../utilities/findFirstFocusableElement";
import { findLastFocusableElement } from "../../utilities/findLastFocusableElement";
import { isHTMLElement } from "../../utilities/isHTMLElement";
import { isEscapeKeyPressed } from "../../utilities/keyPressedDetection/isEscapeKeyPressed";
import { isTabKeyPressed } from "../../utilities/keyPressedDetection/isTabKeyPressed";
import { FocusTrap } from "../focus-trap/FocusTrap";
import { setFocusTrap } from "../focus-trap/utilities/setFocusTrap";
import Portal from "../portal/Portal";
import styles from "./Popover.module.scss";

declare module "csstype" {
  interface Properties {
    // Add a missing property
    // WebkitRocketLauncher?: string;

    // Add a CSS Custom Property
    "--position-left"?: string;
    // "--position-right"?: string;
    "--position-top"?: string;
    // "--position-bottom"?: string;

    // ...or allow any other property
    // [index: string]: any;
  }
}

interface PopoverProps {
  children: JSX.Element;
  shouldShowPopover: boolean;
  anchorEl: HTMLElement | null;
  positionOffset: {
    left?: number;
    // right?: number;
    top?: number;
    // bottom?: number;
  };
  onClose?: () => void;
  shouldFocusRoot?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnClickOutside?: boolean;
}

const mockFn = () => {};

const Popover = ({
  shouldShowPopover,
  anchorEl,
  positionOffset: {
    left: posLeftOffset = 0,
    // right: posRightOffset = 0,
    top: posTopOffset = 0,
    // bottom: posBottomOffset = 0,
  },
  onClose = mockFn,
  shouldCloseOnEsc = true,
  shouldCloseOnClickOutside = true,
  shouldFocusRoot = true,
  children,
}: PopoverProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementWitchOpenPopoverRef = useRef<Element | null>(null);

  const [position, setPosition] = useState({
    left: posLeftOffset,
    // right: posRightOffset,
    top: posTopOffset,
    // bottom: posBottomOffset,
  });

  const [isPortalAdded, setIsPortalAdded] = useState(false);

  useLayoutEffect(() => {
    if (anchorEl) {
      const {
        left: anchorElLeftPos,
        // right: anchorElRightPos,
        top: anchorElTopPos,
        // bottom: anchorElBottomPos,
      } = anchorEl.getBoundingClientRect();

      setPosition({
        left: posLeftOffset + anchorElLeftPos,
        // right: posRightOffset + anchorElRightPos,
        top: posTopOffset + anchorElTopPos,
        // bottom: posBottomOffset + anchorElBottomPos,
      });
    }
  }, [anchorEl, posLeftOffset, posTopOffset]);

  useEffect(() => {
    if (shouldFocusRoot && isPortalAdded) {
      rootRef.current?.focus();
    }
  }, [isPortalAdded, shouldFocusRoot]);

  useEffect(() => {
    elementWitchOpenPopoverRef.current = document.activeElement;

    return () => {
      if (
        elementWitchOpenPopoverRef.current &&
        isHTMLElement(elementWitchOpenPopoverRef.current)
      ) {
        elementWitchOpenPopoverRef.current.focus();
      }
    };
  }, [shouldShowPopover]);

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

  const onClickOutsideHandle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (shouldCloseOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  return shouldShowPopover && anchorEl ? (
    <Portal setIsPortalAdded={setIsPortalAdded}>
      <div
        className={styles.root}
        tabIndex={-1}
        ref={rootRef}
        onKeyDown={rootOnKeyDownHandle}
        onClick={onClickOutsideHandle}
      >
        <FocusTrap childRef={containerRef}>
          <div
            ref={containerRef}
            className={styles.container}
            style={{
              "--position-left": position.left + "px",
              // "--position-right": position.right + "px",
              "--position-top": position.top + "px",
              // "--position-bottom": position.bottom + "px",
            }}
          >
            {children}
          </div>
        </FocusTrap>
      </div>
    </Portal>
  ) : null;
};

export default Popover;
