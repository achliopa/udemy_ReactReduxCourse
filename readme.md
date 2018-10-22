s# Udemy Course - Modern React with Redux by Stephen Grider

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

* we will loop over the video data array and for each item we will create one ul element
* we use map to iterate in the array
* we implement a dummy VideoListItem component to render in map
```
const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return <VideoListItem video={video} />;
	});

	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};
```

### Lecture 26 - List item keys

* whenever we render a list in JSX from array  we need to pass a key prop (usually index)
* key is used by react to update individual items (gain speed)
* in our app we will use the etag of video as key `return <VideoListItem key={video.etag} video={video} />;`

### Lecture 27 - VideoListItems

* we work on video list item
* we can do object destructuring on props argument to save on assignemnts
* we console log video object to see the contents
* we add markup in jsx of videolistitem and styling to prepare for filling it with video properties

### Lecture 28 - Detail Component and Template Strings

* when we create a component we care if it will have state. our video detail will use an embedded player and only video info passed as props
* we add markup and an iframe for embedded video
* to embedd youtube video we need the url
```
	const videoId = video.id.videoId;
	const url = `https://www.youtube.com/embed/${videoId}`;
```
* we pass the url as src to iframe

### Lecture 29 - Handling Null props

* we import video-detail in index.js add it to jsx and pass in as prop the first video returned by the search.
* we cannot render and get a null error. this is because the state is initialized empty. till we populate the list with the async request the page renders empty (null)
* we need react lifecycle methods
* as a wrokaround we add if logic int he video detail render function
```
if(!video) {
		return <div>Loading...</div>
	}
```

### Lecture 30 - Video Selection

* we will add the concept of selected video in app component state. this will be passed in video detail component. 
* we initialize it null and give it a default val when our api request returns...
* we will now implement a callback that will be passed from parent component to child so that we canuse it to select a video
* each state change causes rerender (only for what is changed) `onVideoSelect={selectedVideo  =>  this.setState({selectedVideo})}`
* we pass it through video list to videolistitem as prop `onVideoSelect={props.onVideoSelect}`
* in video list item we finally call the callback inside the onClick event handler `<li onClick={() => onVideoSelect(video)} className="list-group-item">`
* passing callbacks works in shallow tree struct . more than 2 levels it becomes problematic to debug

### Lecture 31 - Styling with CSS

* we add styling in /style/style.css

### Lecture 32 - Searching for Videos

* we will follow a similar pattern with selectedVideo for the searchBar using a callback
* when we use the searchbar we will setstate
* we implement the callback at toplevel moving in the ytsearch
```
	videoSearch(term) {
		YTSearch({ key: API_KEY, term}, (videos) => {
			this.setState({
				videos,
				selectedVideo: videos[0]
			});
		});
	}
```
* we pass it as prop to SearchBar `<SearchBar onSearchTermChange={term => this.videoSearch(term)}/>`
* in search bar we make an empty hangdler where we call the callback
```
	onInputChange(term) {
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
```
* in Jsx we call the handler on the event `onChange={event => this.onInputChange(event.target.value)} `
* now we search in every keustroke. we want to delete that

### Lecture 33 - Throttling Search Term Input

* we wwill use lodash and use a function to throttle how fast a function runs
* we install it `npm install --save lodash` and import it `import _ from 'lodash';`
* we ll use it to pass a debounced method on callback `const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);`
* we pas sthis in component `<SearchBar onSearchTermChange={videoSearch}/>`

### Lecture 34 - React Wrapup

* callbacks are used when we dont use redux. redux replaces them
* react state is component based

## Section 3 - Modeling Application State

### Lecture 36 - What is Redux

* app container for js apps
* traditional MVC puts a  lot in C part while keeping M and V clean
* redux makes C predictable and clean making better app

### Lecture 37 - More on Redux

* Redux is the Data - React is the View. our app is the C
* redux is a state container of the app. it contains all the data. also has meta level properties of the data
* all data has all data in an object called state
* in a counter app reux keeps track of the counter

### Lecture 38 - Even More on Redux

* the most important in a redux app is how to design the app state
* tinder is a good example for redux 
* the tinder model is as follows:
* Data contained in the application: 
	* users (images and chat logs)
	* list of current users with a conversation
	* list of users to be reviewed
	* currently viewed conversation
	* currently viewed user for image swiping
* Views contained in the app
	* Image card
	* conversationList (list of open conversations
	* textlist (list of conv chat messages))
	* like/dislike buttons
	* textitem (individual message)
* Our app logic
* each view uses different parts of state (data)

## Section 4 - Managing App State with Redux

### Lecture 40 - Reducers

* we clone the boilerplsate project  and run `npm install in it and start it `npm start`
* reducers are core concept in redux. it is a function that returns a piece of application state
* we can have many reducers for each piece of state
* for a book app we could have a list of books and the currently selected book each with each own reducer
* in /reducers folder we add a new file 'reducer_books.js'
* we implement a naive function as reducer returning an array of books
* in reducrs/index.js we build the state by combinng reducers so we explicitly say that the books: element will come from booksReducer
```
const rootReducer = combineReducers({
  books: BooksReducer
});
```
* we import it `import booksReducer from './reducer_books';`

### Lecture 41 - Containers: Connecting Redux to React

