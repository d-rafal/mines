import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import {
  newBestResultAdded,
  useSelectBestResults,
  useSelectGameDuration,
  useSelectSerializedGameDifficulty,
} from "../../app/store/features/game-config/gameConfigSlice";
import { useAppDispatch } from "../../app/store/hooks/hooks";
import { BestResultsTable } from "../../components/best-results-table/BestResultsTable";
import ModalContentContainer from "../../components/modal-content-container/ModalContentContainer";
import Button from "../../library/button/Button";
import styles from "./BestResultsWon.module.scss";
import useCalcNewResultIndex from "./hooks/useCalcNewResultIndex";
import useGetRows from "./hooks/useGetRows";
import { validationSchema } from "./utilities/validationSchema";

export interface FormDataType {
  playerName: string;
}

interface BestResultsWonProps {
  onClose: () => void;
}

const BestResultsWon = ({ onClose }: BestResultsWonProps) => {
  const dispatch = useAppDispatch();

  const serializedGameDifficulty = useSelectSerializedGameDifficulty();
  const gameDuration = useSelectGameDuration();
  const bestResults = useSelectBestResults(serializedGameDifficulty);

  const formMethods = useForm<FormDataType>({
    shouldUnregister: true,
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      playerName: "",
    },
  });

  const newResultIndex = useCalcNewResultIndex(gameDuration, bestResults);

  const rows: JSX.Element[] = useGetRows(
    gameDuration,
    bestResults,
    newResultIndex
  );

  const onSubmit: SubmitHandler<FormDataType> = ({ playerName }) => {
    onClose();
    dispatch(newBestResultAdded({ index: newResultIndex, playerName }));
  };

  return (
    <ModalContentContainer>
      <FormProvider {...formMethods}>
        <form
          className={styles.form}
          onSubmit={formMethods.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className={styles.header}>
            <p>Congratulation!</p>
            <p>Your score has made top ten.</p>
            <Button type="submit" customizedClassName={styles.doneBtn}>
              Done
            </Button>
          </div>

          <div className={styles.content}>
            <div className={styles.selectSections}>
              Minefield: {serializedGameDifficulty}
            </div>

            <BestResultsTable>{rows}</BestResultsTable>
          </div>
        </form>
      </FormProvider>
    </ModalContentContainer>
  );
};

export default BestResultsWon;
