import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewTask from "./components/ViewTask/ViewTask.jsx";
export default function App() {
	const [searchedTaskList, setSearchedTaskList] = useState([]);
	const [taskList, setTaskList] = useState([]);
	function searchTasks(formData) {
		const searchText = formData.get("searchText");
		console.log(searchText);
		axios
			.get(`http://localhost:8000/searchTasks?searchText=${searchText}`)
			.then((response) => {
				console.log(response);
				setSearchedTaskList(response.data);
			})
			.catch((error) => {
				console.log("Error");
			});
	}
	function fetchDataFromServer() {
		console.log("Fetched data from server");
		axios.get("http://localhost:8000/get_list/").then((response) => {
			console.log(response);
			setTaskList(response.data);
		});
	}
	function postDataToServer(formData) {
		axios
			.post("http://localhost:8000/addTask", {
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
	useEffect(() => {
		fetchDataFromServer();
	}, []);
	return (
		<>
			<form action={searchTasks}>
				<div className="p-2 flex justify-center">
					<input type="text" name="searchText" className="border-2" />
					<button type="submit" className="border-2">
						Search
					</button>
				</div>
				{searchedTaskList.length !== 0 && (
					<div className=" pl-2.5 text-2xl">Searched Tasks</div>
				)}
				{searchedTaskList?.map((item) => (
					<ViewTask
						key={item.id}
						title={item.title}
						description={item.description}
						time={item.time}
						status={item.status ? "Completed" : "Pending"}
						showDeleteButton={false}
					/>
				))}
			</form>
			<div className="flex justify-center">
				<form action={postDataToServer}>
					<fieldset className="border-2 p-5 w-2.5 rounded-2xl flex flex-col gap-5 items-center">
						<legend>Add Task</legend>
						<label htmlFor="title">
							Title:
							<input name="title" id="title" className="border-2" />
						</label>
						<label htmlFor="description">
							Description:
							<textarea
								name="description"
								id="description"
								className="border-2"
								maxLength="200"
							/>
						</label>
						<label htmlFor="time">
							Time:
							<input name="time" id="time" className="border-2" />
						</label>
						<label className="flex gap-2 justify-center item-center">
							Status:
							<input
								type="checkbox"
								name="status"
								defaultChecked={true}
								className="h-5 w-5"
							/>
						</label>
						<button type="submit" className="cursor-pointer border-2 w-fit p-1">
							Submit
						</button>
					</fieldset>
				</form>
			</div>

			{taskList.length !== 0 && (
				<div className=" pl-2.5 text-2xl">All Tasks</div>
			)}
			{taskList?.map((item) => (
				<ViewTask
					key={item.id}
					id={item.id}
					title={item.title}
					description={item.description}
					time={item.time}
					status={item.status ? "Completed" : "Pending"}
					fetchTaskList={fetchDataFromServer}
				/>
			))}
		</>
	);
}
