import { fireEvent } from "@testing-library/react";

import { Sidebar } from "./Sidebar";

import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

describe("Sidebar", () => {
  test("should toggle collapse state on button click", () => {
    const { container, getByTestId } = componentRender(<Sidebar />);
    const button = getByTestId("Sidebar.CollapsedButton");
    const sidebar = container.querySelector(".sidebar");

    expect(sidebar).not.toHaveClass("collapsed");

    fireEvent.click(button);

    expect(sidebar).toHaveClass("collapsed");
  });
});
