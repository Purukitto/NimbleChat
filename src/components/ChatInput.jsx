import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ChatInput() {
	const [promt, setPromt] = useState("");
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
				className="bg-green-400 hover:opacity-70 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
				<PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
			</button>
		</div>
	);
}
