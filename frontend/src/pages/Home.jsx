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
            <div className="m-20 max-w-[65ch]">
        <p className="text-4xl font-bold" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, cumque ex. Aliquam dolorem quod quas exercitationem repudiandae, temporibus eaque necessitatibus praesentium veniam labore tenetur laboriosam omnis tempore fuga, expedita accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, ipsam, eligendi ullam eius fugit ad quidem fugiat deleniti recusandae nisi quod architecto. Debitis iste, repellendus nobis quaerat accusamus laudantium repudiandae voluptatum rerum obcaecati tempora illum maxime voluptates molestias nam enim sapiente earum praesentium corrupti cupiditate fugiat ducimus exercitationem qui voluptas. Necessitatibus suscipit eaque officiis ab quasi aspernatur ut, totam, provident voluptate excepturi quisquam ad assumenda! Pariatur minima veniam maiores debitis, distinctio id, rem voluptate, harum beatae suscipit qui hic eveniet! Vitae inventore esse soluta consequatur libero voluptate quas, quo molestiae suscipit delectus, praesentium, dolore sit maxime omnis a earum optio?</p>
        </div>
        </div>
    );
}
