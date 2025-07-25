import "./App.css";
import { Login } from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { Home } from "./pages/Home";
import { MyLearning } from "./pages/student/MyLearning";
import { Profile } from "./pages/student/Profile";
import { Dashboard } from "./pages/admin/Dashboard";
import { SideBar } from "./pages/admin/SideBar";
import { CouresTable } from "./pages/admin/course/CouresTable";
import { CreateCourse } from "./pages/admin/course/CreateCourse";
import { EditCourse } from "./pages/admin/course/EditCourse";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import { useQuery } from "@tanstack/react-query";
import { functionToGetProfile } from "./API/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userLoggedIn } from "./features/userSlice";
import { CreateLecture } from "./pages/admin/lecture/CreateLecture";
import { EditLecture } from "./pages/admin/lecture/EditLecture";
function App() {

   const {data} =useGetUserProfile();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
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
          path: "/mylearning",
          element: <MyLearning />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/admin",
          element: <SideBar />,
          children: [
            {
              path: "/admin/dashboard",
              element: <Dashboard />,
            },
            {
              path: "/admin/course",
              element: <CouresTable />,
            },
            {
              path: "/admin/course/create",
              element: <CreateCourse />,
            },
            {
              path: "/admin/course/:courseId",
              element: <EditCourse />,
            },
            {
              path: "/admin/course/lecture/:courseId",
              element: <CreateLecture />,
            },
            {
              path: "/admin/course/:courseId/lecture/:lectureId",
              element: <EditLecture />,
            },
          ],
        },
      ],
    },
  ]);
    
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
