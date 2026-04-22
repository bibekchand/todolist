import Sidebar from "../assests/sidebar.svg?react";
import NotificationIcon from "../assests/notification.svg?react";
import catImage from "../assests/cato.avif";
import { useState } from "react";
export default function Home() {
    const [username, setUsername] = useState("Ram Shah");
    return (
        <div className="grid grid-cols-[auto_1fr]">
            <div className="flex border-2 p-2 flex-col gap-5">
                <div className="flex items-center gap-5">
                    <div className="flex rounded-2xl items-center gap-2 p-2 hover:bg-gray-500 duration-200 ease-in-out cursor-pointer">
                        <div className="h-10 w-10 rounded-full overflow-clip">
                            <img src={catImage} alt="" />
                        </div>
                        <span>{username}</span>
                        <span className="rotate-90"> &gt;</span>
                    </div>
                    <NotificationIcon className="fill-black  hover:fill-gray-300 duration-100 ease-in-out cursor-pointer" />
                    <Sidebar className="fill-black hover:fill-gray-300  duration-100 ease-in-out cursor-pointer" />
                </div>
                <div>Hello world</div>
            </div>
            <div className="border-2">Hello</div>
        </div>
    );
}
