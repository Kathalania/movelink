import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./NavigationBar.css";
export default function NavigationBar(){

    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return(
        <div>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab label="Move erstellen" onClick={() => navigate("/add")} sx={{flexGrow: 1, width: '100%'}}/>
                    <Tab label="Alle Moves" onClick={() => navigate("/moves")} sx={{flexGrow: 1}}/>
                    <Tab label="Meine Choreo" onClick={() => navigate("/user")} sx={{flexGrow: 1}}/>
                </Tabs>
            </Box>
        </div>
    )

}