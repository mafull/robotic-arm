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
            .get("/todo")
            .then(response => {
                const todos = response.data.map(t => {
                    return {
                        id: t._id,
                        text: t.text,
                        completed: t.completed,
                        created: t.created
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