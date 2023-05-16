import {
    Box,
    Button, CircularProgress,
    Container,
    FormControl, Grid,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./MoveDetail.css"
import {toast} from "react-toastify";
import {Move} from "./Move";

type EditMoveProps = {
    move: Move
    editMove: (move: Move) => Promise<Move>
    setMove: React.Dispatch<Move>
}
export default function EditMove(props: EditMoveProps) {

    const navigate = useNavigate()
    const [editedMove, setEditedMove] = useState<Move>(props.move)

    function moveInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setEditedMove((prevMove) => ({
            ...prevMove,
            [name]: value
        }))
    }

    function moveStyleChange(event: SelectChangeEvent<string>) {
        const value = event.target.value
        setEditedMove((prevMove) => ({
            ...prevMove,
            style: value
        }))
    }

    function moveCountChange(event: SelectChangeEvent<string>) {
        const value = event.target.value
        setEditedMove((prevMove) => ({
            ...prevMove,
            count: value
        }))
    }

    function moveStartChange(event: SelectChangeEvent<string>) {
        const value = event.target.value
        setEditedMove((prevMove) => ({
            ...prevMove,
            start: value
        }))
    }

    function moveEndChange(event: SelectChangeEvent<string>) {
        const value = event.target.value
        setEditedMove((prevMove) => ({
            ...prevMove,
            end: value
        }))
    }

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const updatedMove = await props.editMove(editedMove)
            props.setMove(updatedMove)
            console.log("put successful")
            toast.success("Move updated")
            navigate("/moves/" + props.move.id)
        } catch (error) {
            console.error(error)
            toast.error("Failed to update move")
            navigate("/moves")
        }
    }


    return (
        <div className="move-edit">
            {props.move ? (
                <form onSubmit={handleFormSubmit}>
                    <h3>EDIT</h3>
                    <Box mt={2} mb={2} margin={1}>
                        <Container maxWidth="sm">
                            <TextField
                                required
                                fullWidth
                                sx={{marginBottom: 1}}
                                label="Move"
                                name="name"
                                id="filled-basic"
                                variant="filled"
                                style={{backgroundColor: 'lightgrey'}}
                                value={editedMove.name}
                                onChange={moveInputChange}
                            />

                            <TextField
                                required
                                multiline
                                rows={5}
                                fullWidth
                                sx={{marginBottom: 1}}
                                label="Description"
                                name="description"
                                variant="filled"
                                style={{backgroundColor: 'lightgray'}}
                                value={editedMove.description}
                                onChange={moveInputChange}
                            />

                            <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgrey'}}
                                         sx={{marginBottom: 1}}>
                                <InputLabel>Style</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedMove.style}
                                    label="Style"
                                    name="style"
                                    onChange={moveStyleChange}
                                >
                                    <MenuItem value="Lindy Hop">Lindy Hop</MenuItem>
                                    <MenuItem value="Charleston">Charleston</MenuItem>
                                    <MenuItem value="Solo">Solo</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgrey'}}
                                         sx={{marginBottom: 1}}>
                                <InputLabel>Count</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedMove.count}
                                    label="Count"
                                    name="count"
                                    onChange={moveCountChange}
                                >
                                    <MenuItem value="4">4-count</MenuItem>
                                    <MenuItem value="6">6-count</MenuItem>
                                    <MenuItem value="8">8-count</MenuItem>
                                    <MenuItem value="10">10-count</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgrey'}}
                                         sx={{marginBottom: 1}}>
                                <InputLabel>Start Position</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedMove.start}
                                    label="Start"
                                    name="start"
                                    onChange={moveStartChange}
                                >
                                    <MenuItem value="open">open</MenuItem>
                                    <MenuItem value="closed">closed</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgrey'}}
                                         sx={{marginBottom: 1}}>
                                <InputLabel>End position</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedMove.end}
                                    label="End"
                                    onChange={moveEndChange}
                                >
                                    <MenuItem value="open">open</MenuItem>
                                    <MenuItem value="closed">closed</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid item xs={12}>
                                <Grid container spacing={2} justifyContent="space-evenly" mt={2} mb={2}>
                                    <Button
                                        id="galleryBtn"
                                        type="button"
                                        variant="contained"
                                        onClick={() => {navigate("/moves/" + props.move.id)}}
                                        startIcon={<ArrowBackIcon/>}>
                                        Back to move
                                    </Button>

                                    <Button
                                        id="galleryBtn"
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon/>}>
                                        Save Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </form>
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
        </div>

    )
}