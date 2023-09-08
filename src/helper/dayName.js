/**
 * @description -returns the name of the day of the week
 *
 * @param {number} day	-day of the week
 * @returns {string} day name
 *
 * @example
 * dayName(0) // Sunday
 * dayName(1) // Monday
 */

export default function dayName(day) {
	switch (day) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
		default:
			return null;
	}
}
