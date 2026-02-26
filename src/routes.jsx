import {createBrowserRouter} from "react-router";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import Courses from "./pages/Courses.jsx";

const router = createBrowserRouter([

    {
        path: "/",
        element: <DashboardLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "/courses",
                element: <Courses/>
            },
            {
                path: "/users",
                element: <Users/>
            },
        ]
    },

]);


export default router;