import AddExpense from "./AddExpense"
import ExpensesList from "./ExpensesList"

function ManualExpensesSection ({ addManualExpense, deleteManualExpense, manualExpenses, hasExpenses, todayExpenseData, totalManual }) {
    return (
        <>
            <div>
                <AddExpense onAdd={addManualExpense} />
            </div>
            <ExpensesList 
                csvExpenses={manualExpenses}
                onDelete={deleteManualExpense}
            />
            {/* <div style={{ marginTop: 20 }}>
                {!hasExpenses && (
                    <p>Расходов пока нет</p>
                )}

                {todayExpenseData && (
                    <p>
                        Сегодня: {todayExpenseData.category} — {todayExpenseData.amount}
                    </p>
                )}
            <div><strong>Итого:</strong> {totalManual}</div>
        </div > */}
</>

    )
}

export default ManualExpensesSection