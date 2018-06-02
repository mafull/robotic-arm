import React, { Component }     from "react";
import ListElement              from "./ListElement";
import axios                    from "axios";


class List extends Component {
    state = {
        todos: [],
        loaded: false
    };


    componentDidMount() {
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                console.log(response.data);

                const todos = response.data.map(item => {
                    return {
                        id: item.id,
                        text: item.title,
                        completed: item.completed
                    };
                });

                console.table(todos);

                const newState = Object.assign(
                    {},
                    this.state,
                    {
                        todos,
                        loaded: true
                    }
                );
                this.setState(newState);
            })
            .catch(error => {
                console.error(error.response);
            });
    }


    render() {
        const { loaded, todos } = this.state;

        const listElements = todos.length ? todos.map(t => <ListElement {...t} key={t.id} />) : null;

        return (
            <div>
                <h3>List</h3>
                {listElements}
            </div>
        );
    }
}


export default List;