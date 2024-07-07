import { fireEvent } from "@testing-library/react";
import { componentRender } from "shared/lib/tests/componentRender/componentRender";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  test("should toggle collapse state on button click", () => {
    const { getByText, container } = componentRender(<Sidebar />);
    const button = getByText(">");
    const sidebar = container.querySelector(".sidebar");

    expect(sidebar).toHaveClass("collapsed");
    expect(button).toHaveTextContent(">");

    fireEvent.click(button);

    expect(sidebar).not.toHaveClass("collapsed");
    expect(button).toHaveTextContent("<");
  });
});
