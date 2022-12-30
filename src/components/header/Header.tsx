import cx from "classnames";
import { FLEX_CENTER_CLASS_NAME } from "../../style/consts";
import styles from "./Header.module.scss";

import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Button from "../../library/button/Button";
import Popover from "../../library/popover/Popover";
import Menu from "../menu/Menu";

// import { ReactComponent as DeleteSvg } from "../../assets/img/menu.svg";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const shouldShowPopover = Boolean(anchorEl);

  const onCloseMenu = () => {
    console.log("header onCloseMenu 1");
    setAnchorEl(null);
    console.log("header onCloseMenu 2");
  };

  console.log("Header rendering");

  return (
    <div className={cx(FLEX_CENTER_CLASS_NAME, styles.root)}>
      Mines
      <Button
        customizedClassName={styles.menuBtn}
        onClick={(e) => {
          // e.stopPropagation();

          console.log("header onClick 1");
          setAnchorEl(e.currentTarget);
          console.log("header onClick 2");
        }}
      >
        <MdMenu aria-hidden="true" role="img" />
      </Button>
      <Popover
        anchorEl={anchorEl}
        shouldShowPopover={shouldShowPopover}
        positionOffset={{ left: -200, top: 40 }}
        onClose={onCloseMenu}
      >
        <Menu />
      </Popover>
    </div>
  );
};

export default Header;
