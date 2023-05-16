import { Box, Tab, Tabs } from "@mui/material";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {

    const navigate = useNavigate()
    const [value, setValue] = useState(0)

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue)
    }

    return (
        <div>
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                >
                    <Tab label="Create move" onClick={() => {navigate("/addMove")}} />
                    <Tab label="All moves" onClick={() => {navigate("/moves")}} />
                    <Tab label="My choreo" onClick={() => {navigate("/choreo")}} />
                </Tabs>
            </Box>
        </div>
    )
}