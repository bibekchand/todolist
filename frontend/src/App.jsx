export default function App() {
	function doSomething(data) {
		console.log(data.get("myData"));
		console.log("Submitted");
	}
	return (
		// biome-ignore lint/complexity/noUselessFragments:Something
		<>
			<form action={doSomething}>
				<input className="border-2" name="myData" />
				<button type="submit">Add</button>
			</form>
		</>
	);
}
