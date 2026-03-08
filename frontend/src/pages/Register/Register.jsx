import axios from "axios";
export default function Register() {
	function signUp(formData) {
		axios.post("http://localhost:8000/sign_up", {
			username: formData.get("username"),
			password: formData.get("password"),
			email: formData.get("email"),
		});
	}
	return (
		<>
			<div className="text-2xl text-center">Give me all your data</div>
			<div className="flex p-2 justify-center">
				<form action={signUp} className="flex flex-col justify-center gap-2">
					<input
						type="text"
						name="username"
						placeholder="Username"
						className="border-2 p-2"
					/>
					<input
						type="text"
						name="password"
						placeholder="Password"
						className="border-2 p-2"
					/>
					<input
						type="text"
						name="email"
						placeholder="Email"
						className="border-2 p-2"
					/>
					<button
						type="submit"
						className="border-2 shadow shadow-amber-600 active:shadow-amber-50"
					>
						Sign Up
					</button>
				</form>
			</div>
		</>
	);
}
