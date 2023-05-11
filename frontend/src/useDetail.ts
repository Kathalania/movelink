import {useEffect, useState} from "react";
import {Move} from "./Move";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function(){

    const initialState: Move = {id: "", name: "", description: "", style: "", count: "", start: "", end: ""}
    const [move, setMove] = useState<Move>(initialState)

    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if (id) {
            loadMoveById(id)
        }
    }, [])

    function loadMoveById(id: string){
        axios.get("/api/moves/" + id)
            .then((response) => {
                setMove(response.data)
            })
            .catch((error) => {
                toast.error("Move does not exist")
            })

    }
    return {move}
}

