import { useState } from "react";
export default function NavBar() {
    const [showNavBar, setShowNavBar] = useState(false);
    function toggleNavBar() {
        setShowNavBar(!showNavBar);
    }
    return (
        <>
            <button type="button" onClick={toggleNavBar} className="fixed z-10 right-0 m-2"> Click Me!</button>
            <div
                className="fixed flex-col flex justify-center items-center transition-[height] duration-500 ease-in-out bg-white overflow-hidden"
                style={{
                    height: showNavBar ? "100vh" : "0px",
                    width: showNavBar ? "100vw" : "0px",
                }}
            >
                <ul className="text-4xl flex flex-col">
                    <li className="group">
                        Home{" "}
                        <hr className="w-0 group-hover:w-full border-t-4 transition-all ease-in-out duration-500" />
                    </li>
                </ul>
            </div>
        </>
    );
}
