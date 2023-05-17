import './App.css';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import AddMove from "./components/AddMove";
import useMoves from "./hooks/useMoves";
import MoveGallery from "./components/MoveGallery";
import {ToastContainer} from "react-toastify";
import DetailRouting from "./components/DetailRouting";
import ChoreoGallery from "./components/ChoreoGallery";
import useChoreos from "./hooks/useChoreos";

function App() {

    const {addMove, deleteMove, moves, editMove} = useMoves()
    const {choreos} = useChoreos()

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
                    <Route path="/choreos/*"
                           element={<ChoreoGallery moves={moves} choreos={choreos}/>}/>
                </Routes>
        </div>
    );
}

export default App;
