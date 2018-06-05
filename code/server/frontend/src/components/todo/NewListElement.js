import React, { Component }		from "react";
import axios					from "axios";
import {
	Form,
	Input
}								from "semantic-ui-react";


class NewListElement extends Component {
	state = {
		sending: false,

		task: ""
	};


	onChange = e => {
		const newState = Object.assign(
			{},
			this.state,
			{ [e.target.name]: e.target.value }
		);
		this.setState(newState);
	}


	onSubmit = e => {
		this.setState(Object.assign(
			{},
			this.state,
			{ sending: true }
		));

		const data = {
			task: this.state.task,
			completed: false,
			creationTime: Date.now(),
			completionTime: Date.now()
		};

		axios
			.post("/todo", data)
			.then(response => {
				// Clear the form
				this.setState(Object.assign(
					{},
					this.state,
					{ 
						sending: false,
						task: ""
					}
				));

				// Tell the parent (list) to update
				this.props.parentUpdateData();
			})
			.catch(error => {
				console.error(error.response);
			});
	}


	render() {
		const {
			sending,

			task
		} = this.state;

		const {
			onChange,
			onSubmit
		} = this;

		return (
			<Form loading={sending} onSubmit={onSubmit}>
				<Form.Field required >
					<Input
						type="text"
						name="task"
						placeholder="Task"
						value={task}
						onChange={onChange}
						autoComplete="off" />
				</Form.Field>
			</Form>
		);
	}
}


export default NewListElement;