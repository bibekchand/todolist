import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
export default function App() {
    const [toggled, setToggled] = useState(window.innerWidth > 768);
    return (
        <>
            <div>
                {toggled || (
                    <button type="button" onClick={() => setToggled(!toggled)}>
                        Toggle
                    </button>
                )}
            </div>
            <Sidebar
                toggled={toggled}
                breakPoint="md"
                onBackdropClick={() => {
                    setToggled(false);
                }}
            >
                <Menu>
                    <SubMenu label="Charts" className="border-2">
                        <MenuItem className="border-2 mb-1"> Pie charts </MenuItem>
                        <MenuItem className="border-2"> Something </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>
        </>
    );
}
