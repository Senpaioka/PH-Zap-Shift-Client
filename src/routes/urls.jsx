import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

// layouts
import App from '../App';
import Auth from "../Auth";

import Spinner from '../components/Spinner';;
import  Error from '../pages/ErrorPage';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";


// pages
const Home = lazy(() => import('../pages/home/Home'));
const Coverage = lazy(() => import('../pages/coverage/Coverage'));


const router = createBrowserRouter([
  // Landing page
  {
    path: "/",
    Component: App,
    hydrateFallbackElement: <Spinner></Spinner>,
    errorElement: <Error></Error>,

    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: 'coverage',
          element: <Coverage></Coverage>,
          loader: () => fetch('/warehouses.json').then(res => res.json())
        }
    ]
  },
  // authentication
  {
    path: 'auth',
    Component: Auth,

    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'forget-password',
        Component: ForgetPassword,
      },
      {
        path: 'reset-password',
        Component: ResetPassword,
      }
    ]
  }
]);



export {router};