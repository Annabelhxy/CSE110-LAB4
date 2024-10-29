import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: "Missing id" });
    }

    const index = expenses.findIndex(e => e.id === id);

    // Check if the expense exists
    if (index === -1) {
        return res.status(404).send({ error: "Expense not found" });
    }

    // Remove the expense from the array
    expenses.splice(index, 1);
    res.status(200).send();
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}