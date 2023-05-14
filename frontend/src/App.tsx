import './App.css';
import Header from "./Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddMove from "./AddMove";
import useMoves from "./useMoves";
import MoveDetails from "./MoveDetails";
import MoveGallery from "./MoveGallery";
import EditMove from "./EditMove";
import useDetail from "./useDetail";

function App() {

    const {addMove, deleteMove, moves} = useMoves()
    const {move} = useDetail()

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
                           element={<MoveDetails deleteMove={deleteMove} move={move}/>}/>
                    <Route path={"/moves/:id/update"} element={<EditMove/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
