import useDetail from "./useDetail";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditMove() {

    const navigate = useNavigate()
    const {
        editedMove, move, handleFormSubmit, editOnClick,
        moveInputChange, moveSelectChange
    } = useDetail()


    return (
        <div>
            {move ? (
                    <form onSubmit={handleFormSubmit}>
                        <h3>EDIT</h3>
                        <Box mt={2} mb={2} margin={1}>
                            <Container maxWidth="sm">
                                <TextField
                                    required
                                    fullWidth
                                    sx={{ marginBottom: 1}}
                                    label="Move"
                                    id="filled-basic"
                                    variant="filled"
                                    style={{backgroundColor: 'dimgray', color:'lightgrey'}}
                                    value={editedMove.name}
                                    onChange={moveInputChange}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    sx={{ marginBottom: 1}}
                                    label="Description"
                                    variant="filled"
                                    style={{backgroundColor: 'dimgray'}}
                                    value={editedMove.description}
                                    onChange={moveInputChange}
                                />

                                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'dimgray', color:'lightgrey'}} sx={{ marginBottom: 1}}>
                                    <InputLabel>Style</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        is={editedMove.style}
                                        label="Style"
                                        onChange={moveSelectChange}
                                    >
                                        <MenuItem value="Lindy Hop" id="filled-basic">Lindy Hop</MenuItem>
                                        <MenuItem value="Charleston">Charleston</MenuItem>
                                        <MenuItem value="Solo">Solo</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'dimgray', color:'lightgrey'}} sx={{ marginBottom: 1}}>
                                    <InputLabel>Count</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        is={editedMove.count}
                                        label="Count"
                                        onChange={moveSelectChange}
                                    >
                                        <MenuItem value="4">4-count</MenuItem>
                                        <MenuItem value="6">6-count</MenuItem>
                                        <MenuItem value="8">8-count</MenuItem>
                                        <MenuItem value="10">10-count</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'dimgray', color:'lightgrey'}} sx={{ marginBottom: 1}}>
                                    <InputLabel>Start Position</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        is={editedMove.start}
                                        label="Count"
                                        onChange={moveSelectChange}
                                    >
                                        <MenuItem value="open">open</MenuItem>
                                        <MenuItem value="closed">closed</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'dimgray', color:'lightgrey'}} sx={{ marginBottom: 1}}>
                                    <InputLabel>End position</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        is={editedMove.end}
                                        label="Count"
                                        onChange={moveSelectChange}
                                    >
                                        <MenuItem value="open">open</MenuItem>
                                        <MenuItem value="closed">closed</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button id="galleryBtn" type="submit" variant="contained" onClick={() => {navigate("/moves/" + move.id)}} startIcon={<ArrowBackIcon/>}>Back to move</Button>
                                <Button id="galleryBtn" type="submit" variant="contained" onClick={editOnClick} startIcon={<SaveIcon/>}>Save
                                    Update</Button>
                            </Container>
                        </Box>
                    </form>
                ) : (
                <div>Loading ... </div>
            )}
        </div>

               )
}