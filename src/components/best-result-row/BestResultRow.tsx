import TextInput from "../../library/text-input/TextInput";
import { FormDataType } from "../../modals/best-times-won/BestResultsWon";
import { BestTime } from "../../models/gameConfigModel";
import styles from "./BestResultRow.module.scss";
import { convertMsToTimeString } from "./utilities/convertMsToTimeString";

interface BestResultRowProps {
  bestTime: BestTime;
  index: number;
  isEditAble?: boolean;
}

const BestResultRow = ({
  bestTime,
  index,
  isEditAble = false,
}: BestResultRowProps) => {
  const playerCellContent = isEditAble ? (
    <TextInput<FormDataType> label="playerName" autoFocus />
  ) : bestTime.player ? (
    bestTime.player
  ) : (
    "-"
  );

  return (
    <tr>
      <td className={styles.cell}>{index + 1}</td>
      <td className={styles.cell}>{convertMsToTimeString(bestTime.time)}</td>
      <td className={styles.cell}>{playerCellContent}</td>
    </tr>
  );
};

export default BestResultRow;
