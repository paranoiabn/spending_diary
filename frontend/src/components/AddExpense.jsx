import { useState } from "react";

function AddExpense({ onAdd }) {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};

      if (!date) newErrors.date = "Дата обязательна";
      
      if (!category) {
        newErrors.category = "Категория обязательна";
      } else if (category.length < 5) {
        newErrors.category = "Категория должна содержать минимум 5 символов"
      }
      if (isNaN(Number(amount))) {
        newErrors.amount = "Сумма должна быть числом";
      } else if (!amount || amount < 0) {
        newErrors.amount = "Сумма должна быть больше 0";
      } else if (Number(amount) <= 0) {
        newErrors.amount = "Сумма должна быть положительная";
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault()
      if (!validate()) return;

      onAdd({
        date,
        category,
        amount: Number(amount)
      });

      setDate('')
      setCategory('')
      setAmount('')
    }


    return (
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '150px 150px 150px 120px', gap: '10px', alignItems: 'start' }}>
      <div>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ width: '100%' }}
          />
          {errors.date && <p>{errors.date}</p>}
        </div>

      <div>
        <input 
          type="text"
          placeholder='Category'
          value={category} 
          onChange={e => setCategory(e.target.value)}
          style={{ width: '100%' }}
          />
          {errors.category && <p>{errors.category}</p>}
        </div>

      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ width: '100%' }}
          />
          {errors.amount && <p>{errors.amount}</p>}
        </div>
        <button 
          type='submit'
          style={{ 
            width: '100%', 
            height: '38px',  // стандартная высота input
            padding: '8px 10px',
            fontSize: '14px',
            cursor: 'pointer',
            gap: '20px',
            marginTop: '-3px',
            marginLeft: '8px'
          }}
        >Add Expense</button>
      </form>
    )
  }

export default AddExpense 