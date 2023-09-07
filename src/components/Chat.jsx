import { useEffect, useRef } from "react";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat } from "../store/chatSlice";

export default function Chat() {
	const chat = useSelector((state) => state.chat);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const ref = useRef(null);

	useEffect(() => {
		if (chat.messages.length) {
			ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [chat.messages.length]);

	useEffect(() => {
		if (user.data) dispatch(fetchChat(user.data.id));
	}, [user.data]);

	return (
		<div className="flex-1 overflow-y-auto overflow-x-hidden">
			{chat.messages.length > 0 ? (
				!chat.error ? (
					<>
						{chat.messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
						<div ref={ref} className="h-3" />
					</>
				) : (
					<>
						<p className="mt-10 text-center text-white">
							Enter promt below to get started!
						</p>
						<ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce text-white" />
					</>
				)
			) : (
				<p className="mt-10 text-center text-white">
					Some error occured. Please refresh or try again later.
				</p>
			)}
		</div>
	);
}
