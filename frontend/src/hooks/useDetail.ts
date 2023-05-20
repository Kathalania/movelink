import {useEffect, useState} from "react";
import {Move} from "../models/Move";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useDetail() {

    const [move, setMove] = useState<Move>()

    const params = useParams<{ id: string }>()
    useEffect(() => {
        if (params.id) {
            loadMoveById(params.id)
        }
    }, [params.id])

    function loadMoveById(id: string) {
        axios.get("/api/moves/" + id)
            .then((response) => {
                setMove(response.data)
            })
            .catch(() => {
                toast.error("Move does not exist")
            })
    }

    return {
        move, setMove
    }
}

