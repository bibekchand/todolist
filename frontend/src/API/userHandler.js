import axios from "axios";
import { baseURL } from "../config.js";

const getTokenHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem("token")}`,
});
export const getUserInfo = () => {
	return axios
		.get(`${baseURL}/get_current_user`, {
			headers: getTokenHeader(),
		})
		.then((response) => {
			return { username: response.data.username, email: response.data.email };
		})
		.catch((error) => {
			throw error;
		});
};
export const postLoginInfoToServer = (username, password) => {
	return axios
		.post(
			`${baseURL}/login`,
			{
				username: username,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		)
		.then((response) => {
			console.log(response.data);
			const token = response.data.access_token;
			localStorage.setItem("token", token);
			console.log("Logged in successfully");
		})
		.catch((error) => {
			console.log("Login failed");
			throw error;
		});
};
export const signUpUser = (formData) => {
	return axios
		.post(`${baseURL}/sign_up`, {
			username: formData.get("username"),
			password: formData.get("password"),
			email: formData.get("email") || "NA",
		})
};
