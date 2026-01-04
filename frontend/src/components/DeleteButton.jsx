function DeleteButton({ onDelete, expenseIndex }) {
    return (
        <button onClick={() => onDelete(expenseIndex)}>Удалить</button>
    )
}

export default DeleteButton