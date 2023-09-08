/*
 * Layout for the website
 */

import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Main() {
	return (
		<div className="flex">
			<div className="bg-mainBackground flex-1 h-screen">
				<Outlet />
				<Toaster
					position="top-center"
					reverseOrder={false}
					gutter={8}
					containerClassName=""
					containerStyle={{}}
					toastOptions={{
						// Define default options
						className: "",
						duration: 5000,
						style: {
							background: "#363636",
							color: "#fff",
						},
						success: {
							duration: 3000,
							theme: {
								primary: "green",
								secondary: "black",
							},
						},
					}}
				/>
			</div>
		</div>
	);
}
