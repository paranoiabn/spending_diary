function DeleteButton({ onDelete, expenseIndex }) {
    return (
        <button style={{ marginLeft:'12px', padding:'7px 10px',
            backgroundColor:'#d9534f', borderRadius:'12px',
            cursor:'pointer', fontSize: '14px', fontFamily:'"Changa One", sans-serif'
         }} onClick={() => onDelete(expenseIndex)}>Удалить</button>
    )
}

export default DeleteButton