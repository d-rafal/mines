import { render, screen } from "../../../setupTests";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";
import { useState } from "react";

describe("Modal tests", () => {
  const setIsModalOpenMock = jest.fn();

  const children = "rendered children";

  const createModalElement = (
    setIsModalOpen: React.Dispatch<
      React.SetStateAction<boolean>
    > = setIsModalOpenMock
  ) => (
    <Modal onClose={() => setIsModalOpen(false)}>
      <p>{children}</p>
    </Modal>
  );

  const Sut = ({
    shouldOpenModalOnMount = true,
  }: {
    shouldOpenModalOnMount?: boolean;
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(shouldOpenModalOnMount);

    return (
      <>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        {isModalOpen ? createModalElement(setIsModalOpen) : null}
      </>
    );
  };

  it("should render children", () => {
    // arrange
    render(<Sut />);

    // act

    // assert
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it("should focus root element", () => {
    // arrange
    const { baseElement } = render(<Sut />);

    // act

    // assert
    // eslint-disable-next-line testing-library/no-node-access
    expect(baseElement.children[1]?.firstChild).toHaveFocus();
  });

  it("should hide modal when click on background", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut />);

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = baseElement.children[1]?.firstChild;

    // act

    // assert
    // eslint-disable-next-line testing-library/no-node-access
    expect(rootElement).toBeInTheDocument();
    await user.pointer({
      keys: "[MouseLeft]",
      target: rootElement as Element,
    });

    expect(rootElement).not.toBeInTheDocument();
  });

  it("should focus first focusable element from root", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut />);

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = baseElement.children[1]?.firstChild;

    const btnClose = screen.getByRole("button", { name: /^CloseModal$/i });

    // act

    // assert
    // eslint-disable-next-line testing-library/no-node-access
    expect(rootElement).toBeInTheDocument();
    expect(btnClose).toBeInTheDocument();

    expect(rootElement).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(btnClose).toHaveFocus();
  });

  it("should focus last focusable element from root", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut />);

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = baseElement.children[1]?.firstChild;

    const btnCancel = screen.getByRole("button", { name: /^CloseModal2$/i });

    // act

    // assert
    expect(rootElement).toBeInTheDocument();
    expect(btnCancel).toBeInTheDocument();

    expect(rootElement).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(btnCancel).toHaveFocus();
  });

  it("should trap focus", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut />);

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = baseElement.children[1]?.firstChild;

    const btnClose = screen.getByRole("button", { name: /^CloseModal$/i });
    const btnCancel = screen.getByRole("button", { name: /^CloseModal2$/i });

    // act

    // assert
    expect(rootElement).toBeInTheDocument();
    expect(btnClose).toBeInTheDocument();
    expect(btnCancel).toBeInTheDocument();

    expect(rootElement).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(btnClose).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(btnCancel).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(btnClose).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(btnCancel).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(btnClose).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(btnCancel).toHaveFocus();
  });

  it("should close modal when close button pressed", async () => {
    // arrange
    const user = userEvent.setup();
    render(<Sut />);

    const btnClose = screen.getByRole("button", { name: /^CloseModal$/i });

    // act

    // assert
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(btnClose).toBeInTheDocument();

    await user.pointer({
      keys: "[MouseLeft]",
      target: btnClose,
    });

    expect(screen.queryByText(children)).not.toBeInTheDocument();
  });

  it("should close modal when cancel button pressed", async () => {
    // arrange
    const user = userEvent.setup();
    render(<Sut />);

    const btnCancel = screen.getByRole("button", { name: /^CloseModal2$/i });

    // act

    // assert
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(btnCancel).toBeInTheDocument();

    await user.pointer({
      keys: "[MouseLeft]",
      target: btnCancel,
    });

    expect(screen.queryByText(children)).not.toBeInTheDocument();
  });

  it("should focus on last focused element before opening modal", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut shouldOpenModalOnMount={false} />);

    const btnOpenModal = screen.getByRole("button", { name: /open modal/i });

    // act

    // assert
    expect(screen.queryByText(children)).not.toBeInTheDocument();
    expect(btnOpenModal).toBeInTheDocument();
    expect(btnOpenModal).not.toHaveFocus();

    await user.keyboard("{Tab}");
    expect(btnOpenModal).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(screen.getByText(children)).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = baseElement.children[1]?.firstChild;
    expect(rootElement).toBeInTheDocument();

    expect(rootElement).toHaveFocus();
    expect(btnOpenModal).not.toHaveFocus();

    await user.pointer({
      keys: "[MouseLeft]",
      target: screen.getByRole("button", { name: /CloseModal$/i }),
    });

    expect(screen.queryByText(children)).not.toBeInTheDocument();
    expect(btnOpenModal).toHaveFocus();
  });
});
