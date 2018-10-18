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

* 