* we try to use state in our app (view). 
* in /componsnts we add a new react component file 'book-list.js' as a class component
* we assume that books list will pass from redux state as a prop and use it to render a list of book names
```
export default class BookList extends Component {
	renderList() {
		return  this.props.books.map((book) => {
			return (
				<li key={book.title} className="list-group-item">{book.title}</li>
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
```
* we need to pass the redux state in react. we use react-redux lib for that. 
* its installed so we import it
* we also have to promote a react component to a container (smart component) with alink to redux state
* usually we put containers in a separate folder from components. we move there book_list.js

### Lecture 42 - Containers Continued

* we turn a component to a container when is the most top level component that needs redux  state to show content. in our app book_list cares for books array and book_detail for the selected book

### Lecture 43 - Implementation of a Container Class

* we import booklist in app.js and use it in jsx
* in book-list.js we import connect from 'react-redux' `import { connect } from 'react-redux';`
* the connection is done via methods out of the class. 'mapStateToProps' takes state and maps it it into props. what it returns it is in the component props
```
function mapStateToProps(state) {
	return {
		books: state.books
	};
}
```
* what makes a component a container is the connect method which is passed in export as wrapper `export default connect(mapStateToProps)(BookList);`
* when state changes props also change and rerender happens

### Lecture 45 - Actions and Action Creators

* we want to gain control over the list of books in the state
* changing redux app state is done through actions created by action creators.
* the flow is:
	* In React Component: User clicks Book2
	* Event handler calls action creator
	* Action Creator returns an action
	```
	function(return {
		type: BOOK_SELECTED,
		book: {title: 'book2'}
	})
	```
	* action object is sent to all reducers
	* reducer based on action (using switch statement) alters state based on the data paased in the action object apart from type
	```
	switch(action.type) {
		case BOOK_SELECTED:
			return action.book;
		default:
			//do nothing
			return currentState;
	}
	```
	* activeBook state property is set to the value returned by the reducer
	* all reducers have processed the action and reutned new state. new state assembled. 
	* containers are notified of the changes to the state.
	* on notification containers rerender with new props

### Lecture 46 - Binding Action Creators

* in /actions/index.js we will write our action creators
* our first action creator is `selectBook(book){}` 
* we need to wire it to the react component. we import it in book-list and the bind from redux
```
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';
```
* we also add a function to map dispatch to props (map action creator to a prop callback)
```
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectBook: selectBook }, dispatch)
}
```
* we add this map to connect wrapper of container `export default connect(mapStateToProps, mapDispatchToProps)(BookList);`
* dispatch funnels action creator of bind to all reducers
* in map objeect key is the prop and value the action creator

### Lecture 47 - Creating an Action

* we have a dummy action creator bound to the container (book-list)
* we add a clickevent handler to the li of booklist `onClick={() => this.props.selectBook(book)} `
* we test and see the consolo log . binding works
* our action creator should retturn a meaningful action abject
```
export function selectBook(book) {
	// select book is an action creator needs to return an action
	// object with a type property
	return {
		type: 'BOOK_SELECTED',
		payload: book
	};
}
```

### Lecture 48 - Consuming Actions in Reducers

* we need a new reducer for active book 'reducer_active_book.js'
* reducers always get passed 2 params. state and action objects
* state is not the app state. only the state thsi reducer is responsible for
* essentially this means the piece of app state this reducer is responsible for
* we need a base case to return the state unchanged
* we need to handle the case that user does not select a book at start. state will be undefined which will throw an error. we default it in null
* we sould always return a fresh object not manipulate state in teh reducer
```
export default function(state = null,action) {
	switch(action.type) {
		case 'BOOK_SELECTED':
			return action.payload;	
	}
	
	return state;
}
```
* we add the reducer to the rootReducer and state

### Lecture 49 - Consuming Actions in Reducers Continued

* we will add bookdetailed view as a react component. it will be a container to consume app state /containers/book-detail.js

### Lecture 50 - Conditional Rendering

* we ll printout the title of the selected book. w euse the container props (mapped state) in JSX rendering
* we get an error as state activebook is null at render time (no selection) . we defaulted it to null in reducer. this happens at bootup
* we use component lifecycle methods or add if statement in render (conditional rendering)
* we still get the dispatch error on click
* we need to add dispatch as second argument in mapdispatchtoprops
```
// anything returned from this function will end up as props ont he BookList container
function mapDispatchToProps(dispatch) {
	// whenever selectBook is called, the result should be passed to all reducers
	return bindActionCreators({ selectBook: selectBook }, dispatch)
}
```
* we add a length ofd book in reducer

### Lecture 51 -  Reducers and Actions Review

* redux manages app state
* app stat eis an object
* app state is different from component state
* reducers combined control state through actions
* actions are created from action creators
* action creators are dispatched from react components (containers)

## Section 5 - Intermediate Redux: Middleware

### Lecture 52 - App Overview and Planning

* we will learn how to make async calls with redux
* our app will be a weather forecoast app. we will search for a city. when we click the city we will submit the query toi a 3rd party API. when we get back data we will show the forecast for next five days as a chart
* each search will add a row (city)
* challenges:
	* async api requests from redux
	* charts: use 3rd party react component
	* our app state changes over time a lot
* we start again with boilerplate

### Lecture 53 - Component Setup

* we npm install and npm start
* we break our App into visual components aka React components
	* app => searchbar, forecastlist
	* forecastlist => chart
* forecastlist andforecastlistitem will be in the same component
* we start with the searchbar. component or container? ti will modify state dispatching actions so container. we add the sf in /containers/search_bar.js
* we add a form in jsx and import the component in app.js

