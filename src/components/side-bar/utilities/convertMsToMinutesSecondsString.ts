import { calcIntegerAndReminderPart } from "../../../utilities/calcIntegerAndReminderPart";

export const convertMsToMinutesSecondsString = (timeInMs: number) => {
  const { integerPart: minutes, reminderPart: seconds } =
    calcIntegerAndReminderPart(Math.floor(timeInMs / 1000), 60);

  const minutesString: string =
    minutes === 0
      ? "00"
      : minutes < 10
      ? "0" + minutes
      : minutes > 99
      ? "99"
      : String(minutes);

  const secondsString: string =
    seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : String(seconds);

  return minutesString + ":" + secondsString;
};
