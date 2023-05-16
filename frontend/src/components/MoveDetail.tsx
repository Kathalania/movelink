import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, Paper, styled} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./MoveDetail.css"
import EditIcon from '@mui/icons-material/Edit';
import {Move} from "../models/Move";

type MoveDetailProps = {
    deleteMove: (id: string) => void
    move: Move
}
export default function MoveDetail(props: MoveDetailProps) {

    const navigate = useNavigate()
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#1B1E24' : 'white',
        ...theme.typography.body1,
        padding: theme.spacing(1),
        textAlign: 'start',
        color: 'lightgrey'
    }))

    function deleteMoveOnClick() {
        if (props.move) {
            props.deleteMove(props.move.id)
        }
        navigate("/moves")
    }

    return (
        <div className={"move-details"}>
            <h3>DETAILS</h3>
            <Box mt={2} mb={2} sx={{textAlign: "start", whiteSpace: "pre-line"}}>
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>{props.move.name}</Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>{props.move.description}</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>{props.move.style}</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>{props.move.count}-count</Item>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Item>Starting position: {props.move.start}</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>End position: {props.move.end}</Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent="space-evenly" mt={2}>
                                <Button id="galleryBtn" type="submit" variant="contained" startIcon={<ArrowBackIcon/>}
                                        onClick={() => {
                                            navigate("/moves")
                                        }}>gallery</Button>
                                <Button id="galleryBtn" type="submit" variant="contained" startIcon={<EditIcon/>}
                                        onClick={() => {
                                            navigate("/moves/" + props.move.id + "/edit")
                                        }}>edit</Button>
                                <Button id="deleteBtn" type="submit" variant="outlined" color="error"
                                        startIcon={<DeleteIcon/>}
                                        onClick={deleteMoveOnClick}>delete</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )

}