### Lecture 54 - Controlled Components and binding Context

* we will turn input into a controlled field with its value set by the component state
* we initialize state in contructor and wire up input element
```
				<input 
					placeholder="Get a five-day forecast in your favorite cities"
					className="form-control"
					vlaue={this.state.term}
					onChange={this.onInputChange}
				/>
```
* we implement the event handler as a separate function
```
	onInputChange(event) {
		console.log(event.target.value);
		this.setState({term: event.target.value})
	}
```
*  browser complains. this is undefined in the handler. we need to bind it in constructor `this.onInputChange = this.onInputChange.bind(this);`
* we dint have this error because we implemented handlers as arrow functions 

### Lecture 55 - Form Elements in React

* we click submit. input clears and page refresh. this is defualt html not react
* we add an event handler to form to fix that preventing default behaviour `event.preventDefault();`

### Lecture 56 - Working with APIs

* we will use a cloud API to fetch weather data [openweather](http://openweathermap.org/forecast5)
* the api call as stated in the site is `api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={APIKEY}`
* it requires the api key. we select the free plan signup and get the key
* we save the key in /actions/index.js

### Lecture 57 - Introduction to Middleware

* in the typical action flow cycle in redux app middleware adds one more step
* when action creator returns the action to be consumed by the reducer middleware intercepts it and: lets the action pass, manipulates it or stops it altogether
* the midddleware we will use is redux-promise. it will help us handle ajax requests from redux `npm install --save redux-promise`
* in /src/index.js that is the base app sourcefile we import it `import ReduxPromise from 'redux-promise';`
* in `const createStoreWithMiddleware = applyMiddleware()(createStore);` we pass ReduxPromise as middleware

### Lecture 48 - Ajax Requests with Axios

* we will dispatch an action with an action creator to make the ajax request using axios
* in /actions/index.js we add the fetchWeather() action creator and export it.
* instead of using string for ACTION TYPE we use a pram exported to be used by the reducer for filtering `export const FETCH_WEATHER = 'FETCH_WEATHER';`
* in action object we pass the api call url which we build
```
import axios from 'axios';
const API_KEY = '58a30bcba668373fcd73d7a1220943a4';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
	const url=`${ROOT_URL}&q=${city},gr`;
	const request = axios.get(url);
	return {
		type: FETCH_WEATHER,
		payload: request
	};
}
```
* we install axios for making ajax call

### Lecture 59 - Redux-Promise in Practice

* we want to call the action creator anytime the user submits the searchbar form
* we follow the drill transformingthe component into container and binding the action using mapDispatchtoProps
* we test it in browser . in dev tools network we see the reply

### Lecture 60 - Redux-Promise Continued

* we will add a reducer to handle fetchweather action, wire it to rootreducer and console.log the request passed as action payload and action object in reducer
* the payload is the return of the axios.get() which is a promise
* the action object contains the returned data of the promise
* redux-promise worked. intercepted and handled the promise geting the data
* redux-promise when it sees the promise stops it handles it and creates a new action passing in the data as payload. SWEET

### Lecture 61 - Avoiding State Mutations in Reducers

* we want to store action.payload.data.list containing the forecasts
* in our view we will have multiple cities forecasts so in our state we will store a list
* our initial state becomes []
* we add a switch statement in reducer
```
	switch(action.type) {
		case FETCH_WEATHER:
			return [action.payload.data];
```
* we return an array because we expect multiple cities in state
* when user clicks in another city the array will overwrite. we arr not appending to the array
* the easy way `return state.push(action.payload.data)`manipulates state an is an ANTIPATTERN
* we need to return a new array (new state) `return state.concat([action.payload.data])` in ES6 style it is writtern `return [action.payload.data, ...state];` as a flattened array

### Lecture 62 - Building a List Container

* we need a new react component to render the list of cities. it will need access to redux state so its a container. we name its sf weather_list.js
* for start we render a static table and import the component to app and add it to jsx
* to fill the rows of the list table we need the values coming from the axios call currently in state
* we need to bind state to props

### Lecture 63 - Mapping Props to a Render Helper

* props.weather coming from state contains an array of objects
* each element has a city and a list. all we need is map them to jsx
* we ll do it in a render helper which we call from map function `{this.props.weather.map(this.renderWeather)}`
* our first version of renderhelper
```
	renderWeather(cityData) {
		const name = cityData.city.name;

		return (
			<tr key={name}>
				{name}
			</tr>
		);
	}
```

### Lecture 64 - Adding Sparkline Charts

* for charts we will use [react sparkline](https://github.com/borisyankov/react-sparklines)
* using it is easy
* weather.map will produce one row for each city. in it we have a list of days each day is an object with the measurements.
* for charts we need to extract the measurements in their own array to pass to charts for rendering
* first we assemble our data pulling out the arrays using map `const temps = cityData.list.map(weather => weather.main.temp)`
* we install library `npm install --save react-sparklines` and impor it in WeatherList `import { Sparklines, SparklinesLine } from 'react-sparklines';` and use it 
```
					<Sparklines height={120} width={180} data={temps}>
						<SparklinesLine color="red" />
					</Sparklines>
```

### Lecture 65 - Making a Reusable Chart Component

* we want to make a chart from pressure and humidity. to avoid writing the same component 3times well try to keep it DRY and make a reusable component chart.js
* this component will hav eno state . it will just use the props passed to render so its a functional
```
export default ({data, color}) => {
	return (
		<div>
			<Sparklines height={120} width={180} data={data}>
				<SparklinesLine color={color} />
			</Sparklines>
		</div>
	);
}
```

### Lecture 66 - Labeling of Units 

* we ll add a line in the chart showing the average and a number underneath each chart with the average for the 5 days
* to calculate a numeric average we take data and calculate an average
* we pass units as prop

### lecture 67 - Google maps Integration

* we need to add markup to style charts as the y differ in size
* in style.css we add css. to fix svg sixzing `svg {height: 150px;}`
* instead of showing the city name we will add googlmaps with the city centered
* we ll make a separate reusable component for google maps rendering
* in our boilerplate project main html googlemaps api is  included in markup
* so at any time we can reference it in our code as `google.maps`
* this breaks the pattern of adding functionality with components
* now we add a lib that has no idea how to work with react
* in ur render we add `<div ref="map"></div>` anytime in our code we reference this.refs.map we will reference this element so its a js hook
* the component code is 
```
class GoogleMap extends Component {
	componentDidMount() {
		new google.maps.Map(this.refs.map, {
			zoom: 12,
			lat: this.props.lat,
			lng: this.props.lon
		})
	}
	render() {
		return (
			<div ref="map"></div>
		);
	}
}
```
* we use a component lifecycle method to add the map when the component renders on screen. this is because the jsx reference will not exist in html before (aka dynamic rendering)

### Lecture 68 - Google Maps Integration Continued

* the previous trick is a way to integrate react with 3rd party non react libs
* we add the component in weatherlist
* city object wwe get from openweather contains coordinates which we pass a sprops
* we style the map with css

## Section 6 - React Router + Redux Form

### Lecture 70 - App Overview and Goals

* we need to add post requests to remote servers and add routing in our app (multiple screens) 
* load relevant data from backend depending on users page
* the app we will build to explore these topics
* we willbuild a simple blogging application , typical RESTful routes
* no styling 
* the index view will show all our posts '/'. when we click on post we will see the show page 'posts/<id>'
* we will have a 'posts/new' for adding a new post
* we again use the boilerplate project as base and name it /postApp

### Lecture 71 - Posts API

* we want to save and retrtieve posts in a remote API (backend)
* the BlogPOstAPI is implemented and will connect to it with AJAX
* we go to [dtephens redux blog](https://reduxblog.herokuapp.com) there we can see the API description
* we use postman to test the api
* we create anew post eith a POST req to `http://reduxblog.herokuapp.com/api/posts` with raw body (Json)
```
{
  "title": "Hi!",
  "categories": "Computer, Friends",
  "content": "Blog post content"
}
```
* we need to add a unique key in our request `http://reduxblog.herokuapp.com/api/posts?key=sakis`
* we get back the id
```
{
    "id": 291418,
    "title": "Hi!",
    "categories": "Computer, Friends",
    "content": "Blog post content"
}
```
* we fetch with GET to /api/posts/291418?key=sakis

### Lecture 73  - Installing React Router 

* we install react-router for webapp (browser) `npm install --save react-router-dom@4.2.2`
* we use react-router to add pages to our singlepage app without refreshing.

### Lecture 74 - What React Router Does

* in traditional apps when we click we get a new webpage (new html)
* in react (fronetnd rendering) we have all bundled up and sent upfront. html is sent upfront and is same. js rerenders parts. in render time the flow is:
	* user changes the url
	* History gets notified that user changed the URL (new one passed)
	* ReactRouter gets the new URL
	* ReactRouter updates the react components shown on screen, depending oin url
	* React gets the components it needs to render
	* Content is shown on screen

### Lecture 75 - The Basics of React Router

* we launch our boilerplate project
* we open index.js
* we want to add 2 routes to router and change content based on the route user selects
* we add 2 mockup components for testing
* we import `import { BrowserRouter, Route } from 'react-router-dom';` 
* BrowserRoute listens to browser route for new routes from user
* Route is the core compoonent as conditionaly renders a component inside another component
* BRowserRoute talks to the History lib
* browserouter wraps routes
* route component gets 2 props: path (relative url) and compoennt (the react component to render)
```
    <BrowserRouter>
    	<div>
    		<Route path="/hello" component={Hello} />
    		<Route path="/goodbye" component={Goodbye} />
    	</div>
    </BrowserRouter>
```
* we can mix react components with router

### Lecture 76 - Route Design

* our app will have the following routes:
	* root route '/' to show a list of posts and an add post button `<Route path="/" component={PostIndex} />`
	* view post route '/posts/<id>' to show a specific post `<Route path-"posts/:id" component={PostsShow} />`
	* add post route '/posts/new' to show the add post form `<Route path-"posts/new" component={PostsNew} />`

### Lecture 77 - Our First Route Definition

* we ll start with the first screen for root route '/' implementing a barebone react component PostsIndex in /src/components/posts_index.js
* we cleanup index.js. delete App import and import our new component and add it to BrowserRouter as ` <Route path="/" component={PostsIndex} />`
* we test it in breowser

### Lecture 78 - State as an Object

* following the state pieces approach from booksApp we will end up with posts (array) and activePost (object) state properties
* the activePost property is important for the PostShow page
* the url a user visits is closely related to app state. when we visits url we need to feed with new data and rerender the page
* the id user passes plays the same role as the activePost
* we dont need activeState. we will use post araay index as activePost
* when user visits posts/:id we will use the id so that component will render the ite, from posts array in state
* it makes sense to store the list of posts in an object where the key will be the id and the value the object. in that way it will be easier to fetch apost among all the posts. in an array we would have to search in the array

### Lecture 79 - Back to Redux - Index Action

* we implement the first action creator in /actions/index.js to fetch a list of posts and feed it in the PostsIndex component
* we will use axios and redux -promise like in our previous app to make api calls from our actions
* we wire up redux-promise as a middleware in our redux app
* we import axios in the action creator file
```
export function fetchPosts() {
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	return {
		type: FETCH_POSTS,
		payload: request
	};
}
```

### Lecture 80 - Implementing Posts Reducer

* our goal in the reducer is to return an object manipulating the array that gets returned by the API reply
* lodash has a helper function mapKeys. we pass the array and give the name of the param that it will use as key to build the object of key value pairs for each array element `return _.mapKey(action.payload.data, 'id')`

### Lecture 81 - Action Creator Shortcuts

* we convert PostsIndex into a container  `export default connect(null, { fetchPosts })(PostsIndex);`
* the above systax is equivalent with using mapDispatchToProps
* we will call action creator in component lifecycle method componentDidMount)( when component first renders on screen and only once)
* we test in browser and confirm at XHR requests in network tab of chrome dev tools that ajax request gets fired

### Lecture 82 - Rendering a List of Posts

* we add some code to show a list of posts to the user
* we add some posts with postman. so it gets populated
* now our app when rendering fires the api req and result is coming back . we test in devtools
* we add the state to the index props using mapStatetoprops to use the props object
* we add a console log to render() it appears 2 times one empty and one full
* didmount is the first time where we go and fetch data (empty) then data pass to state to props causing rerender (we got data)
* to render the list we add a render helper using the lodash map to map through the object with id keys
```
	renderPosts() {
		return _.map(this.props.posts, post => {
			return (
				<li className="list-group-item" key={post.id}>
					{post.title}
				</li>
			);
		});
	}
```

### Lecture 83 - Creating new Posts

* we want to be able to add posts without postman
* our workflow is:
	* scaffold Postsnew component
	* Add route configuration
	* add navigation between index and new
	* add form to PostsNew
	* Make action creator to save post
* we add the new component in /components/posts_new.js
* we import it in index.js and add it inside the BrowserRoute UNDER the '/'
* this wont work as '/' is more general so router renders it when visiting 'posts/new'

### Lecture 84 - A React Router Gotcha

* react route matches lazily so if a path satisfies the condition of URI it renders. its like using a wildacrd after each route path prop
* we can fix that puting the most specific routes on top and wrapping routes in <Switch></id>Switch> inside browserrouter

### Lecture 85 - Navigation with the Link Component

* we will add navigation between routes using the lInk component (much like <a> tag)
* we add it to index page jsx
```
				<div className="text-xs-right">
					<Link className="btn btn-primary" to="/posts/new">
						Add a Post
					</Link>
```
* navigation is done with 'to' prop where we spec the path
* Link is behind the scene an anchor tag. link prevents browser to do normal work

### Lecture 86 - Redux Form

* [Redux form](https://redux-form.com) is a good way of building form that integrate well with Redux
* we install it as an npm package `npm install --save redux-form@6.6.3`
* redux-form uses the app state so we add it to the rootReducer
* what we gain is ease of use (save on action creators)
* we import it in global reducer file `import { reducer as formReducer } from 'redux-form'; ` and add it as form piece of state `form: formReducer`

### Lecture 87 - Setting Up Redux Form

* using redux-form workflow:
	* identify different pieces of form state
	* make one Field component pewr piece of state
	* user changes a Field input
	* redux form automatically handles changes
	* we validate inputs and handleform submittal
* in our prroject we have 3 pieces of state title, categories and content
* in postsnew component we import  Field and reduxForm from redux-form
* reduxForm is a method similar to connect() method from react-redux it enables componet to talk to redux store. the way to use it is similar
```
export default reduxForm({
	from: 'PostsNewForm'
})(PostsNew);
```
* the config object at least takes the name of the form (to allow muliple forms in a page)
* using same name for different components it cause a merge of form state for both

### Lecture 88 - The Field Component

* the name prop of field tells what piece of form state it represents
* in Field we add a component prop where we pass a method
* Field component does not know how to render on screen only how to interact with redux form.
* with the component method we pass in a JSX blob helping it to figure out how it will render on screen is like a render() method
* in the render() method we add JSX and  html form fields. we need to make a connection between this element and the Field component that is responsible for handling each events
* field jsx
```
<form >
					<Field 
						name="title"
						component={this.renderTitleField}
					/>
				</form>!
```
* render() method
```
	renderTitleField(field) {
		return (
			<div>
				<input 
					{...field.input}
				/>
			</div>
		);
	}
```
* the {...field.input} says that all field.input tags to be passed as props to the <input /> tag
* in input we can add the styling

### Lecture 89 - Generalizing Fields

* we test and it works
* to style we add markup in render()
* to add more fields we add more field components
* we see  render() method content repetition so we try to keep it dry
* we dont have to add more arguments in the common render method. we can add them to the Field property and they will be passes with field input object
* it becomes very easy to add more fields

### Lecture 90 - Validating Forms

* we need to add some validation. doent submit the form and throw error message if a field is empty
* we add a validate() method out of the compoennt and also add it in the config object of reuxForm so that it is called on submit
* valitate() takes an input objet 'values' which contains all the vlaues the user has entered in the form pieces
* to validate it returns an error object to notify on errors
```
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
```

### Lecture 91 - Showing Errors to Users

* we ll display validation message
* the error object is available at field component render method as `{field.meta.error}`
* to which atribute of error object we refer depends on the name pro pf the Field

### Lecture 92 - Handling Form Submittal

* we add a button for submitting a form in <form> `<button type="submit" className="btn btn-primary">Submit</button>`
* we see that errors appear right away when we render the form
* we want to handle form submittal in redux-form
* till now we have seen how redux-form handles the state of the form
* it does not handle form submittal
* we have wired up redux-form to the Postnew component. this extends the Postnew adding new props. 'handleSubmit(callback())' method is one of them. 
* handleSubmit takes care that all redux-form conditions are satisfied and when it resolves its ready to submit itr call our callback to handle submit
```
render() {
		const { handleSubmit } = this.props;
		return (
				<form  onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
				...........
```
* we pass this.onSubmit binding this as the callaback will be called outside the component context
* our callback implementation gets not event like usual but values as argument
```
	onSubmit(values) {
		console.log(values);
	}
```

### Lecture 93 - Form and Field States

* when we render form we see the errors
* we want to show errors when user types and then tabs out
* there are 3 states of the form (field level): 
	* pristine: first render
	* touched: user focused input and focused out
	* invalid: got errors
* in Field component render method we show meta.error regardless of state
* we add a terniary statemtn `{field.meta.touched? field.meta.error : ''}` checking for touched (state property)

### Lecture 94 - Conditional Styling

* we add styling based on error. we use build0in bootstrap
* to make text appear red we add class "text-help"
* to add red border we add class "has-danger"
* we need to make border color conditional when field is touched and there is an error
* we do it by making the css class string using string interpolation ES6 style and conditional logic `const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}``
* to do 2 level deep object destucturing we do `const {meta: { toched, error }} = field`

### Lecture 95 - More on Navigation

* we ll add a button to go back to post list. we used Link tag to navigate between routes
* we style in stylesheet links are seelcted in css as anchor tags

### Lecture 96 - Crete Post Action Creator

* on submit eevent handler will be called with an object called values
* we want to post them to the backend
* we need to call an action creator to call an axios req and use redux-promise middleware to extract reply
```
export function createPost(values) {
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)

	return {
		type: CREATE_POST,
		payload: request
	}
}
```
* we make PostsNew a container and add the action binding (dispatch)
* reduxForm has been used like connect as a binding wrapper
* we use reduxForm as external wrapper and connect as internal
```
export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null,{ createPost})(PostsNew)
);
```
* we add it in the handler test it in broswer and see the api reply in devtools=> network > XHR
```
	onSubmit(values) {
		this.props.createPost(values);
	}
