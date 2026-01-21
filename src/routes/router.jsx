import { createBrowserRouter } from "react-router";
import AddContestForm from "../Components/Form/AddContestForm";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import RootLayout from "../LayOut/RootLayout";
import Contest_All from "../Pages/Contest_All/Contest_All";
import Contest_Details from "../Pages/Contest_Details/Contest_Details";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyContest from "../Pages/MyContest/MyContest";
import Paynow from "../Pages/Paynow/Paynow";
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
      path: "/update-form",
      element: <AddContestForm></AddContestForm>
    },
    {
      path: "/paynow/:_id",
      element: <Paynow></Paynow>
    },
    
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRouter>
     <DashboardLayout></DashboardLayout>
    </PrivateRouter>,
    children: [
       {
         path: "mycontests",
         element: <MyContest></MyContest> 
       }
    ]
  },
   {
        path: "/*",
        element: <div className="flex flex-col justify-center items-center min-h-screen bg-gray-400">
            <img src="https://i.ibb.co.com/q3PznjfL/mac-error.jpg" alt="" className="w-150 h-100 object-contain rounded-lg shadow-fuchsia-50 "/>

            <p className="text-4xl font-bold text-blue-950 mt-4">Page Not Found</p>
            </div>
    },
]);