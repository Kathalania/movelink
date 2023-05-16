import {Route, Routes} from "react-router-dom";
import MoveDetails from "./MoveDetails";
import EditMove from "./EditMove";
import useDetail from "./useDetail";
import React from "react";
import {Move} from "./Move";

type DetailRoutingProps = {
    deleteMove: (id: string) => void
    editMove: (move: Move) => Promise<Move>
}
export default function DetailRouting(props: DetailRoutingProps) {

    const {move, setMove} = useDetail()

    if (move === undefined){
        return <p>Loading...</p>
    }



    return (
        <Routes>
            <Route index
                   element={<MoveDetails deleteMove={props.deleteMove} move={move}/>}/>
            <Route path={"/edit"}
                   element={<EditMove setMove={setMove} editMove={props.editMove} move={move}/>}/>
        </Routes>
    )
}