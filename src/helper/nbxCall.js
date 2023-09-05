export default async function nbxCall(input) {
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
	let accumulatedChunk = "";
	let resultContent = null;

	while (true) {
		const { value, done } = await reader.read();
		if (done) break;

		const chunk = decoder.decode(value, { stream: true });

		// Accumulate the chunk
		accumulatedChunk += chunk;

		// Check if a complete message is received (e.g., contains "finish_reason":"stop")
		if (accumulatedChunk.includes('"finish_reason":"stop"')) {
			// Parse the accumulatedChunk to extract the content
			const jsonData = JSON.parse(accumulatedChunk);
			if (jsonData.choices && jsonData.choices.length > 0) {
				resultContent = jsonData.choices[0].delta.content;
			}

			// Reset accumulatedChunk for the next message
			accumulatedChunk = "";
		}
	}

	return resultContent;
}

// Example of how to use the nbxCall function
nbxCall("Your user input here").then((content) => {
	// You will receive the content here
	console.log("Received content:", content);
});
