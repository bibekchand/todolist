import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
	},
    {
        path:"/hello/",
        Component: Some,
    },
]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />,
);
