import React, { Component }     from "react";
import Todo                     from "./todo/Index";
import {
    Card,
    Container,
    Header
}                               from "semantic-ui-react";


class Main extends Component {
    render() {
        return (
            <Container>
                <Header>Main component</Header>
                {/* <Card.Group> */}
                    <Todo />
                {/* </Card.Group> */}
            </Container>
        );
    }
};


export default Main;