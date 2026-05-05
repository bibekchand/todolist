import InboxIcon from "../assests/inbox.svg?react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useState, useRef } from "react";
export default function TaskBar() {
    const [toggleList, setToggleList] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const flatPickerTimeRef = useRef(null);
    const flatPickerRef = useRef(null);
    const toggleFlatpickr = () => {
        if (flatPickerRef.current?.flatpickr?.isOpen) {
            flatPickerRef.current?.flatpickr.close();
        } else flatPickerRef.current?.flatpickr.open();
    };

    const toggleFlatpickrTime = () => {
        if (flatPickerTimeRef.current?.flatpickr?.isOpen) {
            flatPickerTimeRef.current?.flatpickr.close();
        } else flatPickerTimeRef.current?.flatpickr.open();
    };
    return (
        <div className="fixed border z-1 bg-white border-gray-300 p-2 w-[60vw] h-fit top-[20%] left-[20%]  shadow-lg/50 rounded-2xl">
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
                <div className="relative flex gap-2 w-fit mt-2">
                    <button
                        type="button"
                        onClick={toggleFlatpickr}
                        className="border p-2 hover:bg-gray-300 cursor-pointer active:font-bold"
                    >
                        {" "}
                        Date :{" "}
                        {date.toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                        })}
                    </button>
                    <button
                        type="button"
                        onClick={toggleFlatpickrTime}
                        className="border p-2 hover:bg-gray-300 cursor-pointer active:font-bold"
                    >
                        {" "}
                        Time :{" "}
                        {time.toLocaleString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </button>
                    <Flatpickr
                        ref={flatPickerRef}
                        value={date}
                        onChange={(selectedDates) => {
                            setDate(selectedDates[0]);
                        }}
                        options={{
                            clickOpens: false,
                            disableMobile: true,
                        }}
                        className="absolute left-0"
                        style={{
                            pointerEvents: "none",
                            opacity: 0,
                            width: 0,
                            overflow: "hidden",
                        }}
                    />
                    <Flatpickr
                        ref={flatPickerTimeRef}
                        value={time}
                        onChange={(d) => setTime(d[0])}
                        options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: false,
                            clickOpens: false,
                            disableMobile: true,
                        }}
                        style={{
                            pointerEvents: "none",
                            opacity: 0,
                            width: 0,
                            overflow: "hidden",
                        }}
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
