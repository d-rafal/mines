import cx from "classnames";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { hideBestResultsActionCreator } from "../../app/store/features/show-elements/action-creators/hideBestResultsActionCreator";
import { useSelectShouldShowBestResults } from "../../app/store/features/show-elements/showElementsSlice";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import Button from "../../library/button/Button";
import Modal from "../../library/modal/Modal";
import Popover from "../../library/popover/Popover";
import BestResults from "../../modals/best-results/BestResults";
import { FLEX_CENTER_CLASS_NAME } from "../../style/consts";
import Menu from "../menu/Menu";
import styles from "./Header.module.scss";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  const shouldShowBestResults = useSelectShouldShowBestResults();

  const shouldShowPopover = Boolean(anchorEl);

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onBestTimeModalClose = () => {
    dispatch(hideBestResultsActionCreator);
  };

  return (
    <div className={cx(FLEX_CENTER_CLASS_NAME, styles.root)}>
      Mines
      <Button
        customizedClassName={styles.menuBtn}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <MdMenu aria-hidden="true" role="img" />
      </Button>
      <Popover
        anchorEl={anchorEl}
        shouldShowPopover={shouldShowPopover}
        positionOffset={{ left: -116, top: 48 }}
        onClose={onCloseMenu}
      >
        <Menu triangleLeftPosition={6} onClose={onCloseMenu} />
      </Popover>
      {shouldShowBestResults && (
        <Modal onClose={onBestTimeModalClose}>
          <BestResults onClose={onBestTimeModalClose} />
        </Modal>
      )}
    </div>
  );
};

export default Header;
