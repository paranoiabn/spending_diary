import { useState, useEffect, useMemo} from 'react'
import { API_URL } from './api'
import './App.css'
import { calculateTotals } from './utils/calculateTotals';
import { getCategories } from './utils/categories';
import { filterByCategory } from './utils/filter';
import { parseCsv } from './utils/csv';
import TotalsByCategory from './components/TotalsByCategory';
import TotalAmount from './components/TotalAmount';
import ManualExpensesSection from './components/ManualExpensesSection';
import FileUpLoad from './components/FileUpLoad';
import ExpensesTable from './components/ExpensesTable';
import CategorySelect from './components/CategorySelect';
import Header from './components/header';
import { theme } from './components/styles/theme';
import styles from './components/styles/TotalSection.module.scss';
import appWrapper from './components/styles/AppWrapper.module.scss';
import pageTable from './components/styles/ExpensesTable.module.scss';
import CsvTable from './components/styles/CsvTable.module.scss';
import ManualSection from './components/styles/ManualSection.module.scss';

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
  const allExpenses = [...csvExpenses, ...manualExpenses];

  useEffect(() => {
    const saved = localStorage.getItem('expenses');

    if (saved) {
      const parsed = JSON.parse(saved);
      setCsvExpenses(parsed.csv || []);
      setManualExpenses(parsed.manual || []);
    }
  }, []);

// сохраняем в localstorage при изменении
  useEffect(() => {
    const dataToSave = {
      csv: csvExpenses,
      manual: manualExpenses,
    };

    localStorage.setItem('expenses', JSON.stringify(dataToSave))
  }, [csvExpenses, manualExpenses]);

  const addExpense = (expense) => {
    // добавляем новый расход
    setManualExpenses(prev => [...prev, expense])
  }

  useEffect(() => {
    const totalsResult = calculateTotals(allExpenses)
    setTotals(totalsResult)
  }, [allExpenses]);

  const tableData = useMemo(() => {
    console.log("Считаем общий итог...");

    return Object.entries(totals.byCategory)
    .filter(([category]) => selectedCategory === 'all' || category === selectedCategory)
    .map(([category, amount]) => {
      // все расходы этой категории
      const categoryExpenses = allExpenses.filter(e => e.category === category);

      // берем первую дату
      const firstDate = categoryExpenses.length > 0
        ? categoryExpenses[0].date
        : '';

      return {
        category,
        amount,
        date: firstDate // добавляем дату
      };
    });
  }, [totals.byCategory, selectedCategory, allExpenses]);



  // подсчет manualExpenses

  const addManualExpense = (manualExpenses) => {
    setManualExpenses(prev => [...prev, manualExpenses])
  }


  // отражение списка расходов


  const handleFile = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
      setSelectedFiles(prev => [...prev, ...Array.from(files).map(file => file.name)]);

      Array.from(files).forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const csvText = reader.result;
        const parsed = parseCsv(csvText)
        console.log('Парсированные данные:', parsed);
        console.log('Категории в parsed:', parsed.map(e => e.category));
        setCsvExpenses(prev => [...prev, ...parsed]); // сохраням таблицу
      };
      
      reader.readAsText(file);
    });
  };
  
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

  const mergedExpenses = Object.entries(totals.byCategory).map(
    ([category, amount]) => ({ category, amount })
  );
  
  // function TotalAmount1({ amount, category }) {
  //   let color;
    
  //   if (category === 'Food') {
  //     color = theme.colors.error;
  //   } else if (category === 'Transport') {
  //     color = theme.colors.warning
  //   } else {
  //     color = theme.colors.success;
  //   }

  //   return (
  //     <div >
  //       {category}: {amount} $
  //     </div>
  //   )
  // }

  // const mockExpenses = [
  //   { date: '2026-01-01', category: 'Food', amount: 520 },
  //   { date: '2026-01-02', category: 'Games', amount: 999 },
  //   { date: '2026-01-03', category: 'Food', amount: 300 },
  // ];


  return (
      <div className={appWrapper.appWrapp}>
        <Header />
        <div style={{ fontFamily:'Changa One' }}>
          
          <section className={styles.totalSection}>
            <TotalAmount total={totals.total}/>
          </section>
      
          <section className='upload_section'>
          <FileUpLoad 
            handleFile={handleFile}
            selectedFiles={selectedFiles}
            />
           </section>
           <pre style={{ maxHeight: 200, overflow: "auto" }}>{text}</pre>
           
            <section>
              <CategorySelect
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
            </section>

            <section className={pageTable.pageTable} >
              <div  className={pageTable.tableWrapp}>
                <ExpensesTable className={CsvTable.csv_table}
                expenses={tableData} />
              </div>

              <div className={pageTable.totalsWrap}>
                <TotalsByCategory 
                  totalsByCategory={totals.byCategory}
                />
              </div>
              
            </section>

            <section className={ManualSection.manualSection}>
              <ManualExpensesSection
                addManualExpense={addManualExpense}
                manualExpenses={manualExpenses}
                hasExpenses={hasExpenses}
                todayExpenseData={todayExpense}
                totalManual={totalManual}
                deleteManualExpense={deleteManualExpense}
              />
            </section>
          </div> 
      </div>
  );
}

export default App
