import { useState, useEffect } from 'react'
import { API_URL } from './api'
import './App.css'

function App() {
  const [ping, setPing] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/ping`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then(data => setPing(JSON.stringify(data)))
      .catch(err => setPing("Error: " + err.message));
  }, []);


  return (
      <div>
        <h1>Ping from backend:</h1>
        <pre>{ping}</pre>
      </div>
  );
}

export default App
