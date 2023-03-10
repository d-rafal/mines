import { nanoid } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { render, screen } from "../../../setupTests";
import Select, { Option } from "../Select";

export type AllowedValues =
  | "Cherry"
  | "Lemon"
  | "Banana"
  | "Strawberry"
  | "Apple";

export const mockOptions: Option<AllowedValues>[] = [
  { value: "Cherry", text: "Cherry" },
  { value: "Lemon", text: "Lemon" },
  { value: "Banana", text: "Banana" },
  { value: "Strawberry", text: "Strawberry" },
  { value: "Apple", text: "Apple" },
];

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

  it("should render initial selected option", async () => {
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
    expect(valueIndicator).toBeInTheDocument();
    expect(valueIndicator.textContent).toBe(
      mockOptions[initialSelectedOptionIndex].text
    );

    expect(valueContainer).toBeInTheDocument();
    expect(valueContainer.value).toBe(
      mockOptions[initialSelectedOptionIndex].value
    );

    await user.pointer({ keys: "[MouseLeft]", target: rootElement });

    const selectedOption = screen.getByRole("option", {
      name: mockOptions[0].text,
    });

    expect(selectedOption).toBeInTheDocument();
    expect(selectedOption.getAttribute("aria-selected")).toBe("true");
  });

  it("should render all options option", async () => {
    // arrange
    const user = userEvent.setup();

    render(<Sut />);

    //act

    // assert
    const rootElement = screen.getByRole("listbox");
    await user.pointer({ keys: "[MouseLeft]", target: rootElement });

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
