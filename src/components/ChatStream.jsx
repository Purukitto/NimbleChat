import { useEffect, useRef } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, setPrompt } from "../store/chatSlice";
import { Dna, LineWave } from "react-loader-spinner";

// Components
import Message from "./Message";
import toast from "react-hot-toast";

export default function ChatStream() {
	// Redux
	const chat = useSelector((state) => state.chat);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const ref = useRef(null); // Ref for scrolling to bottom

	useEffect(() => {
		// Scroll to bottom on new message
		if (chat.messages.length) {
			ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [chat.messages.length]);

	useEffect(() => {
		// Fetch chat if user is logged in
		if (user.data.user_metadata) dispatch(fetchChat(user.data.id));
	}, [user.data]);

	const handleCopyPrompt = (newPrompt) => () => {
		// Copy prompt to clipboard
		navigator.clipboard.writeText(newPrompt);
		toast("Prompt copied to clipboard! 📋");
		// Set prompt in redux
		dispatch(setPrompt(newPrompt));
	};

	return (
		<div className="flex-1 overflow-y-auto overflow-x-hidden">
			{!chat.error ? (
				!chat.loading ? (
					chat.messages.length > 0 ? (
						// If messages exist
						// Render messages
						<>
							{chat.messages.map((message) => (
								<Message key={message.id} message={message} />
							))}
							<div ref={ref} className="h-3" />
							{chat.thinking && (
								<div className="flex flex-1 justify-center">
									<LineWave
										height="100"
										width="100"
										color="#4fa94d"
										ariaLabel="line-wave"
										wrapperStyle={{}}
										wrapperClass=""
										visible={true}
										firstLineColor="c4d7ff"
										middleLineColor="c4d7ff"
										lastLineColor="c4d7ff"
									/>
								</div>
							)}
						</>
					) : (
						// If no messages exist
						<div className="flex flex-col h-full px-auto py-5 items-center justify-between">
							<div>
								<p className=" text-lg text-center text-white">
									Enter promt below to get started!
								</p>
								<ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce text-white" />
							</div>
							<div className="w-full max-w-3xl my-2 md:px-auto px-2">
								<div className="flex space-x-4">
									<div className="flex-col space-y-4 flex-1">
										<div
											className="infoText"
											onClick={handleCopyPrompt(
												"Who are you? What can you help me with?"
											)}
										>
											<p className="text-white font-bold">
												Who are you?
											</p>
											<p className="text-textSecondary">
												What can you help me with?
											</p>
										</div>
										<div
											className="infoText"
											onClick={handleCopyPrompt(
												"Give me the forecast for Noida"
											)}
										>
											<p className="text-white font-bold">
												Give me the forecast
											</p>
											<p className="text-textSecondary">
												for Noida
											</p>
										</div>
									</div>
									<div className="flex-col space-y-4 flex-1">
										<div
											className="infoText"
											onClick={handleCopyPrompt(
												"Tell me about the weather in New Delhi"
											)}
										>
											<p className="text-white font-bold">
												Tell me about the weather
											</p>
											<p className="text-textSecondary">
												in New Delhi
											</p>
										</div>
										<div
											className="infoText"
											onClick={handleCopyPrompt(
												"What is the AQI of Bengaluru?"
											)}
										>
											<p className="text-white font-bold">
												What is the AQI
											</p>
											<p className="text-textSecondary">
												of Bengaluru
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				) : (
					// If loading
					<>
						<p className="mt-10 text-lg text-center text-white">
							Loading messages...
						</p>
						<div className="flex flex-1 justify-center">
							<Dna
								visible={true}
								height="80"
								width="80"
								ariaLabel="dna-loading"
								wrapperStyle={{}}
								wrapperClass="dna-wrapper"
							/>
						</div>
					</>
				)
			) : (
				// If error
				<p className="mt-10 text-lg text-center text-white">
					Some error occured. Please refresh or try again later.
				</p>
			)}
		</div>
	);
}
