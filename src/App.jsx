import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Main from "./layout/Main";

// Components
import Home from "./components/Home";
import Chat from "./components/Chat";

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
				element: <Chat />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
