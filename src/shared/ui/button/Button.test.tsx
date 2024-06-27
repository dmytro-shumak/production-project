
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from "react";
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

// Add more tests as needed