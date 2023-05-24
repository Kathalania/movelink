import './App.css';
import Header from "./static/Header";
import {Route, Routes} from "react-router-dom";
import AddMove from "./components/AddMove";
import useMoves from "./hooks/useMoves";
import MoveGallery from "./components/MoveGallery";
import {ToastContainer} from "react-toastify";
import DetailRouting from "./components/DetailRouting";
import ChoreoGallery from "./choreoComponents/ChoreoGallery";
import useChoreos from "./hooks/useChoreos";
import ChoreoDetail from "./choreoComponents/ChoreoDetail";
import React from "react";
import AddChoreo from "./choreoComponents/AddChoreo";

function App() {

    const {addMove, deleteMove, moves, editMove} = useMoves()
    const {choreos, deleteChoreo, editChoreo, addChoreo} = useChoreos()

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
                           element={<ChoreoGallery moves={moves} choreos={choreos}/>}/>
                    <Route path="/choreo/:id"
                           element={<ChoreoDetail
                               editChoreo={editChoreo}
                               deleteChoreo={deleteChoreo}
                               moves={moves}
                           />}/>
                           element={<ChoreoDetail/>}/>
                    <Route path="/addChoreo"
                           element={<AddChoreo addChoreo={addChoreo}/>}/>
                </Routes>
        </div>
    );
}

export default App;
