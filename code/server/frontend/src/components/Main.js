import React, { Component }     from "react";
import Log                      from "./log/Index"
import Todo                     from "./todo/Index";
import {
    Container,
    Header,
    Segment
}                               from "semantic-ui-react";


class Main extends Component {
    render() {
        return (
            <Container>
                <Header>Main component</Header>
                <Segment.Group horizontal>
                    <Todo />
                    <Log />
                </Segment.Group>
            </Container>
        );
    }
};


export default Main;