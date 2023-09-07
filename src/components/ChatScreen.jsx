import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../store/userSlice";
import toast from "react-hot-toast";
import { Dna } from "react-loader-spinner";

export default function ChatScreen() {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchUser()).then((res) => {
			if (res.error) {
				navigate("/");
			} else toast.success("Logged in successfully! 🎉");
		});
	}, []);

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<>
			{user.data.user_metadata && !user.error ? (
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
			) : (
				<div className=" flex flex-col h-screen text-white">
					<div className="flex justify-between bg-slate-950">
						<div>
							<h1 className="text-xl font-semibold my-2 ml-8">
								Nimble Chat
							</h1>
						</div>
					</div>
					<div className="flex-1 text-center mt-10 text-lg font-semibold">
						Please wait while we log you in...
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
					</div>
				</div>
			)}
		</>
	);
}
