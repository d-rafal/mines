import styles from "./Menu.module.scss";
import cx from "classnames";

const Menu = () => {
  return (
    <div className={cx(styles.root)}>
      <div className={styles.triangle}></div>
      <div className={styles.container}>
        <ul>
          <li className={styles.menuItem}>Best times</li>
          <li className={styles.menuItem}>About app</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
