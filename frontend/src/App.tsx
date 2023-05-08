import './App.css';
import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddMove from "./AddMove";
import useMoves from "./useMoves";
import React from "react";

function App() {

    const {addMove} = useMoves()

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/add"
                           element={<AddMove addMove={addMove}/>}/>
                    <Route path="/moves"/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
