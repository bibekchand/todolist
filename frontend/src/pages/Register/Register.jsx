import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
export default function Register() {
	const navigate = useNavigate();
	function signUp(formData) {
		axios
			.post("http://localhost:8000/sign_up", {
				username: formData.get("username"),
				password: formData.get("password"),
				email: formData.get("email"),
			})
			.then((response) => {
                console.log("Succesfull")
                console.log(response)
				toast.success("Logged in successfully");
				setTimeout(() => {
					navigate("/login");
				}, 1000);
			})
			.catch((error) => {
                console.log("Error")
                console.log("Error=>", error.response.status)
                if (error.response.status === 409) {
                    toast.error("Choose another username")
                }
                else if (error.response.status === 422) {
                    toast.error("Form not valid")
                }
                else {
                    toast.error("Unkown error")
                }
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
				<Toaster position="top-center" />
			</div>
		</>
	);
}
