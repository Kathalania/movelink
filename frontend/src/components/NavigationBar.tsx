import { Box, Tab, Tabs } from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState(location.pathname);

    const handleChange = (event: SyntheticEvent, newValue: string) => {
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
                    <Tab label="Create move" value="/addMove" />
                    <Tab label="All moves" value="/moves" />
                    <Tab label="My choreo" value="/choreo" />
                </Tabs>
            </Box>
        </div>
    );
}