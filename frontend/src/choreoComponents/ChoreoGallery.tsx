import {Box} from "@mui/material";
import React from "react";
import {Choreo} from "../models/Choreo";
import ChoreoCard from "./ChoreoCard";
import {Move} from "../models/Move";

type ChoreoGalleryProps = {
    choreos: Choreo[]
    moves: Move[]
}
export default function ChoreoGallery(props: ChoreoGalleryProps){

    return (
        <Box sx={{ display: 'flex' ,flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', mt: 3}}>
            {props.choreos.map((char) => <ChoreoCard key={char.id} choreo={char}/>)}
        </Box>
    )
}