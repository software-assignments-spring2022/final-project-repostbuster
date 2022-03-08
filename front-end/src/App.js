import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header.js'
import Results from './components/Results.js';
import Home from './components/Home.js';
import FAQ from './components/FAQ.js';


function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/faq" element={<FAQ />}/>
          <Route path="/results" element={<Results />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
