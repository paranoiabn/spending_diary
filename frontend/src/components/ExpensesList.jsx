import DeleteButton from "./DeleteButton"

function ExpensesList({ csvExpenses, onDelete }) {
  if (!csvExpenses || !Array.isArray(csvExpenses)) {
    return <div>Нет данных</div>;
  }
    return (
      <ul>
        {csvExpenses.map((e, idx) => (
          <li key={idx}>
            {e.date} - {e.category} - {e.amount}
            <DeleteButton
                onDelete={onDelete}
                expenseIndex={idx}
            />
          </li>
        ))}
      </ul>
    )
  }

export default ExpensesList


// SPA - single page aplication
// MPA - multiple page aplication

// реакт - один page, динамически подгружает
// каждый файл отдельно

// DOM - воспринимать как папки на ПК - 
// - проблема DOM 

// в реакте Virtual DOM - копит в себе
// изменения, за счет этого оптимизация

// Кэширование - выполнить 1 раз, результат в хранилище
// функция вернет результат из хранилища

// JSX - 
// import React from "react";
// const app () => {
//   const array  = [{ hello: 'world'}];

//   const arrayreactelements = [];

//   array.forEach((obj) => {
//     arrayreactelements.push(
//       <p>{obj.hello}</p>
//     );
//   });

//   // for (let i = 0; i < array.length; i++) {
//   //   const obj = array[i];

//   //   arrayreactelements.push(
//   //     <div>{obj.hello}</div>
//   //   )
//   // }

//   return (
//     <div>
//         {array.reduce((acc, obj) => {
//           acc.push(
//             <p>{obj.hello}</p>
//           );

//           return acc;
//         }, [])}
//     </div>
//   )
// };
// import './index.css'
// // camelCase
// export default App;