import "./styles.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation,
} from "react-router-dom";

import Header from "./components/Header.js";
import Results from "./components/Results.js";

import About from "./About.js";
import UploadImage from "./uploadImage";
import Technology from "./Technology";

import Home from "./components/Home.js";
import FAQ from "./components/FAQ.js";

import SearchSetting from "./searchSetting";
import HowItWorks from "./HowItWorks";
import Login from "./Login.js";
import Registration from "./Registration.js";
import Dashboard from "./Dashboard";
import UploadExample from "./upload-example.js";
import React from "react";

function RequireAuth({ children }) {
    return localStorage.getItem("token") ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );
}

function App() {
    const [user, setUser] = React.useState(localStorage.getItem("token"));

    return (
        <div>
            <BrowserRouter>
                <Header setUser={setUser} user={user} />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/our-tech" element={<Technology />} />
                    <Route path="/upload" element={<UploadImage />} />

                    <Route path="/home" element={<Home />} />
                    <Route path="/faq" element={<FAQ />} />

                    <Route path="/results" element={<Results />} />
                    <Route path="/uploadimage" element={<UploadImage />} />
                    <Route
                        name="searchSetting"
                        path="/searchSetting"
                        element={<SearchSetting />}
                    />
                    <Route
                        name="howItWorks"
                        path="/HowItWorks"
                        element={<HowItWorks />}
                    />

                    <Route
                        name="login"
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                    <Route
                        name="register"
                        path="/register"
                        element={<Registration />}
                    />
                    {/* access deny */}
                    <Route
                        name="dashboard"
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                {" "}
                                <Dashboard />{" "}
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
