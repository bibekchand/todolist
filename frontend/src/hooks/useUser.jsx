import { useState } from "react";
import { useNavigate } from "react-router";
import { getUserInfo } from "../API/userHandler.js";
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
	return [fetchUserInfo, signOut];
}
