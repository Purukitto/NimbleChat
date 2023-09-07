export default async function nbxCall(input, messageCallback) {
	// API call to NBox AI
	const response = await fetch(
		"https://cors-anywhere.purukitto.repl.co/https://chat.nbox.ai/api/chat/completions",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: import.meta.env.VITE_NBX_KEY,
			},
			body: JSON.stringify({
				temperature: 0.5,
				messages: [
					{
						role: "system",
						content:
							"You are a weather bot named NBX Weather. Respond with one line answers when the topic is not about weather and urge them to ask about weather related queries.",
					},
					{
						role: "user",
						content: input,
					},
				],
				model: "llama-2-chat-13b-4k",
				stream: true,
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
