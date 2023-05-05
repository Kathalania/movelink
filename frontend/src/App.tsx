import './App.css';
import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import AddMove from "./AddMove";
import useMoves from "./useMoves";

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
            <ToastContainer theme={"dark"}/>
        </div>
    );
}

export default App;
