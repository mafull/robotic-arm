import React, { Component }     from "react";
import axios                    from "axios";
import {
    Button,
    List
}                               from "semantic-ui-react";


class ListElement extends Component {
    static defaultProps = {
        id: "",
        action: "",
        completed: false,

        parentUpdateData: null
    };


    onClick = e => {
        const todo = {
            action: this.props.action,
            completed: !this.props.completed
        };

        axios
            .put(`/todo/${this.props.id}`, todo)
            .then(response => {
                console.log(response.data);
                if (this.props.parentUpdateData) this.props.parentUpdateData();
            })
            .catch(error => {
                console.error(error.response);
            });
    }


    onDelete = e => {
        axios
            .delete(`/todo/${this.props.id}`)
            .then(response => {
                if (this.props.parentUpdateData) this.props.parentUpdateData();
            })
            .catch(error => {
                console.error(error.response);
            });

        e.stopPropagation();
    }


    render() {
        const {
            id,
            action,
            completed,
            created
        } = this.props;

        const {
            onClick,
            onDelete
        } = this;

        return (
            <List.Item onClick={onClick}>
                <List.Icon name="sticky note outline" size="large" verticalAlign="middle" />
                <List.Content>
                    <List.Header style={ {textDecorationLine: completed ? "line-through" : ""} }>
                        {action}
                    </List.Header>
                    <List.Description>
                        {new Date(created).toLocaleString()}
                    </List.Description>
                </List.Content>
                <Button
                    icon="delete"
                    color="red"
                    circular
                    onClick={onDelete} />
            </List.Item>
        );
    }
}


export default ListElement;