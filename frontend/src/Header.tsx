import NavigationBar from "./NavigationBar";
import './Header.css';

export default function Header(){

    return(
        <div className="Header">
            <div className="HeaderContainer">
                <img src={require("./pngwing.com.png")} className="App-logo" alt="logo"/>
                <h1>MOVELINK</h1>
                <h2>Create your own vintage swing dance choreo!</h2>
                <img src={require("./pngwing.com.png")} className="App-logo" alt="logo"/>
            </div>
            <NavigationBar/>
        </div>
    )
}