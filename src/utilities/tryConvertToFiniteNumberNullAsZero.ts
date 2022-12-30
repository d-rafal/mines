/**
 * This function checks whether passed value can be converted to a finite number, if yes, returns converted value, otherwise returns null.
 * Null value is converted to zero
 *
 * @param value - variable to be converted
 * @returns finite converted number or null
 */
const tryConvertToFiniteNumberNullAsZero = (value: any) => {
  const convertedValue = Number(value);
  if (Number.isFinite(convertedValue)) {
    return convertedValue;
  }
  return null;
};
export default tryConvertToFiniteNumberNullAsZero;