```
* we see two requests the foirst is OPTIONS type. this si a CORS request
* second is POST and reply is ok
* we want redirection to list of posts after submit

### Lecture 97 - Navigation through Callbacks

* the flow we want:
	* user submits the form
	* validate form
	* call onSUbmit
	* call an action creator to make API request
	* wait... (async call)
	* after success navigate the user to post list
* Link tag wont do the trick (requires click). we want programatic navigation
* for programmatic navigation redux-route uses props passed to the component. these are passed automatically
* we make use of props.history for programatic navigation. we do it with `this.props.history.push('/<path>')`
* to make sure it gets called if post request finishes successfuly we pass it as secont argument to the action as callback
```
		this.props.createPost(values, ()  => {
			this.props.history.push('/');
		});
```
* in the action creator we call the callback inside the promise resolve method .then()
```
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)
		.then(() => callback())

```

### Lecture 98 - The Posts Show Component

* show post details in a separate view
* we add new component file posts_show.js make it a class component and add boilerplate code. we export it and import it in index.js and add it in routes as `<Route path="/posts/:id" component={PostsShow} />` we use a windcard as :id. whatever we pass in as :id in path will pass in PostsShow as a prop with name id
* we put it after posts/new in routes order as its more generic.

### Lecture 99 - Receiving new Posts

* putting together the show page has to do with how we load our data in the application
* if user visits root route fiirst we call the fetch posts action creator to load our list of posts. then our posts state will contain all posts
* if user visits our app manually directly in a show page say /posts/2 ideally we should fetch only that post.
* as user can land in nay page postShow should fetch its own data. it should not rely that fetch post has been called and the list of posts in app state is full
* so we add a new action creator to fetch an individual post `const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);`
* we add the actiont o reducer . what we want to do in the reducer is to make sure the posts list object has the post with the given id in it (to use it for rendering) in ES5 we would do
```
const post = action.payload.data
const neeState = { ...state };
newState[post.id] = post;
return newState;
```
* in ES6
```
return { ...state, [action.payload.data.id]: action.payload.data };
```
* we are doing key interpolation

### Lecture 100 - Selecting from OwnProps

* we add the action creator in PostsShow component and wire the action creator
* we put the action creator in componentDidmount lifecycle method. so we fetch the value in first render and show it in render() using mapstatetoprops to get post from state
```
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
```
* we use this.props.match.params.id to get id from :id passes in path. match.params will contain all wildcards passed in teh route url
* we want to pass only the post of id into the props. in mapStateToProps we can pass a second argument after state called ownProps. it is the props object used by the component
* we do this because we are outside the component so 
```
function mapStateToProps({posts}) {
	post: posts[this.props.match.params.id]
}
```
* wont work
* we use 
```
function mapStateToProps({posts}, ownProps) {
	post: posts[ownprops.match.params.id]
}
```
* instead

### Lecture 101 - Data Dependencies

* we fill jsx in render using prop
* we get an error as we try to use the post prop before it is available as render() is called immediatley and then when state changes. w e need conditional rendering

### Lecture 102 - Caching Records

* we add a Link to rooth route
* we need to add the ability to click on a list item and go to a specific post wraping it with a lInk tag
* in this case we have already th epost list but we refetch an individual post from backend.
this is unecessary
* if we dont want to eagerly fetch posts we add conditional logic in compponentdidmount() in postsShowwhere we fetch data
```
		if(!this.props.post) {
			const { id } = this.props.match.params;
			this.props.fetchPost(id);
		}
