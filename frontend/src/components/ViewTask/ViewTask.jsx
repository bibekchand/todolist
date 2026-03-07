import axios from "axios";
export default function ViewTask({
	id,
	title,
	description,
	time,
	status,
	fetchTaskList,
	showDeleteButton = true,
}) {
	function deletePost() {
		axios.delete(`http://localhost:8000/delete_list/${id}`).then((response) => {
			console.log(response);
			fetchTaskList();
		});
	}
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
					onClick={deletePost}
					type="button"
					className="w-fit border-2 p-1 hover:text-2xl  duration-75 cursor-pointer hover:bg-gray-500 ease-in-out"
				>
					Delete
				</button>
			)}
		</div>
	);
}
