import React, {FormEvent, useState} from "react";
import {NewChoreo} from "../models/Choreo";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {toast} from "react-toastify";

type AddChoreoProps = {
    addChoreo: (newChoreo: NewChoreo) => void
}
export default function AddChoreo(props: AddChoreoProps) {
    const [name, setName] = useState<string>('')
    const [choreoMoves, setChoreoMoves] = useState([])
    const navigate = useNavigate()

    function onClickSaveChoreo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newChoreo: NewChoreo = {
            name: name,
            choreoMoves: choreoMoves
        }
        props.addChoreo(newChoreo)
        console.log("post successful")
        toast.success("Choreo created")
        navigate("/choreos")
    }

    return (
        <form onSubmit={onClickSaveChoreo}>
            <Container maxWidth="sm">
                <Box mt={2} mb={2}>
                    <TextField
                        required
                        fullWidth
                        label="Choreo"
                        id="filled-basic"
                        variant="filled"
                        style={{backgroundColor: 'lightgray'}}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Box>
                <Button
                    id="galleryBtn"
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon/>}>
                    Save
                </Button>
            </Container>
        </form>
    )

}