```
* when we fetch an individual post and then go back to the list. we see this item in list and then whjen fetch resolves we see all

### Lecture 103 - Deleting a Post

* we add a delete post button in postshow page
* we add an onclick handler trhre we call an action passinf the id
* the id we get from route path params not from the state prop id. (dont like it)
* we implement the action creator. in the action object we pass only the id to reducer
* we need to reroute to index after deleting so we pass a callback to programmaticaly reroute

### Lecture 104 -  Wrapup

* we rely on the fetch_posts to get a fresh list of posts after we delete it
* so we move the full list back and forth
* in the reducer we manipulate state to remove without refetching
* in tehr educer we remote the post from state by id with `eturn _.omit(state, action.payload)`.. it returns a new state rejectingthe post by id. this makes app more smooth. as it removes the glitch

## Section 7 - Bonus: RallyCoding

### Lecture 106 - Basics of Redux Thunk

* redux is used to maintain control on app state
* the flow: component -> action creator -> action -> middleware -reducer -state->component works wee for syncronous operations
* when we fetch data from other systems using async calls there is problem
* we use redux thunk then. it gives us control over the dispatch method
* dispatch maintains state over the 3 last stems of the flow after action is created
* its a funnel collection actions and passing them to reducers
* in plain redux it expects the action creator to return an action
* redux thunk allows action creator to return a function passing in dispatch method. 
* in the return method we can wait our async return request to resolve and THEN to dispatch an action... so we are interceptiung the  dispatch method
```
export function  fetchUsers() {
	const request = axios.get('path');

	return (dispatch) => {
		request.then(({data}) => {
			dispatch({ type: FETCH_USERS, payload: data})
			})
	}
}
```
* ReduxThubk is a redux middleware and sees the action creator returns a method. seizes control and invokes the method.
* when all is resolved the dispatch is called and the flow continues

### Lecture 107 - Combining Redux and Firebase

* there is a lib reactfire to inject firebase data into components. this is not ok for redux
* a BAD ARCHITECTURE: firebase <-> reactfire <->React<->Redux (2 state storages)
* a GOOD ARCHITECTURE: React<->Redux<->Firebase (REDUX contols state)
* Firebase flow: firebase works with data references. when data change it emits events (if we choose to subscribe)
* the solution if we choose to subscribe to firebase data? make an action creator which will listen for firebase ref events. so anytime there is a change the action creator will change the redux stte keeping it in sync
* a demo impleemntation of such a action creator using thunk
```
import Firebase from 'firebase';
const Posts = new Firebase('URL');
export function fetchPosts() {
	return dispatch => {
		Posts.on('value', snapshot => {
			dispatch({
				type: FETCH_POSTS,
				payload: snapshot.val()
				});
			})
	};
}

