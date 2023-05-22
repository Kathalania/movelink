import {useEffect, useState} from "react";
import {Choreo, NewChoreo} from "../models/Choreo";
import axios from "axios";

export default function useChoreos() {

    const [choreos, setChoreos] = useState<Choreo[]>([])

    useEffect(() => {
        loadAllChoreos()
    }, [])

    function addChoreo(newChoreo: NewChoreo) {
        axios.post("/api/choreo/add", newChoreo)
            .then(() => loadAllChoreos())
            .catch(() => console.error("Your post was not successful!"))
    }

    function loadAllChoreos(){
        axios.get("/api/choreo")
            .then((getAllChoreosResponse) => {
                setChoreos(getAllChoreosResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return {choreos, addChoreo}
}