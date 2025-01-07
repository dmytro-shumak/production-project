import type { StoryFn } from "@storybook/react";
// eslint-disable-next-line production-shumak-plugin/layer-imports
import "@/app/styles/index.css";
import { MemoryRouter, Route, Routes } from "react-router-dom";

interface RouterDecoratorProps {
  initialEntries?: string[];
  path?: string;
}

export const RouterDecorator =
  ({ path, initialEntries = ["/"] }: RouterDecoratorProps) =>
  (StoryComponent: StoryFn) => (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path={path} element={<StoryComponent />} />
      </Routes>
    </MemoryRouter>
  );