export function deletePost(key) {
	return dispatch => Posts.child(key).remove();
}
```
* when we remove in firebase we get a change event to where we have subsribed with fetch action

### Lecture 108 - Dynamic Forms with Redux Form

* redux form has an issue. render mthod has a lot of repetiotion. same the validate() method
* to refactor and make it maintenable
* we import lodash lib
* in export we have our form params definition which dictrates athe whole form (one field per param). we set it as global const along with params
```
const FIELDS = {
	title: {
		type: "input",
		label: "Title for Post"
	},
	categories: {
		type: "input",
		label: "Enter some categories for this post"
	},
	content: {
		type: "textarea",
		label: "Post Contents"
	}
};
```
* then we use it
```
export default reduxForm({
	form: 'PostNew',
	field: _.keys(FIELDS),
	validate
})(PostNew)
```
* we can refactor the validate()
```
function validate(values) {
	const errors = {};

	_.each(FIELDS, (type,field) => {
		if(!values[field]) {
			errors[field] = 'dsds'
		}
		})
}
```

* refactor the render in a helper method
```
renderField(fieldConfig, field) {
	const fieldHelper = this.props.fields[field];

	return (
	<div>
		<label for="">
		<input type="text"></label>
		<div></div>
	</div>
	);
}
```

### Lecture 109 - Logicles Components with Reselect

* reselct is a support lib for redux. 
* is used to  compute derived or calculated state for redux projects
* we showcase it building a small app where we fetch data from a 3rd party API and show them in a list. we can select them with a checkbox. when we select them they are added to alist of selected posts.
* in a plain react-redux app we would have 2 reducers one for posts to fetch the posts and keep the list of posts in state and one for selected posts to keep the selected posts array in state. their compination would give the app state
* a bad approach would use a selected post list component
```
const selectedPosts = .filter(props.posts, post=> .contains(props.selectedPostsIds,post.id));
```
* this approach is bad
	* requires the react component to have knowledgeof underlying data structs
	* logic to figure out the currently selected post data is not reusable in other components)
* with reselect lib we combine the 2 reducers ina reselect selector and the we feed only data we care (selected items) in a selected post list
* the reselect selector takes 2 pieces of state combines them , calculates and spits data we care about producing a derived(calculated) piece of state
* our exampe code of selected posts list component (a selector)
```
// reselect selector
// takes out a list of posts and post ids and picks out the selected posts
import { createSelector } from 'reselect';
import _ from 'lodash';

