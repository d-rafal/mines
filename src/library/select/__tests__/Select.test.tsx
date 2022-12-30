import { render, screen } from "../../../setupTests";
import userEvent from "@testing-library/user-event";
import Select from "../Select";
import { AllowedValues, mockOptions } from "./mockOptions";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

describe("Select tests", () => {
  const testId = nanoid();

  const initialSelectedOptionIndex = 0;

  const Sut = ({
    isWithInitialSelectedOption = true,
  }: {
    isWithInitialSelectedOption?: boolean;
  }) => {
    const [selectedOption, setSelectedOption] = useState<AllowedValues | null>(
      isWithInitialSelectedOption
        ? mockOptions[initialSelectedOptionIndex].value
        : null
    );

    return (
      <Select<AllowedValues>
        options={mockOptions}
        selectedOption={selectedOption}
        onChange={setSelectedOption}
        testId={testId}
      />
    );
  };

  it("should render initial selected option", () => {
    // arrange
    render(<Sut />);

    const valueIndicator = screen.getByTestId(testId + "_valueIndicator", {
      suggest: false,
    });

    const selectedOption = screen.getByRole("option", {
      name: mockOptions[0].text,
    });

    const valueContainer = screen.getByRole("textbox", {
      hidden: true,
    }) as HTMLInputElement;

    //act

    // assert
    expect(valueIndicator).toBeInTheDocument();
    expect(valueIndicator.textContent).toBe(
      mockOptions[initialSelectedOptionIndex].text
    );

    expect(valueContainer).toBeInTheDocument();
    expect(valueContainer.value).toBe(
      mockOptions[initialSelectedOptionIndex].value
    );

    expect(selectedOption).toBeInTheDocument();
    expect(selectedOption.getAttribute("aria-selected")).toBe("true");
  });

  it("should render all options option", () => {
    // arrange
    render(<Sut />);

    //act

    // assert
    mockOptions.forEach((option) => {
      const optionElement = screen.getByRole("option", { name: option.text });

      expect(optionElement).toBeInTheDocument();
      expect(optionElement.getAttribute("data-option")).toBe(option.value);
    });
  });

  it("should handle option change", async () => {
    // arrange
    const user = userEvent.setup();

    render(<Sut />);

    const rootElement = screen.getByRole("listbox");
    const valueIndicator = screen.getByTestId(testId + "_valueIndicator", {
      suggest: false,
    });
    const valueContainer = screen.getByRole("textbox", {
      hidden: true,
    }) as HTMLInputElement;

    //act

    // assert
    for (const option of mockOptions) {
      await user.pointer({ keys: "[MouseLeft]", target: rootElement });

      const optionElement = screen.getByRole("option", { name: option.text });

      expect(optionElement).toBeInTheDocument();

      await user.pointer({ keys: "[MouseLeft]", target: optionElement });

      expect(valueIndicator.textContent).toBe(option.text);
      expect(valueContainer.value).toBe(option.value);
    }
  });

  it("should allow select element using only keyboard", async () => {
    // arrange
    const user = userEvent.setup();

    render(<Sut />);

    const rootElement = screen.getByRole("listbox");
    const valueIndicator = screen.getByTestId(testId + "_valueIndicator", {
      suggest: false,
    });
    const valueContainer = screen.getByRole("textbox", {
      hidden: true,
    }) as HTMLInputElement;

    let newSelectionIndex = initialSelectedOptionIndex + 2;
    if (newSelectionIndex >= mockOptions.length) {
      newSelectionIndex -= mockOptions.length;
    }

    //act

    // assert
    await user.keyboard("{Tab}");
    expect(rootElement).toHaveFocus();
    await user.keyboard("{Enter}{ArrowDown}{ArrowDown}{Enter}");
    expect(valueIndicator.textContent).toBe(
      mockOptions[newSelectionIndex].text
    );
    expect(valueContainer.value).toBe(mockOptions[newSelectionIndex].value);
  });
});
