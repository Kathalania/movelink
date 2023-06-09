import {Move, NewMove} from "../models/Move";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useMoves() {

    const [moves, setMoves] = useState<Move[]>([])

    useEffect(() => {
        loadAllMoves()
    }, [])

    function addMove(newMove: NewMove) {
        axios.post("/api/moves/add", newMove)
            .then(() => loadAllMoves())
            .catch(() => console.error("Your post was not successful!"))
    }

    function loadAllMoves() {
        axios.get("/api/moves")
            .then((getAllMovesResponse) => {
                setMoves(getAllMovesResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function editMove(move: Move) {
        return axios.put(`/api/moves/${move.id}/edit`, move)
            .then((putMoveResponse) => {
                setMoves(moves.map(moveToEdit => {
                    if (moveToEdit.id === move.id) {
                        return putMoveResponse.data
                    }
                    else {
                        return moveToEdit
                    }
                }))
                return putMoveResponse.data
            })
            .catch(console.error)
    }

    function deleteMove(id: string) {
        axios.delete("/api/moves/" + id)
            .then(() => {
                setMoves(moves.filter((move) => move.id !== id))
                toast.success("Move deleted")
            })
            .catch(console.error)
    }


    return {addMove, deleteMove, moves, editMove}

}
