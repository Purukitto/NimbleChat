/**
 * @description -returns health concern and color for aqiValue
 *
 * @param {number} aqiValue	-AQI value
 * @returns {object} healthConcern and color
 *
 * @example
 * getAQIInfo(0) // { healthConcern: "Good", color: "#00C564" }
 * getAQIInfo(100) // { healthConcern: "Satisfactory", color: "#8DDF5F" }
 */

export default function getAQIInfo(aqiValue) {
	// AQI Info from https://en.wikipedia.org/wiki/Air_quality_index#India
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
		return { healthConcern: "Severe", color: "#FF0000" };
	} else if (aqiValue <= 500) {
		return { healthConcern: "Hazardous", color: "#DE0000" };
	} else {
		return { healthConcern: "Invalid AQI", color: "#808080" };
	}
}
