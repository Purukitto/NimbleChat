export default function getAQIInfo(aqiValue) {
	if (aqiValue >= 0 && aqiValue <= 50) {
		return { healthConcern: "Good", color: "#00C564" };
	} else if (aqiValue <= 100) {
		return { healthConcern: "Satisfactory", color: "#8DDF5F" };
	} else if (aqiValue <= 200) {
		return {
			healthConcern: "Moderate",
			color: "#FAFF00",
		};
	} else if (aqiValue <= 300) {
		return { healthConcern: "Poor", color: "#FFA600" };
	} else if (aqiValue <= 400) {
		return { healthConcern: "Very Poor", color: "#FF0000" };
	} else if (aqiValue <= 500) {
		return { healthConcern: "Severe", color: "#DE0000" };
	} else {
		return { healthConcern: "Invalid AQI", color: "#808080" };
	}
}
