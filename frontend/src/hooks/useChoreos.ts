import {useEffect, useState} from "react";
import {Choreo} from "../models/Choreo";
import axios from "axios";

export default function useChoreos() {
    const [choreos, setChoreos] = useState<Choreo[]>([])

    useEffect(() => {loadAllChoreos()}, [])

    function loadAllChoreos(){
        axios.get("/api/choreo")
            .then((getAllChoreosResponse) => {
                setChoreos(getAllChoreosResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return {choreos}
}