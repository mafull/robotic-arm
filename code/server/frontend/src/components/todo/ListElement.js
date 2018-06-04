import React, { Component }     from "react";
import {
    List
}                               from "semantic-ui-react";


class ListElement extends Component {
    static defaultProps = {
        id: "",
        action: "",
        completed: false
    };


    render() {
        const {
            id,
            action,
            completed,
            created
        } = this.props;

        return (
            <List.Item>
                <List.Icon name="sticky note outline" size="large" verticalAlign="middle" />
                <List.Content>
                    <List.Header>{action}</List.Header>
                    <List.Description>{new Date(created).toLocaleString()}</List.Description>
                </List.Content>
            </List.Item>
        );
    }
}


export default ListElement;