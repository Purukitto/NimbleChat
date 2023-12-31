/*
 * Main chat screen component.
 *
 * - Fetching user data from Supabase
 * - Fetching user location from browser
 * - Logging out the user
 * - Rendering the chat stream
 * - Rendering the chat input
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../store/userSlice";
import { setError, setLocation } from "../store/geoLocationSlice";

import toast from "react-hot-toast";
import { Dna } from "react-loader-spinner";

// Components
import ChatInput from "./ChatInput";
import ChatStream from "./ChatStream";

export default function ChatScreen() {
	let navigate = useNavigate();

	// Redux
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const geoLocation = useSelector((state) => state.geolocation);

	useEffect(() => {
		// Fetch user data and redirect to login page if not logged in
		dispatch(fetchUser()).then((res) => {
			if (res.error) {
				navigate("/");
			} // Show success toast if logged in successfully
			else toast.success("Logged in successfully! 🎉");
		});
	}, []);

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					dispatch(
						setLocation({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						})
					);
					toast.success("Location loaded! 🌏");
				},
				(error) => {
					dispatch(setError(`Error: ${error.message}`));
				}
			);
		} else {
			dispatch(setError("Geolocation is not available in your browser."));
		}
	}, []);

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<>
			{user.data.user_metadata && !user.error ? (
				// If user data is fetched and no error, show chat screen
				<div className="flex flex-col h-screen overflow-hidden">
					<div className="flex justify-between bg-darkPrimary text-white">
						<div>
							<h1 className="text-xl font-semibold my-2 ml-8">
								Nimble Chat
							</h1>
						</div>
						<div className="flex items-center space-x-4 my-2 mr-8">
							{/* Display current location if available */}
							<div className="flex items-center space-x-2">
								{geoLocation && geoLocation.longitude && geoLocation.latitude ? (
									<>
										📍
										<p className="text-sm">
											{geoLocation.latitude.toFixed(2)}°,{" "}
											{geoLocation.longitude.toFixed(2)}°
										</p>
									</>
								) : (
									<p className="text-sm">
										📍 Location not available
									</p>
								)}
							</div>
							{/* User image and logout button */}
							<div className="flex items-center space-x-2">
								<img
									src={user.data.user_metadata.avatar_url}
									alt="avatar"
									className="h-8 w-8 rounded-full"
								/>
								<button onClick={handleLogout}>Logout</button>
							</div>
						</div>
					</div>
					<ChatStream />
					<ChatInput />
				</div>
			) : (
				// If user data is not fetched or there is an error, show loading screen
				<div className=" flex flex-col h-screen text-white">
					<div className="flex justify-between bg-darkPrimary">
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
