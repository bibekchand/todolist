import axios from "axios";
import { useNavigate }  from "react-router";
import { useEffect, useState } from "react";
export default function Login() {
    const navigate = useNavigate()
	const [loginFailed, setLoginFailed] = useState(false);
	useEffect(() => {
		if (loginFailed) {
			setTimeout(() => {
				setLoginFailed(false);
			}, 2000);
		}
	}, [loginFailed]);
	function login(formData) {
		console.log(formData.get("username"));
		axios
			.post(
				"http://localhost:8000/login",
				{
					username: formData.get("username"),
					password: formData.get("password"),
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			)
			.then((response) => {
				console.log(response.data);
                const token = response.data.access_token
                localStorage.setItem("token", token)
                navigate("/")
				console.log("Logged in successfully");
			})
			.catch((error) => {
				console.log(error);
                setLoginFailed(true)
				console.log("Login failed");
			});
	}
	return (
		<div className="flex justify-center p-2">
			<form action={login} className="flex flex-col gap-2 justify-center">
				<input
					type="text"
					placeholder="Username"
					name="username"
					className="border-2 p-0.5"
				/>
				<input
					type="text"
					placeholder="Password"
					name="password"
					className="border-2 p-0.5"
				/>
				<button
					type="submit"
					className="border-2 shadow shadow-amber-800 active:shadow-amber-50"
				>
					Login
				</button>
				{loginFailed && <div className="text-red-500">Login Failed</div>}
			</form>
		</div>
	);
}
