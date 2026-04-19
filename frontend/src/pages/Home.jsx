import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
export default function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(true);
    return (
        <>
            <div className="flex">
                <Sidebar
                    className="h-full"
                    toggled={toggled}
                    collapsed={collapsed}
                    collapsedWidth="0"
                    breakPoint="md"
                    onBackdropClick={() => {
                        setToggled(false);
                    }}
                >
                    <div className="text-4xl">
                        Something
                        <div>
                            {
                                <button type="button" onClick={() => setCollapsed(!collapsed)}>
                                    Toggle
                                </button>
                            }
                        </div>
                    </div>

                    <Menu>
                        <SubMenu label="Charts" icon={<div>😊</div>}>
                            <MenuItem className=""> Pie charts </MenuItem>
                            <MenuItem className=""> Something </MenuItem>
                        </SubMenu>
                        <MenuItem> Documentation </MenuItem>
                        <MenuItem> Calendar </MenuItem>
                    </Menu>
                </Sidebar>
                <div>Hello world</div>
            </div>
            <div>Hello world</div>
        </>
    );
}
