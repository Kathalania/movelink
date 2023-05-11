import React, {FormEvent, useState} from "react";
import {NewMove} from "./Move";
import {useNavigate} from "react-router-dom";
import {
    Button,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Container, Box
} from "@mui/material";

type AddMoveProps = {
    addMove: (newMove: NewMove) => void
}
export default function AddMove(props: AddMoveProps) {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [style, setStyle] = useState<string>('')
    const [count, setCount] = useState<string>('')
    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('')
    const navigate = useNavigate()

    function onClickSaveMove(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newMove: NewMove = {
            name: name,
            description: description,
            style: style,
            count: count,
            start: start,
            end: end
        }
        props.addMove(newMove)
        navigate("/moves")
    }

    return (
        <form onSubmit={onClickSaveMove}>
            <Box mt={2} mb={2}>
            <Container maxWidth="sm">
                <TextField
                    required
                    fullWidth
                    label="Move"
                    id="filled-basic"
                    variant="filled"
                    style={{backgroundColor: 'lightgray'}}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <TextField
                    required
                    fullWidth
                    label="Description"
                    variant="filled"
                    style={{backgroundColor: 'lightgray'}}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgray'}}>
                    <InputLabel>Style</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={style}
                        label="Style"
                        onChange={(event: SelectChangeEvent<string>) =>
                            setStyle(event.target.value)}
                    >
                        <MenuItem value="Lindy Hop" id="filled-basic">Lindy Hop</MenuItem>
                        <MenuItem value="Charleston">Charleston</MenuItem>
                        <MenuItem value="Solo">Solo</MenuItem>
                    </Select>
                </FormControl>

                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgray'}}>
                    <InputLabel>Count</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={count}
                        label="Count"
                        onChange={(event: SelectChangeEvent<string>) =>
                            setCount(event.target.value)}
                    >
                        <MenuItem value="4">4-count</MenuItem>
                        <MenuItem value="6">6-count</MenuItem>
                        <MenuItem value="8">8-count</MenuItem>
                        <MenuItem value="10">10-count</MenuItem>
                    </Select>
                </FormControl>

                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgray'}}>
                    <InputLabel>Start Position</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={start}
                        label="Count"
                        onChange={(event: SelectChangeEvent<string>) =>
                            setStart(event.target.value)}
                    >
                        <MenuItem value="open">open</MenuItem>
                        <MenuItem value="closed">closed</MenuItem>
                    </Select>
                </FormControl>

                <FormControl required fullWidth variant="filled" style={{backgroundColor: 'lightgray'}}>
                    <InputLabel>End position</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={end}
                        label="Count"
                        onChange={(event: SelectChangeEvent<string>) =>
                            setEnd(event.target.value)}
                    >
                        <MenuItem value="open">open</MenuItem>
                        <MenuItem value="closed">closed</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained">Save</Button>
            </Container>
            </Box>
        </form>

    )
}