import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Main() {
	return (
		<div className="flex">
			<Sidebar />

			{/* TODO: ClientProvider */}
			<div className="bg-[#343541] flex-1">
				<Outlet />
			</div>
		</div>
	);
}
