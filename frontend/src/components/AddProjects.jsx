import { useEffect } from "react";
export default function AddProjects({ setOpenAddProjects }) {
    return (
            <div
                className={` dark:bg-black dark:text-white fixed top-[30%] bg-white  rounded-[10px] p-2 left-[30%] shadow-gray-700 shadow-lg/80`}
            >
                <form action="" className="flex flex-col">
                    <label
                        htmlFor="projectName"
                        className="relative before:absolute before:content-['#'] before:top-6 before:text-2xl before:text-blue-700 before:left-2"
                    >
                        Project Name:
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        className="border rounded-[5px] text-xl focus:outline-0 pl-10 "
                    />
                </form>
                <div className="flex gap-2 mt-2">
                    <button
                        type="button"
                        className="border p-2 rounded-[5px] bg-red-500 cursor-pointer"
                        onClick={() => setOpenAddProjects(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="border p-2 rounded-[5px] cursor-pointer"
                    >
                        Add
                    </button>
                </div>
            </div>
    );
}
