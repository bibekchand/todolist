import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import ViewModal from "../../components/Modal/ViewModal.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";
import ViewTask from "../../components/ViewTask/ViewTask.jsx";
import useDialog from "../../hooks/useDialog.jsx";
import useTasks from "../../hooks/useTasks.jsx";
import useUser from "../../hooks/useUser.jsx";
export default function App() {
	const navigate = useNavigate();
	const dialogRef = useRef(null);
	const toggleDialog = useDialog(dialogRef);
	const [username, userEmail, fetchUserInfo, signOut] = useUser();
	const [
		taskList,
		searchedTaskList,
		addTask,
		searchTasks,
		fetchUsersAllTaskList,
	] = useTasks();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) navigate("/login");
		else {
			fetchUserInfo();
			fetchUsersAllTaskList();
		}
	}, []);
	return (
		<>
			<ProfileCard />
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
					<div
						onClick={signOut}
						className="text-red-500 p-2 cursor-pointer underline"
					>
						Sign Out
					</div>
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
						<form action={addTask}>
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
				{searchedTaskList?.length !== 0 && (
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
			{taskList?.length !== 0 && (
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
					fetchTaskList={fetchUsersAllTaskList}
				/>
			))}
			<Toaster position="bottom-center" />
		</>
	);
}
