import { useEffect, useState } from "react";
import supabase from "../helper/supabase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat } from "../store/chatSlice";

export default function Chat() {
	const chat = useSelector((state) => state.chat);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.data) dispatch(fetchChat(user.data.id));
	}, [user.data]);

	return (
		<div className="flex-1 overflow-y-auto overflow-x-hidden">
			{!chat.error && chat.messages.length > 0 ? (
				chat.messages.map((message) => (
					<Message key={message.id} message={message} />
				))
			) : (
				<>
					<p className="mt-10 text-center text-white">
						Enter promt below to get started!
					</p>
					<ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce text-white" />
				</>
			)}
		</div>
	);
}
