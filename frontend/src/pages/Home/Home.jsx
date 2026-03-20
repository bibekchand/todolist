import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import ViewTask from "../../components/ViewTask/ViewTask.jsx";
import ViewModal from "../../components/Modal/ViewModal.jsx";
import toast, { Toaster } from "react-hot-toast";
import { baseURL } from "../../config.js";
export default function App() {
	const navigate = useNavigate();
	const dialogRef = useRef(null);
	function toggleDialog() {
		if (!dialogRef.current) {
			return;
		}
		console.log("I am clicked");
		dialogRef.current.hasAttribute("open")
			? dialogRef.current.close()
			: dialogRef.current.showModal();
	}
	function signOut() {
		localStorage.clear();
		navigate("/login");
	}
	const [username, setUsername] = useState("NA");
	const [userEmail, setUserEmail] = useState("NA");
	const [searchedTaskList, setSearchedTaskList] = useState([]);
	const [taskList, setTaskList] = useState([]);
	function searchTasks(formData) {
		const searchText = formData.get("searchText");
		console.log(searchText);
		axios
			.get(`${baseURL}/searchTasks?searchText=${searchText}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				console.log(response);
				setSearchedTaskList(response.data);
			})
			.catch(() => {
				console.log("Error");
			});
	}
	//Fetch info it can also be done the other way but let's do this to decode from token
	function fetchUserInfo() {
		axios
			.get(`${baseURL}/get_current_user`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				setUsername(response.data.username);
				setUserEmail(response.data.email);
			})
			.catch(() => {
				toast.error("Token expired, please login again");
			});
	}
	function fetchDataFromServer() {
		console.log("Fetched data from server");
		axios
			.get(`${baseURL}/get_list/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
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
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		} else {
			fetchUserInfo();
			fetchDataFromServer();
		}
	}, []);
	return (
		<>
			<div
				className="text-4xl fixed bottom-0 right-0 h-fit w-fit bg-gray-600 p-2 m-2 rounded-full hover:after:content-['AddTask'] transition-all duration-100 ease-in-out cursor-pointer"
				onClick={toggleDialog}
			>
				+
			</div>
			<nav className="flex justify-between">
				<div>
					user: {username}, email: {userEmail}
				</div>
				<div>
					<button
						type="button"
						className="text-red-500 p-2 cursor-pointer underline"
						onClick={signOut}
					>
						{" "}
						Sign out
					</button>
				</div>
			</nav>
			<div>
				<ViewModal toggleDialog={dialogRef}>
					<div className="flex justify-center flex-col">
						<button
							type="button"
							className="ml-auto p-1"
							onClick={toggleDialog}
						>
							Close
						</button>
						<form action={postDataToServer}>
							<fieldset className="p-5 w-2.5 rounded-2xl flex flex-col gap-5 items-center">
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
								<button
									type="submit"
									className="cursor-pointer border-2 w-fit p-1"
								>
									Submit
								</button>
							</fieldset>
						</form>
					</div>
				</ViewModal>
			</div>
			<form action={searchTasks}>
				<div className="p-2 flex justify-center">
					<input
						type="text"
						name="searchText"
						className="border-2"
						placeholder="Search Tasks"
					/>
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

			<Toaster position="bottom-center" />
		</>
	);
}
