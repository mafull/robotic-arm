import React, { Component }     from "react";
import Todo                     from "./todo/Index";


class Main extends Component {
    render() {
        return (
            <div>
                <h1>Main component</h1>
                <Todo />
            </div>
        );
    }
};


export default Main;