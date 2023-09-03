import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<div className="">
			<form>
				<Outlet />
			</form>
		</div>
	);
}
