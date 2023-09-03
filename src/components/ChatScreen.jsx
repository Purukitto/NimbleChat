import { useEffect, useState } from "react";
import supabase from "../helper/supabase";
import { useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";
import Chat from "./Chat";

export default function ChatScreen() {
	let navigate = useNavigate();
	const [user, setUser] = useState(null); // User details

	useEffect(() => {
		// Redirect user to home page if not logged in or session expires
		// Update user state if logged in
		supabase.auth.getSession().then((res) => {
			const session = res.data.session;
			if (!session) navigate("/");
			else setUser(session.user);
		});
	}, []);

	const logoutUser = async () => {
		await supabase.auth.signOut();
		navigate("/");
	};

	return (
		<>
			{user && (
				<div className="flex flex-col h-screen overflow-hidden">
					<div className="flex justify-end mr-5 mt-2">
						<div className="flex items-center space-x-2">
							<img
								src={user.user_metadata.avatar_url}
								alt="avatar"
								className="h-8 w-8 rounded-full"
							/>
							<button onClick={logoutUser}>Logout</button>
						</div>
					</div>
					<Chat />
					<ChatInput />
				</div>
			)}
		</>
	);
}
