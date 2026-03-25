import { useState } from "react";
import toast from "react-hot-toast";
import {
	deleteTaskFromServer,
	getAllTaskListFromServer,
	getSearchedTaskList,
	postTaskToServer,
} from "../API/taskHandler.js";
export default function useTasks() {
	const [searchedTaskList, setSearchedTaskList] = useState([]);
	const [taskList, setTaskList] = useState([]);
	async function searchTasks(formData) {
		try {
			const searchText = formData.get("searchText");
			const result = await getSearchedTaskList(searchText);
			console.log(result);
			setSearchedTaskList(result);
		} catch (error) {
			console.log("Error=>", error);
		}
	}
	async function fetchUsersAllTaskList() {
		try {
			const result = await getAllTaskListFromServer();
			setTaskList(result);
			console.log(taskList);
		} catch (error) {
			console.log("Error=>", error);
		}
	}
	async function addTask(formData) {
		try {
			await postTaskToServer(
				formData.get("title"),
				formData.get("description"),
				formData.get("time"),
				formData.get("status"),
			);
			toast.success("Task added successfully");
		} catch (error) {
			console.log("Error=>", error);
			toast.error("Some error");
		}
	}
	async function deleteTask(id) {
		try {
			await deleteTaskFromServer(id);
		} catch (error) {
			console.log("Error=>", error);
		}
	}
	return [
		taskList,
		searchedTaskList,
		addTask,
		searchTasks,
		fetchUsersAllTaskList,
		deleteTask,
	];
}
