import {Move, NewMove} from "./Move";
import axios from "axios";
import {useState} from "react";

export default function useMoves() {

    const [move,setMove] = useState('')
    function addMove(newMove: NewMove) {
        axios.post("/api/moves/add", newMove)
            .then(response => {
                setMove(response.data)
            })
            .catch(() => console.error("Your post was not successful!"))
    }

    return {addMove}

}
