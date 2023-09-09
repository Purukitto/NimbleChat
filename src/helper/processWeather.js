/**
 * @description -processes weather data from OpenWeatherMap API
 *
 * @param {string} locationInp -location to get weather for
 * @param {string} action -action to perform
 * @returns {object} -object containing weather data
 *
 * @example
 * processWeather("New York", "weather") // { type: "weather", ... }
 */

export default async function processWeather(locationInp, action) {
	const BASE_URL = "https://api.openweathermap.org";
	let locationData;

	if (locationInp.lat && locationInp.lon) {
		locationData = [locationInp];
	} else {
		locationData = await fetch(
			`${BASE_URL}/geo/1.0/direct?q=${locationInp}&limit=1&appid=${
				import.meta.env.VITE_OPENWEATHERMAP_KEY
			}`
		).then((res) => res.json());

		if (locationData.length === 0) return null;
	}

	console.log(locationData);

	const WEATHER_URL = `${BASE_URL}/data/2.5`;

	switch (action) {
		case "weather":
			return await fetch(
				`${WEATHER_URL}/weather?lat=${locationData[0].lat}&lon=${
					locationData[0].lon
				}&appid=${import.meta.env.VITE_OPENWEATHERMAP_KEY}`
			)
				.then((res) => res.json())
				.then((res) => {
					return { ...res, type: "weather" };
				});
		case "forecast":
			return await fetch(
				`${WEATHER_URL}/forecast?lat=${locationData[0].lat}&lon=${
					locationData[0].lon
				}&appid=${import.meta.env.VITE_OPENWEATHERMAP_KEY}`
			)
				.then((res) => res.json())
				.then((res) => {
					return { ...res, type: "forecast" };
				});
		case "aqi":
			return await fetch(
				`${WEATHER_URL}/air_pollution?lat=${locationData[0].lat}&lon=${
					locationData[0].lon
				}&appid=${import.meta.env.VITE_OPENWEATHERMAP_KEY}`
			)
				.then((res) => res.json())
				.then((res) => {
					return { ...res, type: "aqi" };
				});

		default:
			return null;
	}
}
