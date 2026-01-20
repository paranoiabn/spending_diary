import styles from './styles/ExpensesTable.module.scss';

function ExpensesTable ({ expenses }) {
    return (
        <>
            <div className={styles.csv_table}>
                {expenses.length === 0 ? (
                    <div style={{ color:'red', }}>Нет данных для отображения</div>
                ) : (
                    <table border="1" cellPadding="6" >
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Категория</th>
                            <th>Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.date ? new Date(row.date).toLocaleDateString('ru-RU') : 'Нет даты'}</td>
                                <td>{row.category}</td>
                                <td>{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        </>
    )
}

export default ExpensesTable