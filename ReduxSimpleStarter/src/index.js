import React from 'react';
import ReactDOM from 'react-dom';

const API_KEY = 'AIzaSyC0NkOYIa5Go53p_kd4SOhwgAxl3iLrM04';

// create a new component that should produce html

const App = () => {
	return  <div>Hi!</div>
}

// take component angenerated HTML and put it to page (DOM)

ReactDOM.render(<App />, document.querySelector('.container'));