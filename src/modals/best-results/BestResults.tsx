import { useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import {
  useSelectBestResults,
  useSelectBestResultsRoster,
  useSelectSerializedGameDifficulty,
} from "../../app/store/features/game-config/gameConfigSlice";
import { isGameDifficultyInBestResults } from "../../app/store/features/game-config/utilities/isGameDifficultyInBestResults";
import BestResultRow from "../../components/best-result-row/BestResultRow";
import { BestResultsTable } from "../../components/best-results-table/BestResultsTable";
import Button from "../../library/button/Button";
import Select, { Option } from "../../library/select/Select";
import ModalContentContainer from "../../components/modal-content-container/ModalContentContainer";
import styles from "./BestResults.module.scss";

interface BestResultsProps {
  onClose: () => void;
}

const BestResults = ({ onClose }: BestResultsProps) => {
  const bestResultsRoster = useSelectBestResultsRoster();
  const serializedGameDifficulty = useSelectSerializedGameDifficulty();

  const selectOptions: Option<string>[] = useMemo(
    () =>
      Object.keys(bestResultsRoster).map((key) => ({
        value: key,
        text: key,
      })),
    [bestResultsRoster]
  );

  const [selectedGameDifficulty, setSelectedGameDifficulty] = useState<
    string | null
  >(() => {
    if (
      isGameDifficultyInBestResults(serializedGameDifficulty, bestResultsRoster)
    ) {
      return serializedGameDifficulty;
    }

    return selectOptions[0]?.value ?? null;
  });

  const bestResults = useSelectBestResults(selectedGameDifficulty ?? "");

  return (
    <ModalContentContainer>
      <div className={styles.header}>
        Best Times
        <Button onClick={onClose} customizedClassName={styles.closeBtn}>
          <MdClose className={styles.icon} />
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.selectSections}>
          Minefield:
          <Select
            className={styles.select}
            options={selectOptions}
            selectedOption={selectedGameDifficulty}
            onChange={setSelectedGameDifficulty}
            id="select-difficulty"
          />
        </div>

        <BestResultsTable>
          {bestResults?.map((bestTime, index) => (
            <BestResultRow bestTime={bestTime} key={index} index={index} />
          ))}
        </BestResultsTable>
      </div>
    </ModalContentContainer>
  );
};

export default BestResults;
