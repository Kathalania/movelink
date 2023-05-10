import {Move} from "./Move";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type MoveProps = {
    move: Move
}
export default function (props: MoveProps){

    const navigate = useNavigate()

    return(
        <div className={"move-card"}>
            {props.move.name}
            {props.move.style}
            {props.move.count}
            {props.move.start}
            {props.move.end}
            <button onClick={() => {navigate("/moves/" + props.move.id)}}>See description</button>
        </div>
    )
}