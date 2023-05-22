import './App.css';
import Header from "./static/Header";
import {Route, Routes} from "react-router-dom";
import AddMove from "./moveComponents/AddMove";
import useMoves from "./hooks/useMoves";
import MoveGallery from "./moveComponents/MoveGallery";
import {ToastContainer} from "react-toastify";
import DetailRouting from "./moveComponents/DetailRouting";
import ChoreoGallery from "./choreoComponents/ChoreoGallery";
import useChoreos from "./hooks/useChoreos";
import ChoreoDetail from "./choreoComponents/ChoreoDetail";
import React from "react";
import useDetailChoreo from "./hooks/useDetailChoreo";
import {Box, CircularProgress} from "@mui/material";

function App() {

    const {addMove, deleteMove, moves, editMove} = useMoves()
    const {choreos, deleteChoreo, editChoreo} = useChoreos()
    const {choreo, setChoreo} = useDetailChoreo()


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
                           element={ choreo ? ( <ChoreoDetail
                               choreo={choreo}
                               setChoreo={setChoreo}
                               editChoreo={editChoreo}
                               deleteChoreo={deleteChoreo}
                           /> ) : (
                               <Box sx={{display: 'flex'}}>
                               <CircularProgress/>
                               </Box>
                               )}/>
                </Routes>
        </div>
    );
}

export default App;
