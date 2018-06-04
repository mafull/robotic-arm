import React, { Component }		from "react";
import {
	List
}								from "semantic-ui-react";


class ListElement extends Component {
	static defaultProps = {
		id: "",
		message: ""
	};


	render() {
		const {
			message
		} = this.props;

		return (
			<List.Item>
				{message}
			</List.Item>
		);
	}
}


export default ListElement;