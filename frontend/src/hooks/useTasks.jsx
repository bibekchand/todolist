import { useState } from "react";
import toast from "react-hot-toast"
import {
	getAllTaskListFromServer,
	getSearchedTaskList,
	postTaskToServer,
} from "../API/taskHandler.js";
export default function useTasks() {
	const [searchedTaskList, setSearchedTaskList] = useState([]);
	const [taskList, setTaskList] = useState([]);
	async function searchTasks(formData) {
		const searchText = formData.get("searchText");
		const result = await getSearchedTaskList(searchText);
        console.log(result)
		setSearchedTaskList(result);
	}
	async function fetchUsersAllTaskList() {
		const result = await getAllTaskListFromServer();
		setTaskList(result);
        console.log(taskList)
	}
	async function addTask(formData) {
        try{
		await postTaskToServer(
			formData.get("title"),
			formData.get("description"),
			formData.get("time"),
			formData.get("status"),
		);
            toast.success("Task added successfully")
        }
        catch(error) {
            toast.error("Some error")
        }
	}
	return [
		taskList,
		searchedTaskList,
		addTask,
		searchTasks,
		fetchUsersAllTaskList,
	];
}
