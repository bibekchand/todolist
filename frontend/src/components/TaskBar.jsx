import InboxIcon from "../assests/inbox.svg?react";
import { useState } from "react";
export default function TaskBar() {
    const [toggleList, setToggleList] = useState(false);
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
            </form>
            <button type="button" className="border p-2 relative">
                <span onClick={() => setToggleList(!toggleList)}>The Button</span>
                {toggleList && (
                    <div className="border-2 absolute top-full left-[20%] bg-white">
                        <ul>
                            <li>First</li>
                            <li>Second</li>
                            <li>Third</li>
                        </ul>
                    </div>
                )}
            </button>
        </div>
    );
}
