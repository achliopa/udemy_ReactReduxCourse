import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
	renderList() {
		return  this.props.books.map((book) => {
			return (
				<li 
					onClick={() => this.props.selectBook(book)} 
					key={book.title} 
					className="list-group-item"
				>
					{book.title}
				</li>
			);
		});
	}

	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		);
	}
}

function mapStateToProps(state) {
	return {
		books: state.books
	};
}

// anything returned from this function will end up as props ont he BookList container
function mapDispatchToProps(dispatch) {
	// whenever selectBook is called, the result should be passed to all reducers
	return bindActionCreators({ selectBook: selectBook }, dispatch)
}

// promote component to container. it needs to know about the new dispatch method. ,map it as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);