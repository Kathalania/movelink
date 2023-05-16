import './App.css';
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import AddMove from "./AddMove";
import useMoves from "./useMoves";
import MoveGallery from "./MoveGallery";
import {ToastContainer} from "react-toastify";
import DetailRouting from "./DetailRouting";
import ChoreoGallery from "./ChoreoGallery";

function App() {

    const {addMove, deleteMove, moves, editMove} = useMoves()

    return (
        <div className="App">
                <Header/>
                <ToastContainer autoClose={3000}/>
                <Routes>
                    <Route path="/addMove"
                           element={<AddMove addMove={addMove}/>}/>
                    <Route path="/moves"
                    element={<MoveGallery moves={moves}/>}/>
                    <Route path="/moves/:id/*"
                           element={<DetailRouting editMove={editMove} deleteMove={deleteMove}/>}/>
                    <Route path="/choreo"
                           element={<ChoreoGallery/>}/>
                </Routes>
        </div>
    );
}

export default App;
