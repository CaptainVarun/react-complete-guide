import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {

  const [selectedYear, setSelectedYear] = useState("2021");

  const handleYearSelection = (year) => setSelectedYear(year)

  const filteredExpenses = props.items.filter(expense => expense.date.getFullYear().toString() === selectedYear)

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selectedYear={selectedYear} onYearSelect={handleYearSelection} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
