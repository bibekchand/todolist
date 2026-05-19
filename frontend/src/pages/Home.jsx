import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
export default function Home() {
    const [toggleSidebar, setToggleSidebar] = useState(true);
    useEffect(()=> {
        document.documentElement.classList.add("dark")
    })
    return (
        <div
            className={`grid transition-all duration-400 ease-in-out grid-cols-[0_1fr] ${toggleSidebar ? "md:grid-cols-[auto_1fr]" : "md:grid-cols-[0_1fr]"} items-start`}
        >
            <Sidebar
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
            />
            <div className="m-10 dark:bg-black">
                <Outlet />
             </div>
        </div>
    );
}
