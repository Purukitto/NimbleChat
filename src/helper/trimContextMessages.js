/**
 * @description -trims messages to ensure that the total number of tokens is within the limit
 *
 * @param {array} messages	-array of messages
 * @returns {array} -array of messages
 */

import llamaTokenizer from "llama-tokenizer-js";

const MAX_TOKENS = 4096 - 500; // Subtract 500 for new tokens

export default function trimContextMessages(messages) {
	// 390 is the approx length of the system prompt to ensure space for system prompt
	const tokenLimit = MAX_TOKENS - 395;

	let totalTokens = llamaTokenizer.encode(
		JSON.stringify(messages, null, 2)
	).length;

	// Check if the chat is within the token limit
	if (totalTokens <= tokenLimit) {
		// If it's already within the limit, no trimming is needed
		return messages;
	}

	// If it's over the limit, trim messages
	while (totalTokens > tokenLimit) {
		const removedMessage = messages.shift(); // Remove the oldest message
		const removedTokens = llamaTokenizer.encode(
			JSON.stringify(removedMessage)
		).length;
		totalTokens -= removedTokens;
	}

	return messages;
}
