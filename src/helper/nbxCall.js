/**
 * @description -function to handle user input and call NBox API
 *
 * @param {string} input -user input
 * @param {array} messages -array of messages
 * @param {function} messageCallback -callback function to update message
 * @returns {void}
 *
 * @example
 * nbxCall("Hello", [{ role: "user", content: "Hello" }], (message) => console.log(message)) // "Hello, how are you?"
 */

import trimContextMessages from "./trimContextMessages";

export default async function nbxCall(input, messages, messageCallback) {
	const systemPrompt = `You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.
	If a question does not make any sense for you to answer, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
	You are NBX Weather, a friendly chatbot that is a trusted source for weather information! Ask users to feel free to ask you anything related to weather, air quality, or forecasts for one location at a time.`;

	messages.push({ role: "user", content: input });

	const messageArray = trimContextMessages(messages);

	messageArray.unshift({
		role: "system",
		content: systemPrompt,
	});

	// API call to NBox AI
	const response = await fetch(
		"https://nocors-proxy-d63b3f09ff4c.herokuapp.com/https://chat.nbox.ai/api/chat/completions",
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
					// TODO: IF ERROR HANDLE ERROR IN FRONT
					console.log(
						`Error with JSON.parse.\nPayload: ${payload} \n${error}`
					);
				}
			}
		}
	}
}
