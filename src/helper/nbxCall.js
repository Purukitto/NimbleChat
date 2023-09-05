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
						content: "You are a weather bot. Respond accordingly.",
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

	console.log(response);

	const rs = response.body; // This is a ReadableStream
	const reader = rs.getReader();
	const decoder = new TextDecoder("utf-8");
	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		const chunk = decoder.decode(value, { stream: true });
		console.log("decoded chunk : ", chunk);
		// typewriting each chunk
		setStreamContent((prev) => prev.concat(chunk));
	}
}
