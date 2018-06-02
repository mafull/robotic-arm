import React, { Component }     from "react";


class ListElement extends Component {
    static defaultProps = {
        id: "",
        text: "",
        completed: false
    };


    render() {
        const {
            id,
            text,
            completed
        } = this.props;

        return (
            <li>{text}</li>
        );
    }
}


export default ListElement;