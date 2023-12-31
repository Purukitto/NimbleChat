/*
 * Home page component
 *
 * - Renders the home page
 * - Handles login
 */

import supabase from "../helper/supabase";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import TypewriterComponent from "typewriter-effect";
import MadeWithLove from "./MadeWithLove";

export default function Home() {
	const handleLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: "https://jazzy-pavlova-932105.netlify.app/chat", // this is the url of the deployed app
			},
		});
	};

	return (
		<div className="flex flex-col md:flex-row h-screen text-white bg-darkBackground">
			<div className="flex-1 bg-botBackground p-8 max-w-4xl">
				<div className="flex items-center space-x-2">
					<img
						src="https://cdn-icons-png.flaticon.com/512/9231/9231625.png"
						className="h-6 w-6"
					/>
					<h1 className="text-xl font-semibold">Nimble Chat</h1>
				</div>
				<div className="flex h-5/6 items-center">
					<TypewriterComponent
						options={{
							strings: [
								"What is the AQI of Bengaluru?",
								"Give me the forecast for Noida!",
								"Tell me about the weather in New Delhi!",
								"Can you tell me something about tornadoes?",
								"When is a good time to visit Goa?",
							],
							autoStart: true,
							loop: true,
							cursorClassName: "text-3xl",
							wrapperClassName: "text-3xl font-semibold",
						}}
					/>
				</div>
				<MadeWithLove />
			</div>
			<div className="m-auto px-12 py-24 space-y-4">
				<p className="text-center text-3xl font-semibold">
					Start asking
				</p>
				<ChevronDoubleDownIcon className="m-auto h-8 w-8" />
				<button
					onClick={handleLogin}
					className="py-2 px-4 flex justify-center items-center bg-gray-600 hover:bg-gray-700 w-full font-semibold shadow-md rounded-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="mr-2"
						viewBox="0 0 1792 1792"
					>
						<path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
					</svg>
					Sign in with GitHub
				</button>
			</div>
		</div>
	);
}
