import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
export default function Home() {
    const [username, setUsername] = useState("Ram Shah");
    const [toggleSidebar, setToggleSidebar] = useState(true);
    return (
        <div
            className={`grid transition-all duration-400 ease-in-out grid-cols-[0_1fr] md:${toggleSidebar ? "grid-cols-[auto_1fr]" : "grid-cols-[0_1fr]"} items-start`}
        >
            <Sidebar
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
            />
            <div className="m-10 max-w-[65ch]">Hello</div>
        </div>
    );
}
