import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button component', () => {
  test('renders a button with default theme', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button');
  });

  test('renders a button with primary theme', () => {
    render(<Button theme={ButtonTheme.Primary}>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button', 'primary');
  });

  test('renders a button with clear theme', () => {
    render(<Button theme={ButtonTheme.Clear}>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button', 'clear');
  });

  test('renders a button with custom className', () => {
    render(<Button className="custom-button">Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button', 'custom-button');
  });

  test('renders a disabled button', () => {
    render(<Button disabled>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('disabled');
  });
});
