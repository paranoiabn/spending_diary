import AddExpense from "./AddExpense"
import ExpensesList from "./ExpensesList"
import ManualSection from './styles/ManualSection.module.scss';

function ManualExpensesSection ({ addManualExpense, deleteManualExpense, manualExpenses, hasExpenses, todayExpenseData, totalManual }) {
    return (
        <>
            <div className={ManualSection.manualContainer}>
                <AddExpense onAdd={addManualExpense} />
            </div >
            <ExpensesList
                csvExpenses={manualExpenses}
                onDelete={deleteManualExpense}
            />
</>

    )
}

export default ManualExpensesSection