import './App.css';
import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddMove from "./AddMove";
import useMoves from "./useMoves";
import MoveDetails from "./MoveDetails";
import MoveGallery from "./MoveGallery";

function App() {

    const {addMove, deleteMove, moves} = useMoves()

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/addMove"
                           element={<AddMove addMove={addMove}/>}/>
                    <Route path="/moves"
                    element={<MoveGallery moves={moves}/>}/>
                    <Route path="/moves/:id"
                           element={<MoveDetails deleteMove={deleteMove}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
