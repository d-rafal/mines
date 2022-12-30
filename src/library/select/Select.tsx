import { useCallback, useLayoutEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import cx from "classnames";
import { isEnterKeyPressed } from "../../utilities/keyPressedDetection/isEnterKeyPressed";
import { disableScrolling as disableScrollingUtility } from "../../utilities/disableScrolling";
import { nanoid } from "@reduxjs/toolkit";
import { WithTestId } from "../../@types-and-const/@general";
import { isEscapeKeyPressed } from "../../utilities/keyPressedDetection/isEscapeKeyPressed";

export interface Option<T extends string> {
  readonly value: T;
  readonly text: string;
}

interface SelectProps<T extends string> extends WithTestId {
  readonly options: Option<T>[];
  readonly selectedOption: T | null;
  onChange: React.Dispatch<React.SetStateAction<T | null>>;
  readonly className?: string;
  id?: string;
}

const Select = <T extends string>({
  options,
  selectedOption,
  onChange,
  testId = nanoid(),
  className = "",
  id,
}: SelectProps<T>) => {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [highlightedOption, setHighlightedOption] = useState<T | null>(null);

  const refSelectedOptionIndicator = useRef<HTMLSpanElement>(null);
  const refInternalInputField = useRef<HTMLInputElement>(null);

  const disableScrolling = useCallback((e: KeyboardEvent) => {
    disableScrollingUtility(e);
  }, []);

  useLayoutEffect(() => {
    if (isActive) {
      window.addEventListener("keydown", disableScrolling);
    }

    return () => {
      window.removeEventListener("keydown", disableScrolling);
    };
  }, [isActive, disableScrolling]);

  const handleHighlightOption = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target;

    // zamiast data-opotion można użyć skorzyścać z closue w funkcji definiowanej
    // zaraz w onMouseOver
    if (target instanceof HTMLLIElement) {
      const option = target.dataset.option as T | undefined;
      setHighlightedOption(option ?? null);
    }
  };

  const handleSelectOption = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target;

    // zamiast data-opotion można użyć skorzyścać z closue w funkcji definiowanej
    // zaraz w onClick
    if (target instanceof HTMLLIElement) {
      const option = target.dataset.option as T | undefined;
      onChange(option ?? null);
    }
  };

  const selectedOptionIndex = options.findIndex(
    (element) => element.value === selectedOption
  );

  const highlightedOptionIndex = options.findIndex(
    (element) => element.value === highlightedOption
  );

  const onRootKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isEscapeKeyPressed(e)) {
      setIsOpen(false);
      return;
    }

    if (isEnterKeyPressed(e)) {
      if (isOpen) {
        onChange(highlightedOption);
        setIsOpen(false);
      } else {
        setHighlightedOption(selectedOption);
        setIsOpen(true);
      }

      return;
    }

    if (e.key === "ArrowUp") {
      if (isOpen) {
        if (highlightedOptionIndex === -1 || highlightedOptionIndex === 0) {
          setHighlightedOption(options[options.length - 1].value);
        } else {
          setHighlightedOption(options[highlightedOptionIndex - 1].value);
        }
      } else {
        if (selectedOptionIndex === -1 || selectedOptionIndex === 0) {
          onChange(options[options.length - 1].value);
        } else {
          onChange(options[selectedOptionIndex - 1].value);
        }
      }

      return;
    }

    if (e.key === "ArrowDown") {
      if (isOpen) {
        if (
          highlightedOptionIndex === -1 ||
          highlightedOptionIndex === options.length - 1
        ) {
          setHighlightedOption(options[0].value);
        } else {
          setHighlightedOption(options[highlightedOptionIndex + 1].value);
        }
      } else {
        if (
          selectedOptionIndex === -1 ||
          selectedOptionIndex === options.length - 1
        ) {
          onChange(options[0].value);
        } else {
          onChange(options[selectedOptionIndex + 1].value);
        }
      }

      return;
    }
  };

  return (
    <div
      className={cx({ [styles.active]: isActive }, styles.select, className)}
      tabIndex={0}
      onClick={() => {
        setHighlightedOption(selectedOption);
        setIsOpen((prev) => !prev);
      }}
      onFocus={() => setIsActive(true)}
      onBlur={() => {
        setIsActive(false);
        setIsOpen(false);
      }}
      onKeyUp={onRootKeyUp}
      role="listbox"
    >
      <input
        aria-hidden="true"
        tabIndex={-1}
        className={styles.hiddenInput}
        ref={refInternalInputField}
        value={selectedOption ?? ""}
        readOnly
        id={id}
      />
      <span
        className={styles.value}
        ref={refSelectedOptionIndicator}
        data-testid={testId + "_valueIndicator"}
      >
        {options[selectedOptionIndex]?.text}
      </span>
      <ul
        className={cx({ [styles.hidden]: !isOpen }, styles.optList)}
        role="presentation"
      >
        {options.map((element) => (
          <li
            className={cx(
              {
                [styles.highlight]: highlightedOption === element.value,
                [styles.selected]: selectedOption === element.value,
              },
              styles.option
            )}
            key={element.value}
            onMouseOver={handleHighlightOption}
            data-option={element.value}
            onClick={handleSelectOption}
            role="option"
            aria-selected={element.value === selectedOption}
            // tabIndex={-1}
            aria-hidden="true"
          >
            {element.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
