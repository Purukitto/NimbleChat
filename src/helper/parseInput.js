export default function parseInput(input) {
	// Check if the input contains any weather-related keywords
	const keywordPattern =
		/(weather|forecast|temperature|rain|snow|aqi|air quality)/i;

	const intentMatch = input.match(keywordPattern);

	if (intentMatch && intentMatch[0]) {
		// Use a regular expression to extract location information
		const locationMatch = input.match(/(?:in|for)\s+([A-Za-z\s-]+)/i);
		if (locationMatch && locationMatch[1]) {
			const intent = intentMatch[0].trim().toLowerCase();
			const location = locationMatch[1].trim();
			console.log(" Intent: ", intent);
			const action =
				intent === "aqi" || intent === "air quality"
					? "aqi"
					: intent === "forecast"
					? "forecast"
					: "weather";

			return { location, action };
		}
	}

	// If no weather-related keywords or location were found, assume a general query
	return { location: null, action: "general" };
}
