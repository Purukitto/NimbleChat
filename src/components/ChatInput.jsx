import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	sendMessage,
	startThinking,
	stopThinking,
	update,
	updateMessage,
} from "../store/chatSlice";
import nbxCall from "../helper/nbxCall";
import parseInput from "../helper/parseInput";
import processWeather from "../helper/processWeather";

export default function ChatInput() {
	const [promt, setPromt] = useState("");

	const user = useSelector((state) => state.user);
	const chat = useSelector((state) => state.chat);
	const dispatch = useDispatch();

	const handleSendMessage = async (e) => {
		e.preventDefault();

		const input = promt.trim(); // Remove whitespace
		if (input.length === 0) return; // Don't send empty message
		setPromt(""); // Clear input field

		// Send user message
		await dispatch(sendMessage({ message: input, user: user.data }));

		// Send bot message
		const botUser = {
			id: user.data.id,
			user_metadata: {
				user_name: "NBX Weather",
				avatar_url:
					"https://cdn-icons-png.flaticon.com/512/9231/9231625.png",
			},
		};

		const { location, action } = parseInput(input);

		if (["weather", "forecast", "aqi"].includes(action) && location) {
			const processedWeather = await processWeather(location, action);
			const messageObject = { weatherData: processedWeather };
			await dispatch(startThinking());
			await dispatch(
				sendMessage({ message: messageObject, user: botUser })
			);
			await dispatch(stopThinking());
		} else {
			await dispatch(startThinking());
			const { payload } = await dispatch(
				sendMessage({ message: "", user: botUser })
			);

			let lastValidResponse = null; // Initialize a variable to store the last valid response

			// Use helper function to call NBX API and update bot message
			nbxCall(input, async (response) => {
				if (response) {
					dispatch(update({ payload, response }));
					lastValidResponse = response; // Update lastValidResponse with the current response
				} else {
					if (lastValidResponse !== null) {
						dispatch(
							updateMessage({
								id: payload.id,
								message: lastValidResponse,
							})
						);
					} else {
						// Handle the case where there is no valid response yet
						console.error("No valid response available.");
					}
				}
			});

			await dispatch(stopThinking());
		}
	};

	return (
		<div className="flex-2 bg-transparent">
			<form
				onSubmit={handleSendMessage}
				className="flex items-center justify-between py-3 space-x-6 my-2 lg:mx-auto mx-2 max-w-3xl bg-[#2b2b2b] text-white p-5 rounded-lg focus:outline-none"
			>
				<input
					type="text"
					placeholder="Type a message"
					disabled={chat.loading}
					value={promt}
					onChange={(e) => setPromt(e.target.value)}
					className="flex-1 bg-transparent focus:outline-none"
				/>
				<button
					disabled={!promt || chat.loading}
					type="submit"
					className="bg-green-400 flex justify-center hover:opacity-70px-4 w-12 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					<PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
				</button>
			</form>
		</div>
	);
}
