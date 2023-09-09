/**
 * @description -parses user input to determine the weather location and action
 *
 * @param {string} input -user input
 * @returns {object} -object containing weatherLocation and action
 *
 * @example
 * parseInput("What is the weather in New York?") // { weatherLocation: "New York", action: "weather" }
 */

export default function parseInput(input) {
	// Check if the input contains any weather-related keywords
	const keywordPattern =
		/(weather forecast|weather|forecast|temperature|rain|snow|aqi|air quality)/i;

	const intentMatch = input.match(keywordPattern);

	if (intentMatch && intentMatch[0]) {
		// Use a regular expression to extract location information
		const locationMatch = input.match(/\b(?:in|for|of)\s+([A-Za-z\s-]+)/i);
		const intent = intentMatch[0].trim().toLowerCase();
		const action =
			intent === "aqi" || intent === "air quality"
				? "aqi"
				: intent.includes("forecast")
				? "forecast"
				: "weather";
		if (locationMatch && locationMatch[1]) {
			return { weatherLocation: locationMatch[1].trim(), action };
		} else return { weatherLocation: null, action };
	}

	// If no weather-related keywords or location were found, assume a general query
	return { weatherLocation: null, action: "general" };
}
