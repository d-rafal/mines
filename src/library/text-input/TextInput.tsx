import React from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { WithCustomizeClassName } from "../../@types-and-const/@general";
import styles from "./TextInput.module.scss";
import cx from "classnames";

interface TextInputProps<T extends FieldValues>
  extends WithCustomizeClassName,
    Omit<
      JSX.IntrinsicElements["input"],
      "className" | "name" | "onChange" | "value" | "onBlur" | "ref"
    > {
  label: Path<T>;
  singsFilter?: RegExp;
}

const TextInput = <T extends FieldValues>({
  label,
  singsFilter,
  customizedClassName,
  ...restProps
}: TextInputProps<T>) => {
  const { control } = useFormContext<T>();

  const {
    field: {
      name: hookFormName,
      value: hookFormValue,
      onChange: hookFormOnChange,
      onBlur: hookFormOnBlur,
      ref,
    },
    fieldState: { error },
  } = useController({
    control,
    name: label,
  });

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!singsFilter || singsFilter.test(value)) {
      hookFormOnChange(value);
    }
  };

  return (
    <div className={cx(styles.root, customizedClassName)}>
      <input
        className={styles.input}
        name={hookFormName}
        value={hookFormValue}
        onChange={onChangeHandle}
        onBlur={hookFormOnBlur}
        ref={ref}
        {...restProps}
      />
      <p className={styles.errorMessage}>{error?.message}</p>
    </div>
  );
};

export default TextInput;
