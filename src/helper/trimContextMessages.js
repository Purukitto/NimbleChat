import tokenizer from "gpt-tokenizer";

export default function trimContextMessages(messages) {
	const tokenLimit = 2048 - 114; // Max tokens allowed by NBox AI //TODO: Confirmation needed
	// System prompt is 114 tokens, calculated at https://platform.openai.com/tokenizer

	const totalTokens = tokenizer.encodeChat(messages, "gpt-3.5-turbo").length;

	// Check if the chat is within the token limit
	if (totalTokens <= tokenLimit) {
		// If it's already within the limit, no trimming is needed
		return messages;
	}

	// If it's over the limit, trim messages
	while (totalTokens > tokenLimit) {
		const removedMessage = messages.shift(); // Remove the oldest message
		const removedTokens = tokenizer.encodeChat(
			[removedMessage],
			"gpt-3.5-turbo"
		)[0].length;
		totalTokens -= removedTokens;
	}

	return messages;
}
