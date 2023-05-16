import {Box, CircularProgress} from "@mui/material";
import React from "react";

export default function ChoreoGallery(){

    return (
        <Box sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', mt: 3}}>
            <CircularProgress />
        </Box>
    )
}