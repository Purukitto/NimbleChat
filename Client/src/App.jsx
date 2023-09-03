import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Main from "./layout/Main";

// Components
import Home from "./components/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
