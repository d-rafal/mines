import { useNavigate } from "react-router-dom";
import { switchReadyToStartActionCreator } from "../../app/store/features/game-config/action-creators/switchReadyToStartActionCreator";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import useRedirectLocation from "../../hooks/useRedirectLocation";
import { DEFAULT_LAYOUTS } from "../../models/layoutConfigModel";
import { ROOT_ROUTE } from "../../routes/rootRoute";
import styles from "./LayoutSelection.module.scss";
import Button from "../../library/button/Button";
import { CUSTOM_LAYOUT_SELECTION_ROUTE } from "../../routes/customLayoutSelectionRoute";
import { getAbsoluteRoute } from "../../routes/getAbsoluteRoute";
import ButtonContent from "./components/ButtonContent";
import { getSerializedGameDifficulty } from "../../app/store/features/game-config/utilities/getSerializedGameDifficulty";

const LayoutSelection = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const redirectLocation = useRedirectLocation(ROOT_ROUTE.path);

  const onClickHandle = (config: {
    rowsSize: number;
    colsSize: number;
    minesQn: number;
  }) => {
    dispatch(
      switchReadyToStartActionCreator(
        config.rowsSize,
        config.colsSize,
        config.minesQn
      )
    );

    navigate(redirectLocation, { replace: true });
  };

  return (
    <div className={styles.root}>
      {Object.values(DEFAULT_LAYOUTS).map((value) => (
        <Button
          customizedClassName={styles.selectBtn}
          onClick={() => {
            onClickHandle(value);
          }}
          key={getSerializedGameDifficulty(
            value.rowsSize,
            value.colsSize,
            value.minesQn
          )}
        >
          <ButtonContent
            layoutSize={`${value.rowsSize} x ${value.colsSize}`}
            minesQn={`${value.minesQn} mines`}
          />
        </Button>
      ))}

      <Button
        customizedClassName={styles.selectBtn}
        onClick={() => {
          navigate(getAbsoluteRoute(CUSTOM_LAYOUT_SELECTION_ROUTE.path), {
            replace: true,
          });
        }}
      >
        <ButtonContent layoutSize="?" minesQn="Custom" />
      </Button>
    </div>
  );
};

export default LayoutSelection;
