import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from './components/Header.js'
import Results from './components/Results.js';

import About from './About.js'
import UploadImage from './uploadImage';
import Technology from './Technology';

import Home from './components/Home.js';
import FAQ from './components/FAQ.js';

import SearchSetting from "./searchSetting";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>

          <Route path="/about" element={<About />}/>
          <Route path="/tech" element={<Technology />}/>
          <Route path="/upload" element={<UploadImage />}/>

          <Route path="/home" element={<Home />}/>
          <Route path="/faq" element={<FAQ />}/>

          <Route path="/results" element={<Results />}/>
          <Route path="/uploadimage" element={<UploadImage />}/>
          <Route name="searchSetting" path="/searchSetting" element={<SearchSetting />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
