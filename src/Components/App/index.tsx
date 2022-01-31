import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Weather from "../Weather";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Weather/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;