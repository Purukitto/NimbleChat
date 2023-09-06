import dayjs from "dayjs";

export default function Message({ id, message }) {
	const isBot = message.user.fName === "NBX Weather";

	return (
		<div className={`py-5 text-white ${isBot && "bg-slate-700"}`}>
			<div className="flex space-x-5 px-10 max-w-4xl mx-auto items-center">
				<img
					src={message.user.avatar}
					alt="avatar"
					className="h-8 w-8"
				/>
				<div>
					<div className="flex text-xs text-slate-400 space-x-2">
						<h3>{message.user.fName}</h3>
						<h4>
							({dayjs(message.created_at).format("DD/MM HH:mm")})
						</h4>
					</div>

					<p className="pt-1 text-sm">{message.text}</p>
				</div>
			</div>
		</div>
	);
}