// create select functions to pick off the pieces of state we care about for the calculation
const postsSelector = state => state.posts;
const selectedPostsSelector = state => state.selectedPostIds

//combine them
const getPosts = (posts,selectedPostIds) => {
	const selectedPosts = _.filter(
		posts,
		post => _.contains(selectedPostIds, post.id)
	);

	return selectedPosts;
};

export default createSelector(
	postsSelector, // pick of a piece of state
	selectedPostsSelector, // pick of a piece of state
	getPosts // last argument is the function that has our select logic
);
```
* the preliminary select functions will run twhen state changes
* their new state will be fed to the last combine method
* we implement a react component ot use the selector
```
import React from 'react';
import { connect } from 'react-redux';
import SelectedPostSelector from '../selectors/selected_posts'

const SelectedPostList = (props) => {
	return (
		<ul className="list-group">
			{
				props.posts.map(post = >{
						return <li className="list-group-item" key={post.id}>{post.title}</li>
					})
			}
		</ul>
	);
};

const mapStateToProps = (state) => {
	return {
		posts: SelectedPostSelector(state)
	}
}

export default connect(mapStateToProps)(SelectedPostList);
```
* props.posts is what is returned by the selector

### Lecture 110 - Data Loading methods with Redux

* how to initiate data loading in a react-redux app
* normally we make an action creator which uses axios to hit a backend server API. get data in the response and pass them to reducer
* there are various ways to call action creator
* for an initial data loading we use usually component lifecycle methods 'componentWillMount' to call action creator
* this is not the best pattern. if we want to reuse the component we cant as it is bount to the redux action creator and specific state piece
* we can use React-routers onEnter lifecycle method which is attached to the route not the component. it is uses as a a prop callback
* we just have to make the piece of state in our reusable react component a prop param
* we usually put the onEnter callback in a separate routes folder file named toute_callbacks.js

### Lecture 111 - Animation of React Components

* react is good at animating objects on screen
* add css transitions
* ReactCSSTransitionGroup is a component like any other React component. we import it and add it to JSX
* we wrap a list of items. so their addition or removal can be animated
* when we add an item this componet gives our items a class '<transition-name>-enter' for initial styling
* after initial render it applies the class '<transition-name>-enter-active' to apply a transition
* to use it we import it `import ReactCSSTransitionGroup from 'react-addons-css-transition-groupo'`
* we wrap ou items and define transition options as an obect an not inline
```
render(
	const transitionOptions = {
		transitionName: 'fade',
		transitionEnterTimeout: 500,
		transitionLeaveTeimeout: 500
	}

	<ReactCSSTransitionGroup {...transitionOptions}>
	{this.renderList()}
	</transition-name>ReactCSSTransitionGroup>
);
```
* in css we style the generated classes "fade-enter" etc
```
.fade-enter {
	right: 100px;

}

