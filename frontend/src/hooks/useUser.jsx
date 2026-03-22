import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
	getUserInfo,
	postLoginInfoToServer,
	signUpUser,
} from "../API/userHandler.js";
export default function useUser() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("NA");
	const [userEmail, setUserEmail] = useState("NA");
	async function fetchUserInfo() {
		const userInfo = await getUserInfo();
		setUsername(userInfo.username);
		setUserEmail(userInfo.email);
	}
	async function signUp(formData) {
		try {
			await signUpUser(formData);
		} catch (error) {
			console.log("Error=>", error?.response?.status);
			if (error?.response?.status === 409) {
				toast.error("Choose another username");
			} else if (error?.response?.status === 422) {
				toast.error("Form not valid");
			} else {
				toast.error("Unkown error");
			}
		}
	}
	function signOut() {
		localStorage.clear();
		navigate("/login");
	}
	async function login(formData) {
		try {
			await postLoginInfoToServer(
				formData.get("username"),
				formData.get("password"),
			);
			toast.success("Logged in successfully");
			navigate("/");
		} catch {
			toast.error("Log in failed");
		}
	}
	return [username, userEmail, fetchUserInfo, signOut, login, signUp];
}
