import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
export default function Home() {
    const [username, setUsername] = useState("Ram Shah");

    const [toggleSidebar, setToggleSidebar] = useState(true);
    return (
        <div
            className={`grid grid-cols-[0_1fr] transition-all ease-in-out duration-500 md:${toggleSidebar? "grid-cols-[auto_1fr]" : "grid-cols-[0_1fr]"} items-start`}
        >
            <Sidebar
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
            />
            <div className="m-10 max-w-[65ch]">Hello</div>
        </div>
    );
}
