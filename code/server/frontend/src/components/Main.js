import React, { Component }     from "react";
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
            </Container>
        );
    }
};


export default Main;