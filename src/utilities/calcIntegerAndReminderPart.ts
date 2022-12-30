/**
 * @remarks
 * both dividend and divisor must be greater than zero, otherwise exception is thrown
 */
export const calcIntegerAndReminderPart = (
  dividend: number,
  divisor: number
): { integerPart: number; reminderPart: number } | never => {
  if (divisor === 0) {
    throw new Error("Don't divide by zero");
  }

  if (dividend < 0 || divisor < 0) {
    throw new Error("Both dividend and divisor must be greater than zero");
  }

  return {
    integerPart: Math.floor(dividend / divisor),
    reminderPart: dividend % divisor,
  };
};
