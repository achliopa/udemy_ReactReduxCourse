import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyC0NkOYIa5Go53p_kd4SOhwgAxl3iLrM04';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};
	
		
		this.videoSearch('surfboard');
	};

	videoSearch(term) {
		YTSearch({ key: API_KEY, term}, (videos) => {
			this.setState({
				videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
		return  (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video = {this.state.selectedVideo}/>
				<VideoList 
					videos={this.state.videos} 
					onVideoSelect={selectedVideo  =>  this.setState({selectedVideo})}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));