import axios from "axios";
import useTasks from "../../hooks/useTasks.jsx";
export default function ViewTask({
	id,
	title,
	description,
	time,
	status,
	fetchTaskList,
	showDeleteButton = true,
}) {
	const [, , , , , deleteTask] = useTasks();
	return (
		<div className="p-4 border-2 m-2 hover:text-2xl cursor-pointer duration-500 ease-in-out">
			<div className="flex justify-between">
				<div>{title}</div>
				<div>{time}</div>
			</div>
			<div>{description}</div>
			<div>{status}</div>
			{showDeleteButton && (
				<button
					onClick={() => deleteTask(id)}
					type="button"
					className="w-fit border-2 p-1 hover:text-2xl  duration-75 cursor-pointer hover:bg-gray-500 ease-in-out"
				>
					Delete
				</button>
			)}
		</div>
	);
}
