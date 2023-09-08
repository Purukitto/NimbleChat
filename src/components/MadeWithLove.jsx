export default function MadeWithLove({ center = false }) {
	return (
		<div
			className={`text-xs mt-2 text-textSecondary ${
				center && "text-center"
			}`}
		>
			Made with ♥️ by{" "}
			<a
				className=" underline underline-offset-1 font-semibold"
				href="https://github.com/Purukitto"
			>
				Purukitto
			</a>
		</div>
	);
}
