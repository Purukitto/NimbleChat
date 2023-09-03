import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<div className="flex">
			<div className="bg-[#343541] flex-1 h-screen">
				<Outlet />
			</div>
		</div>
	);
}
