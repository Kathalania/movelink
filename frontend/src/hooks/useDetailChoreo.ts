import {useEffect, useState} from "react";
import {Choreo} from "../models/Choreo";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function useDetailChoreo(){

    const [choreo, setChoreo] = useState<Choreo>()
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
            })
            .catch(() => {
                toast.error("Choreo does not exist")
            })
    }
    return {choreo, setChoreo}
}