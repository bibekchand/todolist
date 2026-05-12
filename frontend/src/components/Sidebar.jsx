import { useState } from "react";
import AddIcon from "../assests/add.svg?react";
import catImage from "../assests/cato.avif";
import NotificationIcon from "../assests/notification.svg?react";
import SearchIcon from "../assests/SearchIcon.svg?react";
import SideBarIcon from "../assests/sidebar.svg?react";
import InboxIcon from "../assests/inbox.svg?react";
import SearchBar from "./SearchBar.jsx";
import TaskBar from "./TaskBar.jsx";
const projectsList = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eight",
];
export default function Sidebar({ toggleSidebar, setToggleSidebar }) {
    const [username, setUsername] = useState("Ram Shah");
    const [toggleSearchBar, setToggleSearchBar] = useState(false);
    const [openTaskBar, setToggleTaskBar] = useState(false);
    const [toggleProjectsList, setToggleProjectsList] = useState(false);
    return (
        <>
            <div className="fixed top-5 pl-5 ">
                {" "}
                {toggleSidebar || (
                    <button
                        className="cursor-pointer"
                        type="button"
                        onClick={() => setToggleSidebar(!toggleSidebar)}
                    >
                        <SideBarIcon className="fill-black" />
                    </button>
                )}
            </div>
            {toggleSidebar && (
                <div
                    className="fixed md:hidden bg-gray-500 opacity-20 h-screen w-screen ease-in-out transition-all"
                    onClick={() => setToggleSidebar(false)}
                ></div>
            )}
            <div
                className={`flex p-2 h-screen fixed flex-col top-0 gap-5 overflow-scroll transition-transform duration-500 ease-in-out bg-gray-100 md:sticky opacity-90 grow-0 ${toggleSidebar ? "translate-x-0" : " -translate-x-full"}`}
            >
                <div className="flex items-center gap-5">
                    <div className="flex rounded-[5px] items-center gap-2 p-2 hover:bg-gray-500 duration-200 ease-in-out cursor-pointer">
                        <div className="h-10 w-10 rounded-full overflow-clip">
                            <img src={catImage} alt="" />
                        </div>
                        <span>{username}</span>
                        <span className="rotate-90"> &gt;</span>
                    </div>
                    <NotificationIcon className="fill-black hover:fill-gray-300 duration-100 ease-in-out cursor-pointer" />
                    <SideBarIcon
                        onClick={() => setToggleSidebar(!toggleSidebar)}
                        className="fill-black hover:fill-gray-300  duration-100 ease-in-out cursor-pointer"
                    />
                </div>
                <div>
                    <ul>
                        <li
                            onClick={(e) => {
                                setToggleTaskBar(!openTaskBar);
                                e.stopPropagation();
                            }}
                            className="active:bg-amber-300 rounded-[5px] flex gap-2 justify-start cursor-pointer hover:bg-gray-200 duration-200 ease-in-out p-2"
                        >
                            <AddIcon className="fill-blue-500" />
                            Add Task
                        </li>
                        <li
                            onClick={() => setToggleSearchBar(!toggleSearchBar)}
                            className="active:bg-amber-300  rounded-[5px] flex gap-2 justify-start cursor-pointer hover:bg-gray-200 duration-200 ease-in-out p-2"
                        >
                            <SearchIcon className="fill-blue-500" />
                            Search
                        </li>

                        <li className="active:bg-amber-300 rounded-[5px] flex gap-2 justify-start cursor-pointer hover:bg-gray-200 duration-200 ease-in-out p-2">
                            <InboxIcon className="fill-blue-500" />
                            Inbox
                        </li>

                        <li className=" mt-3 active:bg-amber-300 rounded-[5px] flex gap-2 justify-start cursor-pointer hover:bg-gray-200 duration-200 ease-in-out p-2">
                            My Projects
                            <span className="ml-auto rounded-[5px] mr-2 text-2xl hover:bg-gray-500 pl-2 pr-2">
                                +
                            </span>
                            <button
                                type="button"
                                onClick={() => setToggleProjectsList(!toggleProjectsList)}
                                className={`${toggleProjectsList ? "rotate-90" : ""} text-2xl rounded-[5px] hover:bg-gray-500 pl-2 pr-2 ease-in-out duration-200`}
                            >
                                &gt;
                            </button>
                        </li>
                    </ul>
                    <div
                        className={`${toggleProjectsList ? "max-h-full" : "max-h-0"} overflow-hidden duration-200 ease-in-out`}
                    >
                        <ul>
                            {projectsList.map((item) => {
                                return (
                                    <li
                                        key={item}
                                        className="hover:bg-gray-200 pl-2 rounded-[5px] p-2 cursor-pointer"
                                    >
                                        <span className="text-purple-600">#</span> {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <SearchBar
                toggleSearchBar={toggleSearchBar}
                setToggleSearchBar={setToggleSearchBar}
            />
            {openTaskBar && (
                <TaskBar
                    openTaskBar={openTaskBar}
                    setToggleTaskBar={setToggleTaskBar}
                />
            )}
        </>
    );
}
