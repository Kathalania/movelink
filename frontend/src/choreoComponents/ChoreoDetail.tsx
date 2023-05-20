import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import "./ChoreoDetail.css"
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import useDetailChoreo from "../hooks/useDetailChoreo";
import EditIcon from "@mui/icons-material/Edit";

type ChoreoDetailProps = {
    deleteChoreo: (id: string) => void
}

export default function ChoreoDetail(props: ChoreoDetailProps) {

    const navigate = useNavigate()
    const {choreo, editedChoreo, editing, handleFormSubmit, editOnClick, choreoInputChange} = useDetailChoreo()


    function deleteChoreoOnClick() {
        if (choreo) {
            props.deleteChoreo(choreo.id)
        }
        navigate("/choreos")
    }

    if (choreo === undefined) {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <div className="choreo-detail">
            {choreo ? (
                <div>
                    <Container maxWidth='md'>
                        <h2>{choreo.name.toUpperCase()}</h2>
                        {choreo.choreoMoves.map((move) =>
                            (<Card className='choreo-move' style={{
                                    backgroundColor: "#1B1E24",
                                    color: "lightgrey",
                                    justifyContent: "start",
                                    margin: 2
                                }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {move.name}
                                        </Typography>
                                        <Typography variant="body1" color="lightgrey">
                                            {move.count} - count
                                        </Typography>
                                        <Typography variant="body1" color="lightgrey">
                                            {move.style}
                                        </Typography>
                                        <Typography variant="body1" color="lightgrey">
                                            {move.start}
                                        </Typography>
                                        <Typography variant="body1" color="lightgrey">
                                            {move.end}
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        id="deleteBtn"
                                        type="submit"
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon/>}>
                                        remove from Choreo
                                    </Button>
                                </Card>
                            ))
                        }
                    </Container>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', margin: 2}}>
                    <Button id="galleryBtn"
                            type="submit"
                            variant="contained"
                            startIcon={<EditIcon/>}
                            onClick={editOnClick}>
                        edit Choreo
                    </Button>
                    <Button id="deleteBtn"
                            type="submit"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon/>}
                            onClick={deleteChoreoOnClick}>
                        delete Choreo
                    </Button>
                    </Box>
                </div>
            ) : (
                <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>
            )}
        </div>
    )
}