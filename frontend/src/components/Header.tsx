import './Header.css';
import NavigationBar from "./NavigationBar";

export default function Header(){

    return(
        <div className="Header">
            <div className="HeaderContainer">
                <img src={require("../resouces/pngwing.com.png")} className="App-logo" alt="logo"/>
                <h1>MOVELINK</h1>
                <h2>Create your own vintage swing dance choreo!</h2>
            </div>
            <NavigationBar/>
        </div>
    )
}