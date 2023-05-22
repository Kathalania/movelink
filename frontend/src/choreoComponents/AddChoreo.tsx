import {FormEvent, useState} from "react";
import {NewChoreo} from "../models/Choreo";

type AddChoreoProps = {
    addChoreo: (newChoreo: NewChoreo) => void
}
export default function AddChoreo(props: AddChoreoProps){
    const [name, setName] = useState<string>('')
    const [choreoMoves, setChoreoMoves] = useState([])
    function onClickSaveChoreo(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const newChoreo: NewChoreo = {
            name: name,
            choreoMoves: choreoMoves
        }
        props.addChoreo(newChoreo)
    }

}