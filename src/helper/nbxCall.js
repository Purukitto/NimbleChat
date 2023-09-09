/**
 * @description -function to handle user input and call NBox API
 *
 * @param {string} input -user input
 * @param {array} messages -array of messages
 * @param {function} messageCallback -callback function to update message
 * @returns {void}
 *
 * @example
 * nbxCall("Hello", [{ role: "user", content: "Previous message" }], (message) => console.log(message)) // "Hello, how are you?"
 */

import trimContextMessages from "./trimContextMessages";

export default async function nbxCall(input, messages, messageCallback) {
	const systemPrompt = `You are NBX Weather, a friendly and trusted chatbot for weather information. Your primary focus is on providing accurate and up-to-date weather data, air quality information, and weather forecasts for specific locations.

	Please follow these guidelines:
	1. For weather-related queries, such as current weather conditions, forecasts, and air quality, provide accurate information based on the OpenWeather API.
	2. When asking about weather information, use formats like:
	   - "What is the weather in Delhi?"
	   - "What is the forecast for New Delhi?"
	   - "What is the air quality in Noida?"
	   - "What is the weather here?"
	   - "What is the air quality here?"
	3. If a user's request is related to weather or air quality and follows the correct format, answer the question as thoroughly and informatively as possible.
	4. When a user asks for information that goes beyond the scope of your capabilities (e.g., real-time updates, live data, highly specialized forecasts), politely explain that you are unable to provide such information and suggest an alternative if possible.
	5. If a user's query is unclear or incorrect, gently guide them toward a correct format or suggest rephrasing the question.
	6. Always maintain a respectful and friendly tone in your responses.
	7. Do not provide any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.
	
	Remember that your primary role is to assist with weather-related inquiries. Anything beyond that, kindly redirect or clarify with the user.`;

	messages.push({ role: "user", content: input });

	const messageArray = trimContextMessages(messages);

	messageArray.unshift({
		role: "system",
		content: systemPrompt,
	});

	// API call to NBox AI
	const response = await fetch(
		`${
			import.meta.env.VITE_CORSPROXY_URL
		}/https://chat.nbox.ai/api/chat/completions`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: import.meta.env.VITE_NBX_KEY,
			},
			body: JSON.stringify({
				temperature: 0.5,
				messages: messageArray,
				model: "llama-2-chat-13b-4k",
				stream: true,
				max_tokens: 500,
			}),
		}
	);

	if (!response.ok) {
		messageCallback(false);
		console.log(`Error with fetch.\n${response}`);
	}
	
	const rs = response.body; // This is a ReadableStream
	const reader = rs.getReader();
	const decoder = new TextDecoder("utf-8");
	let message = ""; // message to be displayed

	while (true) {
		const { value, done } = await reader.read();

		if (done) break; // if done, break out of loop

		const chunk = decoder.decode(value, { stream: true });
		const payloads = chunk.toString().split("\n\n"); // split the decoded chunks by new line
		for (const payload of payloads) {
			if (payload.includes("[DONE]")) {
				// if the payload includes [DONE], break out of loop
				messageCallback(false);
				break;
			}
			if (payload.startsWith("data:")) {
				// remove 'data: ' and parse the corresponding object
				const data = JSON.parse(payload.replace("data: ", ""));
				try {
					const text = data.choices[0].delta?.content;
					if (text) {
						message += text;
						messageCallback(message);
					}
				} catch (error) {
					messageCallback(false);
					console.log(
						`Error with JSON.parse.\nPayload: ${payload} \n${error}`
					);
				}
			}
		}
	}
}
