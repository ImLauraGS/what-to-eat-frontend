import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import Search from "../pages/Search";
import Details from "../pages/Details";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login", 
                element: <Login />,
            },
            {
                path: "/register", 
                element: <Register />,
            },
            {
                path: "/search", 
                element: <Search />,
            },
            {
                path: "/recipe/:id", 
                element: <Details />,
            },
        ],
    },
]);