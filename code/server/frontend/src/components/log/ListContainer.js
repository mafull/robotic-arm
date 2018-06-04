import React, { Component }		from "react";
import {
	Form,
	Header,
	Icon,
	Input,
	List,
	Segment
}								from "semantic-ui-react";

import ListElement				from "./ListElement";


class ListContainer extends Component {
	state = {
		loading: false,

		logMessages: [],

		messageLimit: 10,
		nextMessageLimit: 10
	};


	addAndLimitMessages = (newMessages) => {
		// Add any new messages
		const updatedArray = newMessages ? 
			this.state.logMessages.concat([ newMessages ])
			: this.state.logMessages;

		// Limit the number of messages to show
		this.setState({
			logMessages: updatedArray.slice(-this.state.messageLimit)
		});
	}


	componentDidMount() {
		// Make the connection to the WebSocket
		this.wsConnection = new WebSocket("ws://localhost:3001/ws/log");

		// Handle receiving a message
		this.wsConnection.onmessage = e => {
			this.addAndLimitMessages(e.data);
		};

		// Handle the connection closing
		this.wsConnection.onclose = e => {
			const { wasClean } = e;
			console.log(wasClean);
		};
	}


	onChange = e => {
		const newState = Object.assign(
			{},
			this.state,
			{ [e.target.name]: e.target.value }
		);
		this.setState(newState);
	}


	onSubmit = e => {
		this.setState({ 
			messageLimit: this.state.nextMessageLimit
		}, () => this.addAndLimitMessages(null));		
	}


	render() {
		const {
			loading,

			logMessages,

			nextMessageLimit
		} = this.state;

		const {
			onChange,
			onSubmit
		} = this;

		const listElements = logMessages.map((l, i) => <ListElement message={l} key={i} />).reverse();

		return (
			<Segment>
				<Header icon textAlign="center">
					<Icon name="server" circular />
					<Header.Content>
						Log
					</Header.Content>
				</Header>

				<Form onSubmit={onSubmit}>
					<Input
						type="number"
						min="0"
						name="nextMessageLimit"
						value={nextMessageLimit}
						onChange={onChange}
						autoComplete="off"
						label="Log message limit" />
				</Form>
					
				<Segment loading={loading} basic>
					<List>
						{listElements}
					</List>
				</Segment>
			</Segment>
		);
	}
}


export default ListContainer;