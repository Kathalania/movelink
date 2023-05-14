import {Move} from "./Move";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React from "react";
import "./MoveCard.css"

type MoveProps = {
    move: Move
}
export default function MoveCard (props: MoveProps){

    const navigate = useNavigate()


    return(
        <div className={"move-card"}>
            <Card sx={{maxWidth: 800}} style={{backgroundColor: "#1B1E24", color: "lightgrey"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.move.name}
                    </Typography>
                    <CardMedia sx={{height: 140}}
                               image="triangle.png"
                               title="triangle"
                    />
                    <Typography variant="body1" color="lightgrey">
                        {props.move.style}
                    </Typography>
                    <Typography variant="body1" color="lightgrey">
                        {props.move.count} - count
                    </Typography>
                    <Typography variant="body1" color="lightgrey">
                        Starting position {props.move.start}
                    </Typography>
                    <Typography variant="body1" color="lightgrey">
                        End position {props.move.end}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button id="galleryBtn" type="submit" variant="contained" startIcon={<RemoveRedEyeIcon/>} onClick={() => {navigate("/moves/" + props.move.id)}}>
                        See description</Button>
                </CardActions>
            </Card>

        </div>
    )
}