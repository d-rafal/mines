import React from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { BiMinus, BiPlus } from "react-icons/bi";
import tryConvertToFiniteNumberNullAsNull from "../../utilities/tryConvertToFiniteNumberNullAsNull";
import styles from "./DigitalInput.module.scss";

interface DigitalInputProps<T extends FieldValues> extends Pick<Element, "id"> {
  min: number;
  max: number;
  label: Path<T>;
  size?: number;
}

const DigitalInput = <T extends FieldValues>({
  min,
  max,
  id,
  label,
  size = 2,
}: DigitalInputProps<T>) => {
  const { control } = useFormContext<T>();

  const {
    field: { name, value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    control,
    name: label,
  });

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // if (/^(?:\+|-)?(\d*|(\d+(?=\.).\d*))$/.test(value)) {
    if (/^-?\d*$/.test(value)) {
      onChange(value);
    }
  };

  const digitalValue = tryConvertToFiniteNumberNullAsNull(value);

  const shouldDisableIncrease = digitalValue === null || digitalValue >= max;
  const shouldDisableDecrease = digitalValue === null || digitalValue <= min;

  const onIncreaseHandle = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (digitalValue !== null && digitalValue <= max) {
      onChange(String(digitalValue + 1));
    }
  };

  const onDecreaseHandle = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (digitalValue !== null && digitalValue >= min) {
      onChange(String(digitalValue - 1));
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <input
          className={styles.input}
          name={name}
          value={value}
          onChange={onChangeHandle}
          onBlur={onBlur}
          ref={ref}
          id={id}
          size={size}
        />
        <button
          type="button"
          className={styles.btn}
          disabled={shouldDisableDecrease}
          onClick={onDecreaseHandle}
          tabIndex={-1}
        >
          <BiMinus className={styles.icon} />
        </button>
        <button
          type="button"
          className={styles.btn}
          disabled={shouldDisableIncrease}
          onClick={onIncreaseHandle}
          tabIndex={-1}
        >
          <BiPlus className={styles.icon} />
        </button>
      </div>
      <p className={styles.errorMessage}>{error?.message}</p>
    </div>
  );
};

export default DigitalInput;
