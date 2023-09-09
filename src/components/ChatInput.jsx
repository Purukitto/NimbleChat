/*
 * Input component for chat screen
 *
 * - Input field for user to type messages
 * - Send button to send messages
 * - Parses user input to check if it is a weather request
 * - Sends user input to NBX API if not a weather request
 * - Sends weather request to OpenWeather API if it is a weather request
 */

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
	sendMessage,
	setPrompt,
	startThinking,
	stopThinking,
	update,
	updateMessage,
} from "../store/chatSlice";

// Helpers
import nbxCall from "../helper/nbxCall";
import parseInput from "../helper/parseInput";
import processWeather from "../helper/processWeather";
import processMessagesToContext from "../helper/processMessagesToContext";
import { ThreeDots } from "react-loader-spinner";

export default function ChatInput() {
	// Redux
	const user = useSelector((state) => state.user);
	const chat = useSelector((state) => state.chat);
	const geoLocation = useSelector((state) => state.geolocation);
	const dispatch = useDispatch();

	const handleSendMessage = async (e) => {
		e.preventDefault();

		const input = chat.prompt.trim();
		if (input.length === 0) return; // Don't send empty message
		dispatch(setPrompt("")); // Clear input field
		// Send user message
		await dispatch(sendMessage({ message: input, user: user.data }));

		// Create bot message
		const botUser = {
			id: user.data.id,
			user_metadata: {
				user_name: "NBX Weather",
				avatar_url:
					"https://cdn-icons-png.flaticon.com/512/9231/9231625.png",
			},
		};

		await dispatch(startThinking()); // Toggle thinking animation

		// Check if user input is a weather request
		const { weatherLocation, action } = parseInput(input);

		// If user input is a weather request, process it
		if (["weather", "forecast", "aqi"].includes(action)) {
			if (weatherLocation) {
				const processedWeather = await processWeather(
					weatherLocation,
					action
				);
				if (processedWeather)
					// If weather data is found, send it to the user
					await dispatch(
						sendMessage({
							message: { weatherData: processedWeather },
							user: botUser,
						})
					);
				// If weather data is not found, send error message
				else
					await dispatch(
						sendMessage({
							message:
								"Sorry, I couldn't find that location. Please try again with another location.\n\n Here are some examples on how you can give me the said information correctly:\n\n- Weather in Bengaluru\n- Forecast for Noida\n- AQI of New Delhi\n\nYou must use the city name and not the state/country name.",
							user: botUser,
						})
					);
			} else {
				if (
					(input.toLowerCase().includes("current") ||
						input.toLowerCase().includes("here")) &&
					geoLocation &&
					geoLocation.longitude &&
					geoLocation.latitude
				) {
					const processedWeather = await processWeather(
						{
							lat: geoLocation.latitude,
							lon: geoLocation.longitude,
						},
						action
					);
					if (processedWeather)
						// If weather data is found, send it to the user
						await dispatch(
							sendMessage({
								message: { weatherData: processedWeather },
								user: botUser,
							})
						);
					// If weather data is not found, send error message
					else
						await dispatch(
							sendMessage({
								message:
									"Sorry, I couldn't find that location. Please try again with another location.\n\n Here are some examples on how you can give me the said information correctly:\n\n- Weather in Bengaluru\n- Forecast for Noida\n- AQI of New Delhi\n\nYou must use the city name and not the state/country name.",
								user: botUser,
							})
						);
				} else {
					const locationPrompt =
						action === "weather"
							? "in <location>"
							: action === "forecast"
							? "for <location>"
							: "of <location>";
					// If user input is a weather request but location is not found, send error message
					await dispatch(
						sendMessage({
							message: `It seems like you wanted to know about the ${
								action === "aqi" ? "AQI" : action
							} but didn't specify a location.😅\nPlease try again with a location.\n\nAppend '${locationPrompt}' at the end of your last message and you would be good to go!`,
							user: botUser,
						})
					);
				}
			}
			dispatch(stopThinking()); // Toggle thinking animation
		} else {
			// If user input is not a weather request, send it to NBX API
			const { payload } = await dispatch(
				sendMessage({ message: "", user: botUser })
			);

			let lastValidResponse = null; // Initialize a variable to store the last valid response

			// Use helper function to call NBX API and update bot message
			nbxCall(
				input,
				processMessagesToContext(chat.messages),
				async (response) => {
					if (response) {
						dispatch(update({ payload, response }));
						lastValidResponse = response; // Update lastValidResponse with the current response
					} else {
						if (lastValidResponse !== null) {
							await dispatch(
								updateMessage({
									id: payload.id,
									message: lastValidResponse,
								})
							);
						} else {
							await dispatch(
								updateMessage({
									id: payload.id,
									message:
										"Sorry, I couldn't understand that. Please try again.",
								})
							);

							// Handle the case where there is no valid response yet
							console.error("No valid response available.");
						}
						dispatch(stopThinking()); // Toggle thinking animation
					}
				}
			);
		}
	};

	return (
		<div className="flex-2 bg-darkPrimary">
			<form
				onSubmit={handleSendMessage}
				className="flex items-center justify-between py-3 space-x-6 my-2 md:mx-auto mx-2 max-w-3xl bg-darkSecondary text-white p-5 rounded-lg focus:outline-none"
			>
				<input
					type="text"
					placeholder="Type a message"
					disabled={chat.loading}
					value={chat.prompt}
					onChange={(e) => dispatch(setPrompt(e.target.value))}
					className="flex-1 bg-transparent focus:outline-none"
				/>
				<button
					disabled={!prompt || chat.loading || chat.thinking}
					type="submit"
					className="bg-green flex justify-center hover:opacity-70px-4 w-12 py-2 rounded disabled:bg-disabled disabled:cursor-not-allowed"
				>
					{chat.thinking ? (
						<ThreeDots
							height="24"
							width="30"
							radius="3"
							color="#c4d7ff"
							ariaLabel="three-dots-loading"
							wrapperStyle={{}}
							wrapperClassName=""
							visible={true}
						/>
					) : (
						<PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
					)}
				</button>
			</form>
		</div>
	);
}
