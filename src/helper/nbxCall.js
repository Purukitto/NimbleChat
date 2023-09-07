import trimContextMessages from "./trimContextMessages";

export default async function nbxCall(input, messages, messageCallback) {
	const systemPrompt = `You are 'NBX Weather,' your trusted source for weather information! I'm here to provide you with the latest weather updates, forecasts, and air quality information. Feel free to ask me anything related to weather, air quality, or forecasts for one location at a time.
	
	You can use the following prompts:
	- "What's the weather in <location>?"
	- "Tell me the weather for <location>."
	- "Give me the forecast of <location>."
	- "What's the AQI of <location>?"
	
	Just mention a location, and I'll provide you with the relevant weather details. Ask away!`;

	messages.push({ role: "user", content: input });

	const messageArray = trimContextMessages(messages);

	messageArray.unshift({
		role: "system",
		content: systemPrompt,
	});

	console.log(messageArray);

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
				max_tokens: 1000,
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
					// TODO: Handle this error
					console.log(
						`Error with JSON.parse and ${payload}.\n${error}`
					);
				}
			}
		}
	}
}
