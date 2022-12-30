import { calcIntegerAndReminderPart } from "../../../utilities/calcIntegerAndReminderPart";

export const convertMsToTimeString = (timeInMs: number) => {
  const { integerPart: minutes, reminderPart: seconds } =
    calcIntegerAndReminderPart(Math.floor(timeInMs / 1000), 60);

  return (
    (minutes ? `${minutes} minutes, ` : "") +
    `${seconds !== 0 ? seconds : 1} seconds`
  );
};
