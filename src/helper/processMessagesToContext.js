export default function processMessagesToContext(messages) {
	const messageArray = messages.map((message) => {
		const role =
			message.user.fname === "NBX Weather" ? "assistant" : "user";
		const content = message.text.startsWith(`{"weatherData":{`)
			? "Weather information"
			: message.text;
		return { role, content };
	});
	return messageArray;
}
