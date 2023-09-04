import { useEffect, useState } from "react";
import supabase from "../helper/supabase";

export default function Chat() {
	const [user, setUser] = useState(null); // User details

	useEffect(() => {
		supabase.auth.getSession().then((res) => {
			const session = res.data.session;
			setUser(session.user);
		});
	}, []);

	return (
		<div className="flex-1">
			<h1>Hi</h1>
		</div>
	);
}
