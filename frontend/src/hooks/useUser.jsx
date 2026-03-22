import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getUserInfo, postLoginInfoToServer } from "../API/userHandler.js";
import toast from "react-hot-toast"
export default function useUser() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("NA");
	const [userEmail, setUserEmail] = useState("NA");
	async function fetchUserInfo() {
		const userInfo = await getUserInfo();
		setUsername(userInfo.username);
		setUserEmail(userInfo.email);
	}
	function signOut() {
		localStorage.clear();
		navigate("/login");
	}
	async function login(formData) {
		try {
			await postLoginInfoToServer(formData.get("username"), formData.get("password"));
            toast.success("Logged in successfully")
            navigate("/")
		} catch {
            toast.error("Log in failed")
		}
	}
	return [username, userEmail, fetchUserInfo, signOut, login];
}
