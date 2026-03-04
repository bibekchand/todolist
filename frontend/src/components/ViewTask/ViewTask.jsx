import axios from "axios";
export default function ViewTask({ id, title, description, time, status, fetchTaskList }) {
	function deletePost() {
		axios.delete(`http://localhost:8000/delete_list/${id}`).then((response) => {
			console.log(response);
            fetchTaskList();
		});
	}
	return (
		<div className="p-4">
			<div className="flex justify-between">
				<div>{title}</div>
				<div>{time}</div>
			</div>
			<div>{description}</div>
			<div>{status}</div>
			<button
				onClick={deletePost}
				type="button"
				className="w-fit border-2 p-1 hover:text-2xl  duration-75 cursor-pointer"
			>
				Delete
			</button>
		</div>
	);
}
