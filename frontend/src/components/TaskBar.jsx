import { DatePicker, DateField, Calendar } from "@heroui/react";
import { Label, TimeField } from "@heroui/react";
import InboxIcon from "../assests/inbox.svg?react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useState, useRef, useEffect } from "react";
export default function TaskBar({ openTaskBar, setToggleTaskBar }) {
    const [toggleList, setToggleList] = useState(false);
    const taskBarRef = useRef(null);
    useEffect(() => {
        const handler = (event) => {
            console.log(event.target.classList);
            if (!taskBarRef?.current?.contains(event.target)) {
                setToggleTaskBar(false);
            }
        };
        if (openTaskBar) document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
            console.log("Removing event listener");
        };
    }, [openTaskBar]);

    function onSubmit(form) {
        console.log(form);
    }
    return (
        <div
            ref={taskBarRef}
            className="fixed border z-1 bg-white border-gray-300 dark:bg-black dark:text-white p-2 w-[60vw] h-fit top-[20%] left-[20%]  shadow-lg/50 rounded-2xl"
        >
            <form action={onSubmit} className="flex flex-col">
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
                    <DatePicker className="w-60" name="date">
                        <Label>Date</Label>
                        <DateField.Group fullWidth>
                            <DateField.Input>
                                {(segment) => <DateField.Segment segment={segment} />}
                            </DateField.Input>
                            <DateField.Suffix>
                                <DatePicker.Trigger>
                                    <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                            </DateField.Suffix>
                        </DateField.Group>
                        <DatePicker.Popover>
                            <Calendar aria-label="Event date">
                                <Calendar.Header>
                                    <Calendar.YearPickerTrigger>
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator />
                                    </Calendar.YearPickerTrigger>
                                    <Calendar.NavButton slot="previous" />
                                    <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                    <Calendar.GridHeader>
                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                    </Calendar.GridHeader>
                                    <Calendar.GridBody>
                                        {(date) => <Calendar.Cell date={date} />}
                                    </Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                    <Calendar.YearPickerGridBody>
                                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                                    </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                            </Calendar>
                        </DatePicker.Popover>
                    </DatePicker>
                    <TimeField className="w-[256px]" name="time">
                        <Label>Time</Label>
                        <TimeField.Group>
                            <TimeField.Input>
                                {(segment) => <TimeField.Segment segment={segment} />}
                            </TimeField.Input>
                        </TimeField.Group>
                    </TimeField>
                </div>
            </form>

            <button type="button" className="border p-2 relative">
                <span onClick={() => setToggleList(!toggleList)}>The Button</span>
                {toggleList && (
                    <div className="border-2 absolute top-full left-[20%] bg-white dark:bg-black dark:text-white">
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
