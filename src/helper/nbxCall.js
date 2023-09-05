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
							"You are a weather bot. Your name is NBX Weather. Respond accordingly.",
					},
					{
						role: "user",
						content: input,
					},
				],
				model: "llama-2-chat-13b-4k",
				stream: true,
				max_tokens: 1000,
			}),
		}
	);

	const rs = response.body; // This is a ReadableStream
	const reader = rs.getReader();
	const decoder = new TextDecoder("utf-8");
	let message = "";

	while (true) {
		const { value, done } = await reader.read();

		const chunk = decoder.decode(value, { stream: true });

		// Accumulate the chunk
		// message += JSON.parse(chunk.slice(7)).choices[0].delta.content;
		message += chunk;
		console.log(chunk.slice(7));

		messageCallback(message);

		// Check if a complete message is received (e.g., contains "finish_reason":"stop")
		if (chunk.includes('"finish_reason":"stop"')) {
			break;
		}
	}
}
