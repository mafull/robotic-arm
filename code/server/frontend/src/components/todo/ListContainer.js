import React, { Component }     from "react";
import axios                    from "axios";

import {
    Header,
    Icon,
    List,
    Segment
}                               from "semantic-ui-react";

import ListElement              from "./ListElement";
import NewListElement           from "./NewListElement";


class ListContainer extends Component {
    state = {
        loading: true,

        todos: []
    };


    updateData = () => {
        this.setState({ loading: true });
        axios
            .get("/todo")
            .then(response => {
                // Generate array of todos
                const todos = response.data.map(t => {
                    return {
                        id: t._id,
                        action: t.action,
                        completed: t.completed,
                        creationTime: t.creationTime,
                        completionTime: t.completionTime
                    };
                });

                // Update the state
                const newState = Object.assign(
                    {},
                    this.state,
                    {
                        loading: false,

                        todos
                    }
                );
                this.setState(newState);
            })
            .catch(error => {
                console.error(error.response);
            });
    }


    componentDidMount() {
        this.updateData();
    }


    render() {
        const { 
            loading,

            todos
        } = this.state;

        const {
            updateData
        } = this;

        const listElements = todos.length ? todos.map(t => <ListElement {...t} key={t.id} parentUpdateData={updateData} />) : null;

        return (
            <Segment>
                <Header icon textAlign="center">
                    <Icon name="tasks" circular />
                    <Header.Content>
                        Todo List
                    </Header.Content>
                </Header>

                <Segment loading={loading} basic>
                    <NewListElement parentUpdateData={updateData} />
                    
                    <List divided relaxed>
                        {listElements}
                    </List>
                </Segment>
            </Segment>
        );
    }
}


export default ListContainer;