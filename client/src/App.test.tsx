import { render, screen } from '@testing-library/react';
import App from './App';
import { AppProvider } from "./context/AppContext";

test('renders Remaining and AddExpenseForm components', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  // Check if the Remaining component is rendered
  const remainingText = screen.getByText(/Remaining/i);
  expect(remainingText).toBeInTheDocument();

  // Check if the AddExpenseForm component is rendered
  const nameInputLabel = screen.getByLabelText(/Name/i);
  expect(nameInputLabel).toBeInTheDocument();

  const costInputLabel = screen.getByLabelText(/Cost/i);
  expect(costInputLabel).toBeInTheDocument();
});
