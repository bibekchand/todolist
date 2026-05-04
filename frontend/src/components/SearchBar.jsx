import { useState } from "react";
import XMarkIcon from "../assests/xmark.svg?react";
import MagnifyingGlassIcon from "../assests/magnifying-glass.svg?react";
export default function SearchBar({ toggleSearchBar = false }) {
    const [items, setItems] = useState(["First", "Second", "Third"]);
    const [query, setQuery] = useState("");
    const handleChange = (event) => {
        const query = event.target.value;
        setQuery(query);
    };

    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
    );
    return (
        <div
            className={`fixed top-[30%] bg-white ${toggleSearchBar ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 ease-in-out rounded-[10px] left-[30%] w-[30vw] shadow-gray-700 shadow-lg/80 pb-1 z-10`}
        >
            <div className="flex gap-1 border-b border-gray-300 p-2">
                <MagnifyingGlassIcon />
                <input
                    placeholder="Search"
                    type="text"
                    onChange={handleChange}
                    value={query}
                    className="w-full appearance-none focus:outline-none"
                />
            </div>
            <ul className="flex flex-col justify-between">
                {query === "" ||
                    filteredItems.map((item) => (
                        <li
                            className="hover:bg-gray-300 hover:border-l-2 cursor-pointer border-red-700 p-2"
                            key={item}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
