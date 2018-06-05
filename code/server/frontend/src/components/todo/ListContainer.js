import React, { Component }     from "react";
import axios                    from "axios";

import {
    Checkbox,
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

        todos: [],

        showCompleted: false
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
                        task: t.task,
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


    // onChange = e => {
    //     const newState = Object.assign(
	// 		{},
	// 		this.state,
	// 		{ [e.target.name]: e.target.value }
	// 	);
	// 	this.setState(newState);
    // }


    toggleCheckbox = (e, data) => {
        this.setState({ showCompleted: data.checked }, () => console.log(this.state));        
    }


    render() {
        const { 
            loading,

            todos,

            showCompleted
        } = this.state;

        const {
            updateData,
            toggleCheckbox
        } = this;

        const todosToShow = todos.length ?
            showCompleted ? todos : todos.filter(t => !t.completed)
            :
            null;
        const listElements = todosToShow ? todosToShow.map(t => <ListElement {...t} key={t.id} parentUpdateData={updateData} />) : null;

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
                    <Segment basic>
                        <Checkbox
                            label="Show completed tasks"
                            toggle
                            checked={showCompleted}
                            onChange={toggleCheckbox} />
                    </Segment>
                    
                    <List divided relaxed>
                        {listElements}
                    </List>
                </Segment>
            </Segment>
        );
    }
}


export default ListContainer;