import axios from "axios";
import { baseURL } from "../config.";

const getTokenHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const getSearchedTaskList = (searchText) => {
	console.log(searchText);
	axios
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
//Fetch info it can also be done the other way but let's do this to decode from token

const getAllTaskListFromServer= () => {
	console.log("Fetched data from server");
	axios
		.get(`${baseURL}/get_list/`, {
			headers: getTokenHeader(),
		})
		.then((response) => {
			console.log(response);
			setTaskList(response.data);
		});
}
function postDataToServer(formData) {
	axios
		.post(`${baseURL}/addTask`, {
			title: formData.get("title"),
			description: formData.get("description"),
			time: formData.get("time"),
			status: formData.get("status") === "on" ? true : false,
		})
		.then(() => {
			console.log("Sent data to server");
		})
		.catch((error) => {
			console.log(error);
		});
	fetchDataFromServer();
}
