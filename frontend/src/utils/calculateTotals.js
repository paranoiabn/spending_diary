export function calculateTotals(expenses) {
    // сумма по категориям
        const byCategory = expenses.reduce((acc, expense) => {
          const cat = expense.category
    
          if(!acc[cat]) {
            acc[cat] = 0;
          }
          acc[cat] += Number(expense.amount);
          return acc;
        }, {});
    
    // общая сумма
        const total = expenses.reduce((acc, e) => acc +
        Number(e.amount), 0);

        return { total, byCategory }
}