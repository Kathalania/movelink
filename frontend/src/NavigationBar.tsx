import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState(location.pathname);

    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
        navigate(newValue);
    };

    useEffect(() => {
        setValue(location.pathname);
    }, [location]);

    return (
        <div>
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                >
                    <Tab label="Move erstellen" value="/add" />
                    <Tab label="Alle Moves" value="/moves" />
                    <Tab label="Meine Choreo" value="/user" />
                </Tabs>
            </Box>
        </div>
    );
}