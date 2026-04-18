import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Home,
	},
    {
        path:"/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: Register,
    },
]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />,
);
