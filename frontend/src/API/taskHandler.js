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
};
export const getAllTaskListFromServer = () => {
	console.log("Fetched data from server");
	return axios.get(`${baseURL}/get_list/`, {
		headers: getTokenHeader(),
	});
};
export const postTaskToServer = (title, description, time, status) => {
	return axios.post(
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
	);
};
export const deleteTaskFromServer = (id) => {
	return axios.delete(`${baseURL}/delete_list/${id}`);
};
