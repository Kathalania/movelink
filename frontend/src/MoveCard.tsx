import {Move} from "./Move";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

type MoveProps = {
    move: Move
}
export default function MoveCard (props: MoveProps){

    const navigate = useNavigate()

    return(
        <div className={"move-card"}>
            <p>Move</p>
            {props.move.name}
            <p>Style</p>
            {props.move.style}
            <p>Count</p>
            {props.move.count}
            <p>Start position</p>
            {props.move.start}
            <p>End position</p>
            {props.move.end}
            <Button variant="outlined" type="submit" onClick={() => {navigate("/moves/" + props.move.id)}}>
                See description</Button>
        </div>
    )
}