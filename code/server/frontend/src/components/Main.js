import React, { Component }     from "react";
import Log                      from "./log/Index"
import Todo                     from "./todo/Index";
import {
    Container,
    Header
}                               from "semantic-ui-react";


class Main extends Component {
    render() {
        return (
            <Container>
                <Header>Main component</Header>
                <Todo />
                <Log />
            </Container>
        );
    }
};


export default Main;