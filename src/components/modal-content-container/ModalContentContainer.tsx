import React from "react";
import { WithCustomizeClassName } from "../../@types-and-const/@general";
import styles from "./ModalContentContainer.module.scss";
import cx from "classnames";

interface ModalContentContainerProps extends WithCustomizeClassName {
  readonly children: Exclude<React.ReactNode, null | undefined>;
}

const ModalContentContainer = ({
  children,
  customizedClassName,
}: ModalContentContainerProps) => {
  return <div className={cx(styles.root, customizedClassName)}>{children}</div>;
};

export default ModalContentContainer;
