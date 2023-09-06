import { json } from "react-router-dom";

export default async function processWeather(location, action) {
	const locationData = await fetch(
		`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${
			import.meta.env.VITE_OPENWEATHERMAP_KEY
		}`
	).then((res) => res.json());

	switch (action) {
		case "weather":
			return await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${
					locationData[0].lat
				}&lon=${locationData[0].lon}&appid=${
					import.meta.env.VITE_OPENWEATHERMAP_KEY
				}`
			)
				.then((res) => res.json())
				.then((res) => {
					return { ...res, type: "weather" };
				});
		case "forecast":
			return await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${
					locationData[0].lat
				}&lon=${locationData[0].lon}&appid=${
					import.meta.env.VITE_OPENWEATHERMAP_KEY
				}`
			)
				.then((res) => res.json())
				.then((res) => {
					return { ...res, type: "forecast" };
				});
		default:
			return null;
	}
}
