import { render, screen } from "../../../setupTests";
import Portal from "../Portal";

describe("Portal tests", () => {
  const setIsPortalAdded = jest.fn();

  const children = "rendered children";

  it("should render children", () => {
    // arrange
    render(<Portal setIsPortalAdded={setIsPortalAdded}>{children}</Portal>);

    // act

    // assert
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it("should render portal outside main container at body end", () => {
    // arrange
    const { container, baseElement } = render(
      <Portal setIsPortalAdded={setIsPortalAdded}>{children}</Portal>
    );

    const portal = screen.getByText(children);

    // act

    // assert

    expect(portal).toBeInTheDocument();

    expect(container.contains(portal)).toBeFalsy(); // eslint-disable-line
    expect(baseElement.contains(portal)).toBeTruthy();
    expect(baseElement.children[1] === portal).toBeTruthy();
  });

  it("should call setIsPortalAdded", () => {
    // arrange
    render(<Portal setIsPortalAdded={setIsPortalAdded}>{children}</Portal>);

    // act

    // assert
    expect(setIsPortalAdded.mock.calls.length).toBe(1);
    expect(setIsPortalAdded.mock.calls[0][0]).toBe(true);
  });
});
