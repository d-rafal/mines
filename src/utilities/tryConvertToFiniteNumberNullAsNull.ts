/**
 * This function checks whether passed value can be converted to a finite number, if yes, returns converted value, otherwise returns null.
 * null value is converted to null.
 *
 * @param value - value to be converted
 * @returns finite converted number or null
 */
const tryConvertToFiniteNumberNullAsNull = (value: any) => {
  if (value !== null) {
    const convertedValue = Number(value);
    if (Number.isFinite(convertedValue)) {
      return convertedValue;
    }
  }
  return null;
};
export default tryConvertToFiniteNumberNullAsNull;
