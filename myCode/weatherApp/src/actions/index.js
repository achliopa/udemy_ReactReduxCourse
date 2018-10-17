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