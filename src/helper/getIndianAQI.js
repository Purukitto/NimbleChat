export default function getIndianAQI(pollutants) {
	console.log(pollutants);

	// Define the AQI breakpoints and coefficients for each pollutant
	const pollutantInfo = {
		co: {
			breakpoints: [0, 4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4],
			coefficients: [0, 50, 100, 150, 200, 300, 400, 500],
		},
		no: {
			breakpoints: [0, 0.054, 0.101, 0.361, 0.65, 1.25, 1.651],
			coefficients: [0, 50, 100, 150, 200, 300, 400],
		},
		no2: {
			breakpoints: [0, 0.054, 0.101, 0.361, 0.65, 1.25, 1.651],
			coefficients: [0, 50, 100, 150, 200, 300, 400],
		},
		o3: {
			breakpoints: [0, 0.055, 0.071, 0.086, 0.106, 0.201, 0.205],
			coefficients: [0, 50, 100, 150, 200, 300, 400],
		},
		so2: {
			breakpoints: [0, 35, 75, 186, 305, 605, 805],
			coefficients: [0, 50, 100, 150, 200, 300, 400],
		},
		pm2_5: {
			breakpoints: [0, 12.1, 35.5, 55.5, 150.5, 250.5, 350.5],
			coefficients: [0, 50, 100, 150, 200, 300, 400],
		},
		pm10: {
			breakpoints: [0, 54, 154, 255, 355, 425, 505],
			coefficients: [0, 50, 100, 150, 200, 300, 400],
		},
		nh3: {
			breakpoints: [0, 0.054, 0.101, 0.361, 0.65, 1.25, 1.651],
			coefficients: [0, 50, 100, 150, 200, 300, 400],
		},
	};

	const conversionFactors = {
		co: 1 / 1150,
		no: 1 / 1230,
		no2: 1 / 1880,
		o3: 1 / 1960,
		so2: 1 / 2620,
		nh3: 1 / 700,
		pm2_5: 1, // No conversion needed for PM2.5
		pm10: 1, // No conversion needed for PM10
	};

	// Initialize an array to store the calculated AQI values for each pollutant
	const aqiValues = [];
	for (const pollutant in pollutants) {
		let concentration = pollutants[pollutant];
		const info = pollutantInfo[pollutant];

		// Apply the conversion factor if available
		if (conversionFactors[pollutant]) {
			concentration *= conversionFactors[pollutant];
		}

		// Determine the index corresponding to the concentration range
		let index = 0;
		while (
			index < info.breakpoints.length - 1 &&
			concentration > info.breakpoints[index + 1]
		) {
			index++;
		}

		// Calculate the AQI using the AQI formula
		const aqi =
			((info.coefficients[index + 1] - info.coefficients[index]) /
				(info.breakpoints[index + 1] - info.breakpoints[index])) *
				(concentration - info.breakpoints[index]) +
			info.coefficients[index];

		// Push the calculated AQI to the array
		aqiValues.push(aqi);
	}

	// The overall AQI is the maximum of all pollutant-specific AQI values
	const overallAQI = Math.max(...aqiValues);

	return overallAQI;
}
