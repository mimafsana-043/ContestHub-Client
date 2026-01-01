import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Contest_All from "../Pages/Contest_All/Contest_All";
import Contest_Details from "../Pages/Contest_Details/Contest_Details";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRouter from "../Provider/PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{
      index: true,
      loader: () => fetch('http://localhost:3000/Contest_6'),
      Component: Home
    },
    {
      path: "/all",
      loader: () => fetch('http://localhost:3000/Contest_Hub_All'),
      element: <Contest_All></Contest_All>,
    },
    {
      path: "/Register",
      element: <Register></Register>
    },
    {
      path: "/Login",
      element: <Login></Login>
    },
    {
      path: "/detail/:_id",
      loader: () => fetch('http://localhost:3000/Contest_Hub_All'),
      element: <PrivateRouter>
        <Contest_Details></Contest_Details>
      </PrivateRouter>

    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>
    },
    ]
  },
]);