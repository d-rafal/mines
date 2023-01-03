import { render, screen } from "../../../setupTests";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";
import { useState } from "react";

describe("Modal tests", () => {
  const setIsModalOpenMock = jest.fn();

  const children = (
    <>
      <button>first button</button>
      <button>last button</button>
    </>
  );

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
    expect(
      screen.getByRole("button", { name: /^first button$/i })
    ).toBeInTheDocument();
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

    const firstButton = screen.getByRole("button", { name: /^first button$/i });

    // act

    // assert
    // eslint-disable-next-line testing-library/no-node-access
    expect(rootElement).toBeInTheDocument();
    expect(firstButton).toBeInTheDocument();

    expect(rootElement).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(firstButton).toHaveFocus();
  });

  it("should focus last focusable element from root", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut />);

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = baseElement.children[1]?.firstChild;

    const lastButton = screen.getByRole("button", { name: /^last button$/i });

    // act

    // assert
    expect(rootElement).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();

    expect(rootElement).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(lastButton).toHaveFocus();
  });

  it("should trap focus", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut />);

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = baseElement.children[1]?.firstChild;

    const firstButton = screen.getByRole("button", { name: /^first button$/i });
    const lastButton = screen.getByRole("button", { name: /^last button$/i });

    // act

    // assert
    expect(rootElement).toBeInTheDocument();
    expect(firstButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();

    expect(rootElement).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(firstButton).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(lastButton).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(firstButton).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(lastButton).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(firstButton).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(lastButton).toHaveFocus();
  });

  it("should focus on last focused element before opening modal", async () => {
    // arrange
    const user = userEvent.setup();
    const { baseElement } = render(<Sut shouldOpenModalOnMount={false} />);

    const btnOpenModal = screen.getByRole("button", { name: /open modal/i });
    // eslint-disable-next-line testing-library/no-node-access
    let modalRootElement = baseElement.children[1]?.firstChild;

    // act

    // assert
    expect(modalRootElement).toBeUndefined();
    expect(btnOpenModal).toBeInTheDocument();
    expect(btnOpenModal).not.toHaveFocus();

    await user.keyboard("{Tab}");
    expect(btnOpenModal).toHaveFocus();

    await user.keyboard("{Enter}");

    // eslint-disable-next-line testing-library/no-node-access
    modalRootElement = baseElement.children[1]?.firstChild;
    expect(modalRootElement).toBeInTheDocument();

    expect(modalRootElement).toHaveFocus();
    expect(btnOpenModal).not.toHaveFocus();

    await user.pointer({
      keys: "[MouseLeft]",
      target: modalRootElement as Element,
    });

    // eslint-disable-next-line testing-library/no-node-access
    modalRootElement = baseElement.children[1]?.firstChild;
    expect(modalRootElement).toBeUndefined();
    expect(btnOpenModal).toHaveFocus();
  });
});
