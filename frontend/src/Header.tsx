import logo from './logo.svg';
import {Typography} from "@mui/material";
import NavigationBar from "./NavigationBar";
import './Header.css';

export default function Header(){

    return(
        <div className="Header">
            <div className="HeaderContainer">
                <img src={logo} className="App-logo" alt="logo"/>
                <Typography variant={"h1"} style={{textAlign: "center"}} sx={{fontWeight: 100}}>MOVELINK</Typography>
                <h2>Create your own vintage swing dance choreo!</h2>
            </div>
            <NavigationBar/>
        </div>
    )
}