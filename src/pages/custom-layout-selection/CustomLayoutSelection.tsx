import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useNavigate } from "react-router-dom";
import { switchReadyToStartActionCreator } from "../../app/store/features/game-config/action-creators/switchReadyToStartActionCreator";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import useRedirectLocation from "../../hooks/useRedirectLocation";
import Button from "../../library/button/Button";
import DigitalInput from "../../library/digital-input/DigitalInput";
import { getAbsoluteRoute } from "../../routes/getAbsoluteRoute";
import { LAYOUT_SELECTION_ROUTE } from "../../routes/layoutSelectionRoute";
import { ROOT_ROUTE } from "../../routes/rootRoute";
import styles from "./CustomLayoutSelection.module.scss";
import {
  MAX_COLS_SIZE,
  MAX_MINES_PERCENT,
  MAX_ROWS_SIZE,
  MIN_COLS_SIZE,
  MIN_MINES_PERCENT,
  MIN_ROWS_SIZE,
  validationSchema,
} from "./utilities/validationSchema";

export interface FormDataType {
  colsSize: number;
  rowsSize: number;
  minesPercent: number;
}

const CustomLayoutSelection = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const redirectLocation = useRedirectLocation(ROOT_ROUTE.path);

  const formMethods = useForm<FormDataType>({
    shouldUnregister: true,
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      colsSize: 6,
      rowsSize: 6,
      minesPercent: 1,
    },
  });

  const onSubmit: SubmitHandler<FormDataType> = ({
    rowsSize,
    colsSize,
    minesPercent,
  }) => {
    const minesQn = Math.round((rowsSize * colsSize * minesPercent) / 100) || 1;
    dispatch(switchReadyToStartActionCreator(rowsSize, colsSize, minesQn));

    navigate(redirectLocation, { replace: true });
  };

  return (
    <div className={styles.root}>
      <FormProvider {...formMethods}>
        <form
          className={styles.form}
          onSubmit={formMethods.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className={styles.formElement}>
            <label htmlFor="digital-input-cols-size">Width: </label>
            <DigitalInput<FormDataType>
              label="colsSize"
              min={MIN_COLS_SIZE}
              max={MAX_COLS_SIZE}
              id="digital-input-cols-size"
            />
          </div>

          <div className={styles.formElement}>
            <label htmlFor="digital-input-cols-size">Height: </label>
            <DigitalInput<FormDataType>
              label="rowsSize"
              min={MIN_ROWS_SIZE}
              max={MAX_ROWS_SIZE}
              id="digital-input-cols-size"
            />
          </div>

          <div className={styles.formElement}>
            <label htmlFor="digital-input-cols-size">Percent mines: </label>
            <DigitalInput<FormDataType>
              label="minesPercent"
              min={MIN_MINES_PERCENT}
              max={MAX_MINES_PERCENT}
              id="digital-input-cols-size"
            />
          </div>

          <Button customizedClassName={styles.submitBtn} type="submit">
            Play Game
          </Button>

          <Button
            customizedClassName={styles.cancelBtn}
            type="button"
            onClick={() => {
              navigate(getAbsoluteRoute(LAYOUT_SELECTION_ROUTE.path), {
                replace: true,
              });
            }}
          >
            Cancel
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CustomLayoutSelection;
