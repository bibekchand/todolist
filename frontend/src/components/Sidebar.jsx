import { useState } from "react";
import AddIcon from "../assests/add.svg?react";
import catImage from "../assests/cato.avif";
import NotificationIcon from "../assests/notification.svg?react";
import SearchIcon from "../assests/SearchIcon.svg?react";
import SideBarIcon from "../assests/sidebar.svg?react";
export default function Sidebar({ toggleSidebar, setToggleSidebar }) {
    const [username, setUsername] = useState("Ram Shah");
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
                    className="fixed z-90 md:hidden bg-gray-500 opacity-20 h-screen w-screen ease-in-out transition-all"
                    onClick={() => setToggleSidebar(false)}
                ></div>
            )}
            <div
                className={`flex p-2 fixed flex-col top-0 gap-5 overflow-clip transition-transform duration-500 ease-in-out bg-gray-100 md:static z-100 opacity-90 grow-0 ${toggleSidebar ? "translate-x-0" : " -translate-x-full"}`}
            >
                <div className="flex items-center gap-5">
                    <div className="flex rounded-2xl items-center gap-2 p-2 hover:bg-gray-500 duration-200 ease-in-out cursor-pointer">
                        <div className="h-10 w-10 rounded-full overflow-clip">
                            <img src={catImage} alt="" />
                        </div>
                        <span>{username}</span>
                        <span className="rotate-90"> &gt;</span>
                    </div>
                    <NotificationIcon className="fill-black  hover:fill-gray-300 duration-100 ease-in-out cursor-pointer" />
                    <SideBarIcon
                        onClick={() => setToggleSidebar(!toggleSidebar)}
                        className="fill-black hover:fill-gray-300  duration-100 ease-in-out cursor-pointer"
                    />
                </div>
                <div>
                    <ul>
                        <li className="rounded-2xl flex gap-2 justify-start cursor-pointer hover:bg-gray-200 duration-200 ease-in-out p-2">
                            <AddIcon className="fill-blue-500" />
                            Add Task
                        </li>

                        <li className="rounded-2xl flex gap-2 justify-start cursor-pointer hover:bg-gray-200 duration-200 ease-in-out p-2">
                            <SearchIcon className="fill-blue-500" />
                            Search
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
