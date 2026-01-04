import { useState, useEffect } from 'react'
import { API_URL } from './api'
import './App.css'
import { calculateTotals } from './utils/calculateTotals';
import { getCategories } from './utils/categories';
import { filterByCategory } from './utils/filter';
import ExpensesList from './components/ExpensesList';
import { parseCsv } from './utils/csv';
import AddExpense from './components/AddExpense';
import TotalsByCategory from './components/TotalsByCategory';
import ManualExpensesSection from './components/ManualExpensesSection';
import FileUpLoad from './components/FileUpLoad';
import ExpensesTable from './components/ExpensesTable';
import CategorySelect from './components/CategorySelect';
 
function App() {
  const [ping, setPing] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [totals, setTotals] = useState({ total: 0, byCategory: {} });
  const [data, setData] = useState([]);
  const [csvExpenses, setCsvExpenses] = useState([]);
  const [manualExpenses, setManualExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // useEffect(() => {
  //   fetch(`${API_URL}/ping`)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error("Server error");
  //       }
  //       return res.json();
  //     })
  //     .then(data => setPing(JSON.stringify(data)))
  //     .catch(err => setPing("Error: " + err.message));
  // }, []);

// загружаем из localstorage при старте

// //
//   const dat1a = { "Food": 100, "Games": 200, "Transport": 50 }

//   const entDat1a = Object.entries(dat1a)
//   .map(([category, amount]) => ({ category, amount }))

//   console.log(entDat1a);
// //

  const allExpenses = [...csvExpenses, ...manualExpenses];

  useEffect(() => {
    const saved = localStorage.getItem('csvExpenses')
    if (saved) setCsvExpenses(JSON.parse(saved))
  }, [])

// сохраняем в localstorage при изменении
  useEffect(() => {
    localStorage.setItem('csvExpenses', JSON.stringify(csvExpenses, manualExpenses))
  }, [csvExpenses, manualExpenses])

  const addExpense = (expense) => {
    // добавляем новый расход
    setManualExpenses(prev => [...prev, expense])
  }

  useEffect(() => {
    const totalsResult = calculateTotals(allExpenses)
    setTotals(totalsResult)
  }, [csvExpenses, manualExpenses]);


  // const tableData = Object.entries(totals.byCategory).map(
  //   ([category, amount]) => ({ category, amount })
  // )  

  const tableData = Object.entries(totals.byCategory)
    .filter(([category]) => selectedCategory === 'all' || category === selectedCategory)
    .map(([category, amount]) => ({ category, amount })); 


  // подсчет manualExpenses

  const addManualExpense = (manualExpenses) => {
    setManualExpenses(prev => [...prev, manualExpenses])
  }


  // отображаем список расходов


  const handleFile = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
      // setSelectedFiles(Array.from(files).map(file => file.name));
      setSelectedFiles(prev => [...prev, ...Array.from(files).map(file => file.name)]);

      Array.from(files).forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const csvText = reader.result;
        // setText(csvText); // ✅ сохраняем сырой CSV в state
        const parsed = parseCsv(csvText)
        setCsvExpenses(prev => [...prev, ...parsed]); // ✅ сохраняем таблицу
      };
      
      reader.readAsText(file);
    });
  };
  
  // форма


    
  // const allExpenses = [...csvExpenses, ...expenses];

  const hasExpenses = manualExpenses.some((manualExpenses) => {
    if ( manualExpenses.amount > 0) {
      return true;
    }
  });

  const today = new Date().toISOString().slice(0,10);

  const todayExpense = manualExpenses.find((manualExpenses) => {
    if (manualExpenses.date === today) {
      return true;
    }
  });

  // const totalCsv = csvExpenses.reduce((sum, e) => {
  //   return sum + e.amount
  // }, 0);


  const totalManual = manualExpenses.reduce((sum, e) => {
    return sum + e.amount
  }, 0);


  const categories = getCategories(allExpenses);

  const filteredExpenses = filterByCategory(
    allExpenses,
    selectedCategory
  );

  const deleteManualExpense = (index) => {
    setManualExpenses(prev => prev.filter((item, idx) => idx !== index));
  }



  // const csvText = `
  // data,category,amount
  // 2025-12-01,Food,520
  // 2025-12-02,Games,999
  // 2025-12-03,Food,300
  // `

  // console.log(expenses);
  // console.log(totals.byCategory);
  

  const mergedExpenses = Object.entries(totals.byCategory).map(
    ([category, amount]) => ({ category, amount })
  );
  

  return (
      <div style={{ padding: 20 }}>
        <FileUpLoad handleFile={handleFile}
        selectedFiles={selectedFiles}
        />

      <pre style={{ maxHeight: 200, overflow: "auto" }}>{text}</pre>

      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      />

      <ExpensesTable expenses={tableData} />

      <TotalsByCategory
        total={totals.total}
        totalsByCategory={totals.byCategory}
      />

    <ManualExpensesSection
        addManualExpense={addManualExpense}
        manualExpenses={manualExpenses}
        hasExpenses={hasExpenses}
        todayExpenseData={todayExpense}
        totalManual={totalManual}
        deleteManualExpense={deleteManualExpense}
    />
  </div>
  );
}

export default App
