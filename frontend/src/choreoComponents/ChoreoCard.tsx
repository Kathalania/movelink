import {Choreo} from "../models/Choreo";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {useNavigate} from "react-router-dom";

type ChoreoProps = {
    choreo: Choreo
}
export default function ChoreoCard(props: ChoreoProps) {

    const navigate = useNavigate()

    return (
        <div className="choreo-card">
            <Box sx={{ boxShadow: 5, width: 500, mb: 2, padding: 1}}>
                <h2>{props.choreo.name.toUpperCase()}</h2>
                {props.choreo.choreoMoves.map((move) =>
                    (<Card key={move.id}
                           className='choreo-move' style={{backgroundColor: "#1B1E24",
                            color: "lightgrey",
                            justifyContent: "start",
                            margin: 2}}>
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
                            </CardContent>
                        </Card>
                    ))}
                <CardActions style={{display: "flex", justifyContent: "center"}}>
                    <Button id="galleryBtn" type="submit" variant="contained"
                            startIcon={<RemoveRedEyeIcon/>}
                            onClick={() => {
                                navigate("/choreo/" + props.choreo.id)
                            }}>
                        See details</Button>
                </CardActions>
            </Box>
        </div>
    )
}