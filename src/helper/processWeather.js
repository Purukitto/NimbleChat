export default async function processWeather(location, action) {
	const BASE_URL =
		"https://nocors-proxy-d63b3f09ff4c.herokuapp.com/https://api.openweathermap.org";

	const locationData = await fetch(
		`${BASE_URL}/geo/1.0/direct?q=${location}&limit=1&appid=${
			import.meta.env.VITE_OPENWEATHERMAP_KEY
		}`
	).then((res) => res.json());

	if (locationData.length === 0) return null;

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
