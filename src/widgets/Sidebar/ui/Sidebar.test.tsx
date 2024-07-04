import { fireEvent } from '@testing-library/react';
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation/renderWithTranslation";
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('should toggle collapse state on button click', () => {
    const { getByText, container } = renderWithTranslation(<Sidebar />);
    const button = getByText('>');
    const sidebar = container.querySelector('.sidebar');

    expect(sidebar).toHaveClass('collapsed');
    expect(button).toHaveTextContent('>');

    fireEvent.click(button);

    expect(sidebar).not.toHaveClass('collapsed');
    expect(button).toHaveTextContent('<');
  });
});
