import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import "./NewExpense.css"
const NewExpense = ({ onAddExpenses }) => {

    const [formStatus, setFormStatus] = useState(false)

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        onAddExpenses(expenseData)
    }

    const changeFormStatus = () => setFormStatus((prev => !prev))

    return (
        <div className="new-expense">
            {!formStatus && <button onClick={changeFormStatus}> Add New Expense </button>}
            {formStatus && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} setFormStatus={setFormStatus} />}
        </div>
    )
}

export default NewExpense;

