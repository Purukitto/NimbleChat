export default function nbxCall(input) {
	const response = fetch("https://chat.nbox.ai/api/chat/completions", {
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
	});

	console.log(response);
}
