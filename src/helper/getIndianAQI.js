export default function getIndianAQI(pollutants) {
	// Remove no from pollutants
	delete pollutants.no;
	delete pollutants.nh3

	// Define the AQI breakpoints and coefficients for each pollutant
	const pollutantInfo = {
		co: {
			breakpoints: [0, 4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4],
			coefficients: [0, 50, 100, 150, 200, 300, 400, 500],
		},
		no2: {
			breakpoints: [0, 0.053, 0.1, 0.36, 0.649, 1.249, 1.649, 2.049],
			coefficients: [0, 50, 100, 150, 200, 300, 400, 500],
		},
		o3: {
			breakpoints: [0, 0.054, 0.07, 0.085, 0.105, 0.2, 0.404, 0.504],
			coefficients: [0, 50, 100, 150, 200, 300, 400, 500],
		},
		so2: {
			breakpoints: [0, 35, 75, 185, 304, 604, 804, 1004],
			coefficients: [0, 50, 100, 150, 200, 300, 400, 500],
		},
		pm2_5: {
			breakpoints: [0, 12.0, 35.4, 55.4, 150.4, 250.4, 350.4, 500.4],
			coefficients: [0, 50, 100, 150, 200, 300, 400, 500],
		},
		pm10: {
			breakpoints: [0, 54, 154, 254, 354, 424, 504, 604],
			coefficients: [0, 50, 100, 150, 200, 300, 400, 500],
		},
	};

	const conversionFactors = {
		co: 1 / 1150,
		no2: 1 / 1880,
		o3: 1 / 1960,
		so2: 1 / 2620,
		pm2_5: 1 / 20, // No conversion needed for PM2.5
		pm10: 1 / 20, // No conversion needed for PM10
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

		console.log(concentration);
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

	console.log(pollutants);
	console.log(aqiValues);

	// The overall AQI is the maximum of all pollutant-specific AQI values
	const overallAQI = Math.max(...aqiValues);

	return overallAQI;
}
