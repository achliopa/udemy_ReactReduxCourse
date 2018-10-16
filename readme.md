# Udemy Course - Modern React with Redux by Stephen Grider

* [Course](https://www.udemy.com/react-redux/)
* [Repository](https://github.com/StephenGrider/ReduxCasts)
* [BoilerPlate Project](https://github.com/StephenGrider/ReduxSimpleStarter)

## Section 1 - An Intro to React

### Lecture 3 - The Purpose of BoilerPlate Projects

* we will download a boilerplate project: project files => tooling (transpile JSX + ES6 to ES5) => bundled code + stylesheet + index.html ready to run in browser

### Lecture 4 - Environment Setup

* we clone [boilerplate projetct](https://github.com/StephenGrider/ReduxSimpleStarter) in our course folder
* we go in and run `npm install`

### Lecture 5 - Project Setup

* we ll build a video app like youtube.
* we ll use the videos from youtube using its API.
* we ll add search functionality
* we run `npm start` it bundles and run our app
* we visit localhost:8080 our app runs

### Lecture 6 - A tast of JSX

* our index.html calls bundle.js (webpack compiled bundle)
* /src/components/app.js contains the main React Component and the render() method with JSX code
* changes are compiled on the fly by start script (webpack-dev-server)
* we delete src folder and replace it with empty src folder and add an index.js file
* react code produces html code. dummy code
```
const App = function() {
	return  <div>Hi!</div>
}
```
* we ll create an adhoc component that should produce some html  then we will add it to the DOM 

### Lecture 7 - More on JSX

* jsx cannot be interpreted by browser
* we go to babel translator to see how jsx is translated to vanilla javascript. ttranspiled is 
```
"use strict";var App=function(){return React.createElement("div",null,"Hi!")};
```
* this js is cryptic. we prefer JSX

### Lecture 9 - ES6 Import Statements

* we attempt to render in a naive fashion `React.render(app);`
* we need to import React in ES6 style `import React from 'react';`
* we need to set the react component

### Lecture 10 - ReactDOM vs React

* not needed in React16... we import ReactDOM to access render method `import ReactDOM from 'react-dom';` and use `ReactDOM.render(App);`

### Lecture 11 - Differences between Component Instances and Component Classes

* we pass a class in render and not instance... this is wrong
* when we use component Class in JSX it gets turned into component instance so it can be rendered `ReactDOM.render(<App />);`

### Lecture 12 - Render Targets

* ReactDOM.render() needs a target . where to render
* we have the root node div.contaner we can use `ReactDOM.render(<App />, document.querySelector('.container'));`
* we make App an arrow function

### Lecture 13 - Component Structure

* usually we split our app into different reusable components
* in the video app we will have:
	* search bar component
	* video view component
	* video list item compont
	* video list
	* overall app
* we make one component per file
* we add a components folder and add the empty source files

### Lecture 14 - Youtube Search API Signup

* we need an API key
* we log in to gogoogle and go to google development console
* in menu we click on API manager
* in APi library we select youtube
* we choose 'YouTube Data API v3' and enable it
* we create a new key. we need the browser key. create credentials => youtubedata, call from browser (js), public data access and get our API key
* we declare it in index.js as API_KEY `const API_KEY = 'fhsdfjsfjshkfs'`
* we need to install a pacjkage to make the request (youtube-api-search) `npm install --save youtube-api-search`

### Lecture 15 - Export Statements

* we implement the search bar component in search_bar.js in its simplest form
```
const SearchBar = () => {
	return <input />;
}
```

* we import React even if we dont use it as it is needed to compile jsx
* react components can render other components but need a reference
* so we use import/export mech in ES6 flavor `export default SearchBar;`
* we import it in index.js and use it in JSX as <SearchBar />

### Lecture 16 - Class-Based Components

* class base components can have state
* SearchBar is a functional stateless component but we need history and state. we ll make it a class based component. the equivalent is
```
class SearchBar extends React.Component {
	render() {
		return <input />;
	}
}
```
* class component must return jsx from a render() method

### Lecture 17 - Handling User Events

* events happen in UI
* we write an event handler onInputChange(event) and call it ofr onChange DOM even `<input onChange={this.onInputChange} />`
* JS in JSX? use {}
* event handler is triggered when event occurs
* in event handler we can pass a literal function `<input onChange={event => console.log(event.target.value))} />`. in this way because we use arrow function we dont have to bind this to the handler

### Lecture 18 - Introduction to State

* each class component has its state object
* to use it we need to initialize it
* the old style ES6 to do it, is through a constructor
```
	constructor(props) {
		super(preops);

		this.state = {term: ''};
	}
```
* constructor gets called when we instantiate a component

### Lecture 19 - More on State

* when we set state we use `this.setState({term: event.target.value});`
* we use state in JSX as this.state.term. it updates ont he fly (rerenders)
```
	render() {
		return (
			<div>
				<input onChange={this.onInputChange} />
				Value of input: {this.state.term}
			</div>
		);
	}
```

### Lecture 20 - Controlled Components

* a controlled field is a field whose value is controlled by the state
* when input changes it changes the state
* but the state should tell input what value it should have
```
				<input
					value={this.state.term} 
					onChange={event => this.setState({term: event.target.value})} 
				/>
```
* input is now a controlled component. its value changes when state changes

### Lecture 21

## Section 2 - Ajax Requests with React

### Lecture 22 - Youtube Search Response

* rewact uses downward flow for distributing information  through the app. so the parent component fetches information and flows it in the chiold components using props
* index.js hosts our parrent component
* we import the module `import YTSearch from 'youtube-api-search';`
* the call using the lib to do search is easy search object and then callback, here in ES5 style
```
YTSearch({ key: API_KEY, term: 'surfboards'}, function(data) {
	console.log(data);
});
```
* we get back a list of search results from youtube

### Lecture 23 - Refactoring Functional Components to Class Components

* we want to keep track of search results . this means state so we make our base component class based
* we want to put the results of the search to state. we initialize state ES6 style `this.state = { videos: [] };`
* we put search call in component puting results in state. and call it in the constructor

### Lecture 24 - Props

* we flesh out the video_list component as functional stateless
* we ll use bootstrap styling as it is included as a stylesheet in index.html
* in JSX instead of class we use className
* we import the component and add it to render
* to pass data in it from parent we use props `<VideoList videos={this.state.videos} />`
* props are passed as argument in functional cvomponents and as an object in class components

### Lecture 25 - Building Lists with maps

* 