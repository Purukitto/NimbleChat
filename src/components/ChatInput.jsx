import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import supabase from "../helper/supabase";

export default function ChatInput({ user }) {
	const [promt, setPromt] = useState("");

	const sendMessage = async () => {
		const input = promt.trim(); // Remove whitespace
		if (input.length === 0) return; // Don't send empty message
		setPromt(""); // Clear input

		// Send message to server
		const { data, error } = await supabase.from("chatstream").insert([
			{
				chat_id: user.id,
				user: {
					fName: user.user_metadata.user_name,
					avatar: user.user_metadata.avatar_url,
				},
				text: input,
			},
		]);

		if (error) console.log(error);
	};

	return (
		<div className="flex items-center justify-between bg-[#343541] py-3 space-x-6 mx-8">
			<input
				type="text"
				placeholder="Type a message"
				value={promt}
				onChange={(e) => setPromt(e.target.value)}
				className="bg-[#2b2b2b] text-white p-5 rounded-lg w-full focus:outline-none"
			/>
			<button
				disabled={!promt}
				onClick={sendMessage}
				className="bg-green-400 hover:opacity-70 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
				<PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
			</button>
		</div>
	);
}
