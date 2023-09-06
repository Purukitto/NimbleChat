export default function parseInput(input) {
	// Normalize the response to lowercase for case-insensitive matching
	const normalisedInput = input.toLowerCase();

	// Check for keywords related to weather
	if (
		normalisedInput.includes("weather") ||
		normalisedInput.includes("forecast")
	) {
		// Use a regular expression to extract location information
		const locationMatch = normalisedInput.match(/\b(?:in|for)\s+(\w+)/);
		if (locationMatch && locationMatch[1]) {
			const location = locationMatch[1].trim();
			const action = normalisedInput.includes("weather")
				? "weather"
				: "forecast";
			return { location, action };
		}
	}

	// If no weather-related keywords or location were found, assume a general query
	return { location: null, action: "general" };
}
