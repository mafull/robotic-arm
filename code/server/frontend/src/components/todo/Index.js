import React, { Component }     from "react";
import {
    Card,
    Container,
    Header,
    Icon
}                               from "semantic-ui-react";

import ListContainer            from "./ListContainer";


class Index extends Component {
    static defaultProps = {
        cardView: false
    };


    render() {
        const {
            cardView
        } = this.props;


        const componentToRender = cardView ?
            <Card as="a"
                href="#">
                <Card.Content>
                    <Card.Header icon textAlign="center">
                        <Icon name="tasks" size="huge" circular />
                        Todo List
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Icon name="numbered list" />
                    X incomplete
                </Card.Content>
            </Card>
            : 
            <ListContainer />;

        return (
            <div>
            {componentToRender}
            </div>
        );
    }
}


export default Index;