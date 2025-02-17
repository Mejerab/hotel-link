import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home";
import Detail from "../Pages/Detail";
import Rooms from "../Pages/Rooms";
import Aboutus from "../Pages/Aboutus";
import PrivateRoute from "./PrivateRoute";
import Contactus from "../Pages/Contactus";
import MyBookings from "../Pages/MyBookings";
import ErrorPage from "../ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
         errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><Detail></Detail></PrivateRoute>,
                loader: ({params})=>fetch(`https://hotel-server-site.vercel.app/rooms/${params.id}`)
            },
            {
                path: '/rooms',
                element: <Rooms></Rooms>
            },
            {
                path: '/aboutus',
                element: <Aboutus></Aboutus>,
                loader: ()=>fetch('https://hotel-server-site.vercel.app/messages')
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