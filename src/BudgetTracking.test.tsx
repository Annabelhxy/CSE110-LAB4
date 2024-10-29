import { render, fireEvent, screen } from '@testing-library/react';
import { AppProvider } from "./context/AppContext";
import App from './App';

// Test suite for Budget Tracking App
describe("Budget Tracking App", () => {

  // Test Expense Creation
  test("adds a new expense and updates the remaining balance", () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Add a new expense
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "200" } });
    fireEvent.click(saveButton);

    // Check if expense is added
    const remainingText = screen.getByText(/Remaining: \$800/i); // Assuming initial budget is $1000
    expect(remainingText).toBeInTheDocument();
  });

  // Test Expense Deletion
  test("deletes an expense and updates the remaining balance", () => {
    const initialExpenses = [
      { id: "1", name: "Groceries", cost: 100 },
      { id: "2", name: "Transport", cost: 50 },
    ];

    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "200" } });
    fireEvent.click(saveButton);

    // Add second expense
    fireEvent.change(nameInput, { target: { value: "Transport" } });
    fireEvent.change(costInput, { target: { value: "150" } });
    fireEvent.click(saveButton);

    // Check if expense is added
    const remainingText = screen.getByText(/Remaining: \$650/i); // Assuming initial budget is $1000
    expect(remainingText).toBeInTheDocument();

    // Delete an expense
     const deleteButton = screen.getAllByText("x")[0]; // First expense's delete button
     fireEvent.click(deleteButton);

    // Check if the remaining balance is updated correctly
     const updatedRemainingText = screen.getByText(/Remaining: \$850/i);
     expect(updatedRemainingText).toBeInTheDocument();
  });

  // Test Budget Balance Verification
  test("verifies correct remaining balance after multiple expenses", () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Add first expense
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "300" } });
    fireEvent.click(saveButton);

    // Add second expense
    fireEvent.change(nameInput, { target: { value: "Transport" } });
    fireEvent.change(costInput, { target: { value: "150" } });
    fireEvent.click(saveButton);

    // Check if the remaining balance is updated correctly
    const remainingText = screen.getByText(/Remaining: \$500/i); // Initial $1000 - $450
    expect(remainingText).toBeInTheDocument();
  });

  // Edge Case: Exceeding Budget
  test("alerts when the budget is exceeded", () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    global.alert = jest.fn(); 

    // Add an expense that exceeds the budget
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Car repair" } });
    fireEvent.change(costInput, { target: { value: "1200" } });
    fireEvent.click(saveButton);

    // Verify the alert is triggered
    expect(global.alert).toHaveBeenCalledWith("You have exceeded your budget!");
  });

});
