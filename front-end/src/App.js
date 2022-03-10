import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header.js'
import Results from './components/Results.js';


function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/results" element={<Results />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
