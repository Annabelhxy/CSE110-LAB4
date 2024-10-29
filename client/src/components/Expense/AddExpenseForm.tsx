import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Import the AppContext
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm: React.FC = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number | string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add new expense to expenses context array
    const newExpense: Expense = {
      id: Date.now().toString(), 
      description: name, 
      cost: typeof cost === "string" ? parseFloat(cost) : cost,
    }; 

    createExpense(newExpense);

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    setName("");
    setCost("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)} 
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)} 
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};


export default AddExpenseForm;
