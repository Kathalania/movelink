import {useNavigate} from "react-router-dom";
import useDetail from "./useDetail";
import {Box, Button, Container, Grid, Paper, styled} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./MoveDetail.css"

type MoveDetailProps = {
    deleteMove: (id: string) => void
}
export default function MoveDetails(props: MoveDetailProps) {

    const {move} = useDetail()
    const navigate = useNavigate()
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'light' ? 'lightgrey' : '#fff',
        ...theme.typography.body1,
        padding: theme.spacing(1),
        textAlign: 'start',
        color: theme.palette.text.primary,
    }))

    function deleteMoveOnClick() {
        if (move) {
            props.deleteMove(move.id)
        }
        navigate("/moves")
    }

    return (
        <div className={"move-details"}>
            <h3>DETAILS</h3>
            <Box mt={2} mb={2}>
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>{move.name}</Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>{move.description}</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>{move.style}</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>{move.count}-count</Item>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Item>Starting position: {move.start}</Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>End position: {move.end}</Item>
                        </Grid>
                        <Grid item xs={6}>
                        <Button id="galleryBtn" type="submit" variant="outlined" startIcon={<ArrowBackIcon/>} onClick={() => {
                            navigate("/moves")
                        }}>gallery</Button>
                        </Grid>
                            <Grid item xs={6}>
                        <Button id="deleteBtn" type="submit" variant="outlined" color="error" startIcon={<DeleteIcon/>}
                                onClick={deleteMoveOnClick}>delete</Button>
                            </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )

}