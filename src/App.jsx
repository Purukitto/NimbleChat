/*
* App Component
*/

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Main from "./layout/Main";

// Components
import Home from "./components/Home";
import ChatScreen from "./components/ChatScreen";

// Router
const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "chat",
				element: <ChatScreen />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
