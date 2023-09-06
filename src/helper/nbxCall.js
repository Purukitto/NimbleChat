export default async function nbxCall(input, messageCallback) {
	const response = await fetch(
		"https://cors-anywhere.herokuapp.com/https://chat.nbox.ai/api/chat/completions",
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
							"You are a weather bot named NBX Weather. Respond with one line answers when not related to weather. If asked about weather, respond with the parsed location in JSON format.",
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
	let message = "";

	while (true) {
		const { value, done } = await reader.read();

		if (done) break;

		const chunk = decoder.decode(value, { stream: true });
		const payloads = chunk.toString().split("\n\n");
		for (const payload of payloads) {
			// if string includes '[DONE]'
			if (payload.includes("[DONE]")) {
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
					console.log(
						`Error with JSON.parse and ${payload}.\n${error}`
					);
				}
			}
		}
	}
}
