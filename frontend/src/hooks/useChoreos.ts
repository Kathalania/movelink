import {useEffect, useState} from "react";
import {Choreo, NewChoreo} from "../models/Choreo";
import axios from "axios";
import {toast} from "react-toastify";

export default function useChoreos() {

    const [choreos, setChoreos] = useState<Choreo[]>([])

    useEffect(() => {
        loadAllChoreos()
    }, [])

    useEffect(() => {
        loadAllChoreos()
    }, [])

    function addChoreo(newChoreo: NewChoreo) {
        axios.post("/api/choreo/add", newChoreo)
            .then(() => loadAllChoreos())
            .catch(() => console.error("Your post was not successful!"))
    }

    function loadAllChoreos() {
        axios.get("/api/choreo")
            .then((getAllChoreosResponse) => {
                setChoreos(getAllChoreosResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function editChoreo(choreo: Choreo) {
        return axios.put(`/api/choreo/${choreo.id}/edit`, choreo)
            .then((putChoreoResponse) => {
                setChoreos(choreos.map(choreoToEdit => {
                    if (choreoToEdit.id === choreo.id) {
                        return putChoreoResponse.data
                    } else {
                        return choreoToEdit
                    }
                }))
                return putChoreoResponse.data
            })
            .catch(console.error)
    }

    function deleteChoreo(id: string) {
        axios.delete(`/api/choreo/` + id)
            .then(() => {
                setChoreos(choreos.filter((choreo) => choreo.id !== id))
                toast.success("Choreo deleted")
            })
            .catch(console.error)
    }

    return {choreos, deleteChoreo, editChoreo, setChoreos, addChoreo}
}