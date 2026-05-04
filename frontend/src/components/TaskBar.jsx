import Flatpickr from "react-flatpickr";
export default function TaskBar() {
    return (
        <div className="fixed border z-1 bg-white border-gray-300 p-2 w-[60vw] h-[20vh] top-[20%] left-[20%]  shadow-lg/50 rounded-2xl">
            <form action="" className="flex flex-col">
                <input
                    name="taskTitle"
                    type="text"
                    className="text-2xl focus:outline-0"
                    placeholder="Task Name"
                />
                <input
                    name="taskDescription"
                    type="text"
                    className="focus:outline-0"
                    placeholder="Description"
                />
                <div className="mt-2">
                    <input
                        type="date"
                        name="dateTime"
                        className="w-fit border focus:outline-none"
                        placeholder="date"
                    />
                    <input
                        type="time"
                        name="dateTime"
                        className="w-fit border focus:outline-none"
                        placeholder="date"
                    />
                </div>
                <Flatpickr />
            </form>
        </div>
    );
}
