import { useEffect, useState } from "react";
import supabase from "../helper/supabase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

export default function Chat() {
	const [user, setUser] = useState(null); // User details
	const [messages, setMessages] = useState([]); // Messages

	useEffect(() => {
		supabase.auth.getSession().then((res) => {
			const session = res.data.session;
			setUser(session.user);
		});
	}, []);

	useEffect(() => {
		if (user) getMessageStream();
	}, [user]);

	const getMessageStream = async () => {
		const messages = await supabase
			.from("chatstream")
			.select("*")
			.eq("chat_id", user.id)
			.order("id", { ascending: true });

		setMessages(messages.data);
	};

	return (
		<div className="flex-1 overflow-y-auto overflow-x-hidden">
			{messages.length === 0 && (
				<>
					<p className="mt-10 text-center text-white">
						Enter promt below to get started!
					</p>
					<ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce text-white" />
				</>
			)}
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
}
