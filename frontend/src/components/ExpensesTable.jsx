function ExpensesTable ({ expenses }) {
    return (
        <>
            <h3>Таблица</h3>
            <div className='my_table'>
                <table border="1" cellPadding="6" >
                    <thead>
                        <tr>
                            <th>Категория</th>
                            <th>Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.category}</td>
                                <td>{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ExpensesTable