import React from "react";
import { findFirstFocusableElement } from "../../utilities/findFirstFocusableElement";
import { findLastFocusableElement } from "../../utilities/findLastFocusableElement";
import FocusTrapBoundary from "./focus-trap-boundary/FocusTrapBoundary";

export interface FocusTrapProps {
  children: React.ReactElement;
  childRef: React.RefObject<HTMLElement>;
}

export const FocusTrap = ({ children, childRef }: FocusTrapProps) => {
  return (
    <>
      <FocusTrapBoundary
        childRef={childRef}
        findFocusableElement={findLastFocusableElement}
      />
      {children}
      <FocusTrapBoundary
        childRef={childRef}
        findFocusableElement={findFirstFocusableElement}
      />
    </>
  );
};
