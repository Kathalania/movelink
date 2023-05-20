import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Typography
} from "@mui/material";
import React from "react";
import useDetailChoreo from "../hooks/useDetailChoreo";
import "./ChoreoDetail.css"
import DeleteIcon from "@mui/icons-material/Delete";

export default function ChoreoDetail() {

    const {choreo} = useDetailChoreo()

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
                                justifyContent: "flex-start",
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
                                <Button id="deleteBtn" type="submit" variant="outlined" color="error" startIcon={<DeleteIcon/>}
                                        >remove from Choreo</Button>
                           </Card>
                        ))
                    }
                </Container>
                <Button id="deleteBtn" type="submit" variant="outlined" color="error" startIcon={<DeleteIcon/>}
                >delete Choreo
                </Button>
                </div>
            ) : (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
            )}
        </div>
    )
}