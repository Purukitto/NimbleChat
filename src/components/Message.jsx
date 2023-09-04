export default function Message({ id, message }) {
	const isBot = message.user.id === "BOT"; //TODO: Replace with your bot id
	return (
		<div className={`py-5 text-white ${isBot && "bg-slate-700"}`}>
			<div className="flex space-x-5 px-10 max-w-2xl mx-auto">
				<img
					src={message.user.avatar}
					alt="avatar"
					className="h-8 w-8"
				/>
				<p className="pt-1 text-sm">{message.text}</p>
			</div>
		</div>
	);
}
