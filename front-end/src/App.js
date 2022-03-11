import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header.js";
import Results from "./components/Results.js";
import UploadImage from "./uploadImage.js";
import SearchSetting from "./searchSetting";

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/results" element={<Results />} />
                    <Route
                        path="/uploadimage"
                        element={<UploadImage />}
                    ></Route>
                    <Route
                        name="searchSetting"
                        path="/searchSetting"
                        element={<SearchSetting />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
