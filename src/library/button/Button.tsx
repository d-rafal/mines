import cx from "classnames";
import { WithCustomizeClassName } from "../../@types-and-const/@general";
import styles from "./Button.module.scss";

interface ButtonProps
  extends WithCustomizeClassName,
    Omit<JSX.IntrinsicElements["button"], "className"> {}

const Button = ({
  children,
  customizedClassName,
  ...restProps
}: ButtonProps) => {
  return (
    <button className={cx(styles.btnBase, customizedClassName)} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
