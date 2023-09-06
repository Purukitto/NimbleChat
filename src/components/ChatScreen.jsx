import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../store/userSlice";

export default function ChatScreen() {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchUser());
	}, []);

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<>
			{user.data.user_metadata && (
				<div className="flex flex-col h-screen overflow-hidden">
					<div className="flex justify-between bg-slate-950 text-white">
						<div>
							<h1 className="text-xl font-semibold my-2 ml-8">
								Nimble Chat
							</h1>
						</div>
						<div className="flex items-center space-x-2 my-2 mr-8">
							<img
								src={user.data.user_metadata.avatar_url}
								alt="avatar"
								className="h-8 w-8 rounded-full"
							/>
							<button onClick={handleLogout}>Logout</button>
						</div>
					</div>
					<Chat />
					<ChatInput />
				</div>
			)}
		</>
	);
}
