import cx from "classnames";
import { showBestResultsActionCreator } from "../../app/store/features/show-elements/action-creators/showBestResultsActionCreator";
import { showWelcomeDialogActionCreator } from "../../app/store/features/show-elements/action-creators/showWelcomeDialogActionCreator";
import {
  showBestResults,
  showWelcomeDialog,
} from "../../app/store/features/show-elements/showElementsSlice";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import styles from "./Menu.module.scss";

declare module "csstype" {
  interface Properties {
    // Add a missing property
    // WebkitRocketLauncher?: string;

    // Add a CSS Custom Property
    "--triangle-left-position"?: string;

    // ...or allow any other property
    // [index: string]: any;
  }
}

interface MenuProps {
  triangleLeftPosition: number;
  onClose?: () => void;
}

const mockFn = () => {};

const Menu = ({ triangleLeftPosition, onClose = mockFn }: MenuProps) => {
  const dispatch = useAppDispatch();

  const onScoresHandled = () => {
    dispatch(showBestResultsActionCreator);
    onClose();
  };
  const onAboutAppHandled = () => {
    dispatch(showWelcomeDialogActionCreator);
    onClose();
  };
  return (
    <div className={cx(styles.root)}>
      <div
        className={styles.triangle}
        style={{
          "--triangle-left-position": triangleLeftPosition + "px",
        }}
      ></div>
      <div className={styles.container}>
        <ul>
          <li className={styles.menuItem} onClick={onScoresHandled}>
            Scores
          </li>
          <li className={styles.menuItem} onClick={onAboutAppHandled}>
            About app
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
