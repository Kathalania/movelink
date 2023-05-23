import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import "./ChoreoDetail.css"
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import useDetailChoreo from "../hooks/useDetailChoreo";
import SaveIcon from "@mui/icons-material/Save";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import {Choreo} from "../models/Choreo";
import {toast} from "react-toastify";
import {Move} from "../models/Move";
import ChoreoMoveGallery from "./ChoreoMoveGallery";

type ChoreoDetailProps = {
    deleteChoreo: (id: string) => void
    editChoreo: (choreo: Choreo) => Promise<Choreo>
    moves: Move[]
}

export default function ChoreoDetail(props: ChoreoDetailProps) {

    const {choreo, setChoreo} = useDetailChoreo()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }
    function handleSelectMove(move: Move) {
        if (choreo) {
            const updatedMoves = [...choreo.choreoMoves, move]
            const updatedChoreo: Choreo = { ...choreo, choreoMoves: updatedMoves }
            setChoreo(updatedChoreo)
            toast.success("Move added to Choreo")
        }
    }

    function deleteChoreoOnClick() {
            if (choreo) {
                props.deleteChoreo(choreo.id)
                toast.success("Choreo deleted")
            }
            navigate("/choreo")
        }

    function choreoInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (choreo) {
            const {name, value} = event.target
            setChoreo({
                ...choreo,
                [name]: value
            })
        }
    }

    function deleteMoveFromChoreo(moveId: string, index: number): void {
        if (choreo) {
            const updatedMoves = choreo.choreoMoves.filter(
                (move: Move, moveIndex: number) => moveIndex !== index
            );
            const updatedChoreo: Choreo = { ...choreo, choreoMoves: updatedMoves }
            setChoreo(updatedChoreo)
            toast.success("Move deleted from choreo")
        }
    }

    function duplicateMoveInChoreo(choreo: Choreo, moveId: string): Choreo {
        const moveToDuplicate = choreo.choreoMoves.find((move) => move.id === moveId)

        if (moveToDuplicate) {
            const duplicatedMove = {...moveToDuplicate}
            const updatedMoves = [...choreo.choreoMoves, duplicatedMove]
            const updatedChoreo: Choreo = {...choreo, choreoMoves: updatedMoves}
            setChoreo(updatedChoreo)
            toast.success("Move duplicated")
            return updatedChoreo
        }

        return choreo

    }


    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try { if (choreo){
            const updatedChoreo = await props.editChoreo(choreo)
            setChoreo(updatedChoreo)
            console.log("put successful")
            toast.success("Choreo updated")
            //navigate("/choreo/" + choreo.id)
            //window.location.reload()
        }
        } catch (error) {
            console.error(error)
            toast.error("Failed to update choreo")
        }
    }



    return (
        <div className="choreo-detail">
            {choreo ? (
                <div>
                    <Container maxWidth="md">
                        <form onSubmit={handleFormSubmit}>
                            <TextField
                                sx={{marginTop: 2}}
                                label="Choreo Name"
                                name="name"
                                value={choreo.name}
                                onChange={choreoInputChange}
                                InputLabelProps={{sx: {color: "lightgrey"}}}
                                InputProps={{
                                    style: {
                                        color: "lightgrey",
                                    }
                                }}
                            />
                            {choreo.choreoMoves && choreo.choreoMoves.map((move, index) =>
                                <Card key={`${move.id}-${index}`} className="choreo-move"
                                      sx={{backgroundColor: "#1B1E24", color: "lightgrey", margin: 2}}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} md={4}>
                                                {/* Video column */}
                                            </Grid>
                                            <Grid item xs={4} md={4}>
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
                                            </Grid>
                                            <Grid item xs={4} md={4}>
                                                <Box sx={{
                                                    marginTop: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-end'
                                                }}>
                                                    <IconButton
                                                        id="deleteBtn"
                                                        color="error"
                                                        title="remove"
                                                        onClick={() => {
                                                            deleteMoveFromChoreo(move.id, index)
                                                        }
                                                    }>
                                                        <RemoveCircleOutlineIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        id="addBtn"
                                                        color="success"
                                                        title="duplicate"
                                                        onClick={() => {
                                                            duplicateMoveInChoreo(choreo, move.id)
                                                        }
                                                        }>
                                                        <AddCircleOutlineIcon/>
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}
                            <Grid item xs={12}>
                                <Grid container spacing={2} justifyContent="space-evenly" mt={2} mb={2}>
                                    <Button
                                        id="galleryBtn"
                                        type="button"
                                        variant="contained"
                                        onClick={() => {
                                            navigate("/choreo")
                                        }}
                                        startIcon={<ArrowBackIcon/>}>
                                        Back to gallery
                                    </Button>
                                    <Button
                                        id="galleryBtn"
                                        variant="contained"
                                        color="success"
                                        startIcon={<AddIcon/>}
                                        onClick={handleOpen}>
                                        Add Move
                                    </Button>
                                    <Button
                                        id="galleryBtn"
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon/>}
                                    >
                                        Save Update
                                    </Button>
                                    <Button
                                        id="deleteBtn"
                                        type="submit"
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon/>}
                                        onClick={deleteChoreoOnClick}
                                    >
                                        Delete Choreo
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Move</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <ChoreoMoveGallery moves={props.moves} onSelectMove={handleSelectMove}/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ) : (
                <Box sx={{display: "flex"}}>
                    <CircularProgress/>
                </Box>
            )}
        </div>
    )
}