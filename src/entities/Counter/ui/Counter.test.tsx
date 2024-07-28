import { fireEvent, screen } from "@testing-library/react";
import { Counter } from "entities/Counter/ui/Counter";
import { componentRender } from "shared/lib/tests/componentRender/componentRender";

describe("Counter component", () => {
  test("test render", () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    expect(screen.getByTestId("value-title")).toHaveTextContent("10");
  });
  test("increment", () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    fireEvent.click(screen.getByTestId("increment-button"));
    expect(screen.getByTestId("value-title")).toHaveTextContent("11");
  });
  test("decrement", () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    fireEvent.click(screen.getByTestId("decrement-button"));
    expect(screen.getByTestId("value-title")).toHaveTextContent("9");
  });
});
