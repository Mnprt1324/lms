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
import { useGetUserProfile } from "@/hooks/useGetUserProfile";

import { CreateLecture } from "./pages/admin/lecture/CreateLecture";
import { EditLecture } from "./pages/admin/lecture/EditLecture";
import { CourseDetails } from "./pages/admin/course/CourseDetails";
import { CourseProgress } from "./pages/admin/course/CourseProgress";
import { CoursesPage } from "./pages/admin/course/CoursesPage";
import { About } from "./pages/About";
import { TeachersPage } from "./pages/TeachersPage";
import { Error } from "./pages/home/Error";
import { AdminRoutes, ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  useGetUserProfile();

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
          element: (
            <ProtectedRoutes>
              <MyLearning />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/courses",
          element: <CoursesPage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/instructor",
          element: <TeachersPage />,
        },
        {
          path: "*",
          element: <Error />,
        },
        {
          path: "/admin",
          element: (
            <AdminRoutes>
              <SideBar />
            </AdminRoutes>
          ),
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
        {
          path: "/course/:courseId",
          element: (
            <ProtectedRoutes>
              {" "}
              <CourseDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/course/:courseId/progress",
          element: (
            <ProtectedRoutes> 
              <CourseProgress />
            </ProtectedRoutes>
          ),
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
