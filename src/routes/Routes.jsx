import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home";
import Detail from "../Pages/Detail";
import Rooms from "../Pages/Rooms";
import Aboutus from "../Pages/Aboutus";
import PrivateRoute from "./PrivateRoute";
import Contactus from "../Pages/Contactus";
import MyBookings from "../Pages/MyBookings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><Detail></Detail></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/rooms/${params.id}`)
            },
            {
                path: '/rooms',
                element: <Rooms></Rooms>
            },
            {
                path: '/aboutus',
                element: <Aboutus></Aboutus>,
                loader: ()=>fetch('http://localhost:5000/messages')
            },
            {
                path: '/contactus',
                element: <Contactus></Contactus>
            },
            {
                path: '/mybookings',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            }
        ]
    },
]);
export default router;