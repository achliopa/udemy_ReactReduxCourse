import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
class PostsNew extends Component {
	renderField(field) {
		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input 
					className="form-control"
					type="text"
					{...field.input}
				/>
			</div>
		);
	}

	render() {
		return (
			<div>
				<form >
					<Field
						label="Title For Post"
						name="title"
						component={this.renderField}
					/>
					<Field
						label="Categories"
						name="categories"
						component={this.renderField}
					/>
					<Field
						label="Post Content"
						name="content"
						component={this.renderField}
					/>
				</form>
			</div>
		);
	}
}

function validate(values) {
// console.log(values) ->{ title: 'dsda', categories: 'dsds', content: 'dsdsds'}
const errors = {}
// validate inpouts of values
if(!values.title  || values.title.length < 3) {
	errors.title = "Enter a title"
}
if(!values.categories) {
	errors.categories = "Enter a category"
}
if(!values.content) {
	errors.content = "Enter some content"
}
// if errors is empty, the form is fine to submit
// if error has any properties, redux form assumes its invalid
return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(PostsNew);