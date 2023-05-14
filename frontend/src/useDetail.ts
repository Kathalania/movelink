import React, {useEffect, useState} from "react";
import {Move} from "./Move";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {SelectChangeEvent} from "@mui/material";

export default function useDetail(){

    const initialState: Move = {id: "", name: "", description: "", style: "", count: "", start: "", end: ""}
    const [move, setMove] = useState(initialState)
    const [editing, setEditing] = useState(false)
    const [editedMove, setEditedMove] = useState<Move>(initialState)

    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if (id) {
            loadMoveById(id)
        }
    }, [id])

    function loadMoveById(id: string){
        axios.get("/api/moves/" + id)
            .then((response) => {
                setMove(response.data)
                setEditedMove(response.data)
            })
            .catch((error) => {
                toast.error("Move does not exist")
            })
    }

    function editOnClick(){
        setEditing(true)
    }

    function moveInputChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        const {name, value} = event.target
        setEditedMove((prevMove) => ({
            ...prevMove,
            [name]: value
        }))
    }

    function moveSelectChange(event: SelectChangeEvent<HTMLSelectElement>){
        const {name, value} = event.target
        setEditedMove((prevMove) => ({
            ...prevMove,
            [name]: value
        }))
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        axios.put("/api/moves/" + id, editedMove)
            .then((response) => {
                setMove(response.data)
                setEditing(false)
                window.location.reload()
                toast.success("Move updated")
            })
            .catch((error) => {toast.error("Failed to update move")
            })
    }



    return {move, editedMove, editing, moveInputChange, editOnClick, handleFormSubmit, moveSelectChange}
}

