import React, { Component }		from "react";
import axios					from "axios";
import {
	Button,
	Form,
	Input
}								from "semantic-ui-react";


class NewListElement extends Component {
	state = {
		sending: false,

		action: ""
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
			action: this.state.action,
			completed: false,
			created: Date.now()
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
						action: ""
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

			action
		} = this.state;

		const {
			onChange,
			onSubmit
		} = this;

		return (
			<Form loading={sending} onSubmit={onSubmit}>
				<Form.Group inline>
					<Form.Field required >
						<Input
							type="text"
							name="action"
							placeholder="Action"
							value={action}
							onChange={onChange}
							autoComplete="off" />
					</Form.Field>

					<Button 
						type="submit"
						circular
						icon="add"
						disabled={!action}/>
				</Form.Group>
			</Form>
		);
	}
}


export default NewListElement;