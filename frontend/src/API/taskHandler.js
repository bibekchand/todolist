import axios from "axios";
import { baseURL } from "../config.js";

const getTokenHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem("token")}`,
});
export const getSearchedTaskList = (searchText) => {
	console.log(searchText);
	return axios
		.get(`${baseURL}/searchTasks?searchText=${searchText}`, {
			headers: getTokenHeader(),
		})
		.then((response) => {
			console.log(response);
			return response.data;
		})
		.catch(() => {
			console.log("Error");
		});
};
export const getAllTaskListFromServer = () => {
	console.log("Fetched data from server");
	return axios
		.get(`${baseURL}/get_list/`, {
			headers: getTokenHeader(),
		})
		.then((response) => {
			console.log(response);
			return response.data;
		});
};
export const postTaskToServer = (title, description, time, status) => {
	return axios
		.post(
			`${baseURL}/addTask`,
			{
				title: title,
				description: description,
				time: time,
				status: status === "on" ? true : false,
			},
			{
				headers: getTokenHeader(),
			},
		)
		.then(() => {
			console.log("Sent data to server");
		})
		.catch((error) => {
			throw new Error("Something went wrong with server");
		});
};

export const deleteTaskFromServer = (id) => {
	axios.delete(`http://localhost:8000/delete_list/${id}`).then((response) => {
		console.log(response);
	});
};
