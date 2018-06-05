import React, { Component }     from "react";
import axios                    from "axios";
import {
    Button,
    List
}                               from "semantic-ui-react";


class ListElement extends Component {
    static defaultProps = {
        id: "",
        task: "",
        completed: false,

        parentUpdateData: null
    };


    onClick = e => {
        const todo = {
            task: this.props.acttaskion,
            completed: !this.props.completed
        };

        axios
            .put(`/todo/${this.props.id}`, todo)
            .then(response => {
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

        // Prevent onClick() from being called as well
        e.stopPropagation();
    }


    render() {
        const {
            task,
            completed,
            creationTime,
            completionTime
        } = this.props;

        const {
            onClick,
            onDelete
        } = this;

        const dateToShow = 
            completed ? 
                `(COMPLETED) ${new Date(completionTime).toLocaleString()}`
                :
                new Date(creationTime).toLocaleString();

        return (
            <List.Item onClick={onClick}
                style={ completed ? 
                    {
                        textDecorationLine: "line-through",
                        fontStyle: "italic"
                    } : null
                }>
                <List.Icon name="sticky note outline" size="large" verticalAlign="middle" />
                <List.Content>
                    <List.Header>
                        {task}
                    </List.Header>
                    <List.Description>
                        {dateToShow}
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
