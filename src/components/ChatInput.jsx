import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, update } from "../store/chatSlice";
import nbxCall from "../helper/nbxCall";

export default function ChatInput() {
	const [promt, setPromt] = useState("");
	const user = useSelector((state) => state.user);
	const chat = useSelector((state) => state.chat);
	const dispatch = useDispatch();

	const handleSendMessage = (e) => {
		e.preventDefault();

		const input = promt.trim(); // Remove whitespace
		if (input.length === 0) return; // Don't send empty message
		setPromt(""); // Clear input field

		// Send user message
		dispatch(sendMessage({ message: input, user: user.data }));

		// Send bot message
		const botUser = {
			id: user.data.id,
			user_metadata: {
				user_name: "NBX Weather",
				avatar_url:
					"https://cdn-icons-png.flaticon.com/512/9231/9231625.png",
			},
		};

        console.log(botUser);

		dispatch(sendMessage({ message: "", user: botUser }));
		const botMessage = chat.messages[chat.messages.length - 1];

		// Use helper function to call NBX API and update bot message
		nbxCall(input, (response) => {
			dispatch(update(botMessage, response));
		});
	};

	return (
		<div className="flex-2">
			<form
				onSubmit={handleSendMessage}
				className="flex items-center justify-between bg-[#343541] py-3 space-x-6 mx-8"
			>
				<input
					type="text"
					placeholder="Type a message"
					disabled={chat.loading}
					value={promt}
					onChange={(e) => setPromt(e.target.value)}
					className="bg-[#2b2b2b] text-white p-5 rounded-lg w-full focus:outline-none"
				/>
				<button
					disabled={!promt || chat.loading}
					type="submit"
					className="bg-green-400 hover:opacity-70 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					<PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
				</button>
			</form>
		</div>
	);
}
