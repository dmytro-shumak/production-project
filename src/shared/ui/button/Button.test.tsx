
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';

test('renders a button with default theme', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByText('Click me');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('button');
});

test('renders a button with primary theme', () => {
  render(<Button theme={ThemeButton.Primary}>Click me</Button>);
  const buttonElement = screen.getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('button', 'primary');
});

test('renders a button with clear theme', () => {
  render(<Button theme={ThemeButton.Clear}>Click me</Button>);
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