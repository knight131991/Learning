import React, {Component} from "react";
import GreenCard from "./Components/GreenCard";

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello React!</h1>
                <GreenCard content=" hahahahaha" width="100px" height="100px"/>
            </div>
        )
    }
}

export default App;