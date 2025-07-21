import "./App.css";
import { Login } from "./pages/Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { Home } from "./pages/Home";
import { MyLearning } from "./pages/student/MyLearning";
import { Profile } from "./pages/student/Profile";
function App() {
  const router=createBrowserRouter([{
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/mylearning",
        element:<MyLearning/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ]
  }])
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  );
}

export default App;
