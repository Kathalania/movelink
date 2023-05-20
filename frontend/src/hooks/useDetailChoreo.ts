import React, {useEffect, useState} from "react";
import {Choreo} from "../models/Choreo";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import useChoreos from "./useChoreos";


export default function useDetailChoreo(){

    const {editChoreo} = useChoreos()
    const [choreo, setChoreo] = useState<Choreo>()
    const [editing, setEditing] = useState(false);
    const [editedChoreo, setEditedChoreo] = useState<Choreo>({
        id:"",
        name: "",
        choreoMoves: []
    })

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            loadChoreoById(id)
        }
    }, [])

    function loadChoreoById(id: string){
        axios.get("/api/choreo/" + id)
            .then((response) =>{
                setChoreo(response.data)
                setEditedChoreo(response.data)
            })
            .catch(() => {
                toast.error("Choreo does not exist")
            })
    }

    function editOnClick() {
        setEditing(true)
    }

    function choreoInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setEditedChoreo((prevChoreo) => ({
            ...prevChoreo,
            [name]: value,
        }));
    }

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const updatedChoreo = await editChoreo(editedChoreo)
            setChoreo(updatedChoreo)
            console.log("put successful")
            toast.success("Choreo updated")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update choreo")
        }
    }


    return {choreo, setChoreo, editedChoreo, editing, handleFormSubmit, editOnClick, choreoInputChange}
}
