import { useState } from "react";
import Button from "./Button";
import styles from './styles/AddExpense.module.scss';

function AddExpense({ onAdd }) {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};

      if (!date) {
        newErrors.date = "Дата обязательна";
      } else {
        // создаем обьект date из строки
        const selectedDate = new Date(date);
        // получаем сегодняшнюю дату
        const today = new Date();
        // вычисляем дату год назад
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        // дата не слишком старая
        if (selectedDate < oneYearAgo) {
          newErrors.date = "Дата не может быть старше 1 года";
        }
        // дата не в будущем
        if (selectedDate > today) {
          newErrors.date = "Дата не может быть в будущем"
        }  
      }
       
      if (!category) {
        newErrors.category = "Категория обязательна";
      } else if (category.length < 3) {
        newErrors.category = "Категория должна содержать минимум 3 символов"
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
      <form onSubmit={handleSubmit} className={styles.form}>
      <div style={{ position:'relative'}}>
        <input
        className={styles.input} 
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ width: '100%'}}
          />
          {errors.date && <p style={{ position: 'absolute', top: '100%', left: '0' }} >{errors.date}</p>}
        </div>

      <div style={{ position:'relative'}}>
        <input
          className={styles.input} 
          type="text"
          placeholder='Category'
          value={category} 
          onChange={e => setCategory(e.target.value)}
          style={{ width: '100%' }}
          />
          {errors.category && <p style={{ position: 'absolute', top: '100%', left: '0' }} >{errors.category}</p>}
        </div>

      <div style={{ position:'relative', color:'aqua'}}>
        <input
          className={styles.input} 
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ width: '100%' }}
          />
          {errors.amount && <p style={{ position: 'absolute', top: '100%', left: '0' }} >{errors.amount}</p>}
        </div>
        {}
        <Button
          type="submit"
          variant="primary">
          Add
        </Button>
      </form>
    )
  }

export default AddExpense 