import { useEffect, useLayoutEffect, useRef, useState } from "react";
import debounce from "../../utilities/debounce";
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
    "--position-top"?: string;

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
    top?: number;
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
  positionOffset: { left: posLeftOffset = 0, top: posTopOffset = 0 },
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
    top: posTopOffset,
  });

  const [isPortalAdded, setIsPortalAdded] = useState(false);

  useLayoutEffect(() => {
    const calcPosition = debounce(() => {
      if (anchorEl) {
        const { left: anchorElLeftPos, top: anchorElTopPos } =
          anchorEl.getBoundingClientRect();

        setPosition({
          left: posLeftOffset + anchorElLeftPos,
          top: posTopOffset + anchorElTopPos,
        });
      }
    }, 100);

    if (isPortalAdded) {
      window.addEventListener("resize", calcPosition);
      calcPosition();
    }

    return () => {
      window.removeEventListener("resize", calcPosition);
    };
  }, [isPortalAdded, anchorEl, posLeftOffset, posTopOffset]);

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
              "--position-top": position.top + "px",
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
