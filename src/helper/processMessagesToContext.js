/**
 * @description -takes in message state and returns an array of messages in a format that can be used by the API
 *
 * @param {array} messages -array of messages
 * @returns {array} -array of objects containing role and content
 *
 * @example
 * processMessagesToContext([{user: {fname: "NBX Weather"}, text: "Hello!"}]) // [{role: "assistant", content: "Hello!"}]
 */

export default function processMessagesToContext(messages) {
	const messageArray = messages.map((message) => {
		const role =
			message.user.fname === "NBX Weather" ? "assistant" : "user";
		const content = message.text.startsWith(`{"weatherData":{`)
			? "Current weather information fetched from OpenWeather API"
			: message.text;
		return { role, content };
	});
	return messageArray;
}