.fade-enter-active {
	right: 0px;
	transition: .5s ease-in all
}
```
* we can add transform opacity etc

### Lecture 112 - The Best Way to Store Redux Data

* the first idea when we think how to store collections of structs (objects) with id in state is the array
* we can used an object based storeage of key value pairs
* common operation  - read a record. object = simplification
	* array: 
	```
		const postIdToFind = 34
		state.posts.find(post => 
		post.id === postIdToFind)
	```
	* object:
	```
	const postIdToFind = 34
	state.posts[postIdToFind]
	``` 
* common operation - update record. both return new object
	* array:
		```
		const newPost = {id:34}
		newState = state.posts.filter(post=>post.id !== id)
		return [...newState,newPost]
		```
	* object
	```
	const newPost = {id:34}
	return { ...state, [newPostId]: newPost}
	```
* common operation - delete record. both return new object
	* array:
		```
		const postToDelete = 34
		return state.posts.filter(post=>post.id !== postToDelete)
		```
	* object
	```
	const postToDelete = {id:34}
	return _.omit(state, postToDelete)
	```
* to transform an array to a key object struct `_.mapKeys(payload, 'id')`

### Lecture 113 - Four Most Common Errors with React and Redux

* 1: do not export or import  the component: we try to render undefined ... error: react: createElelemtn undefined
* 2: omit brackets wjen import type def in reducer. no error at all just action not executed (goes to default return the reducer) . use a console log
* 3: in actioncreator in dispatch callback (using reduc0thunk) we attempt to access a param of the axios response that does not exist. we get cannot read property of undefined (uncaught in psomise) an error occured in a apromise
* 4: yo map through a response and get a specific property we can use `_.map(response.data, 'propertyname'`. if we return as payload from thunk dispatch the whole object we get Uncaught in promise error: objects are note valid as a react child...