import {NewMove} from "./Move";
import axios from "axios";

export default function useMoves() {

    function addMove(newMove: NewMove) {
        axios.post("/api/moves/add", newMove)
            .catch(() => console.error("Your post was not successful!"))
    }

    return {addMove}

}
