import {createBrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store.ts";
import App from "../App.tsx";
import {ProtectedRoute} from "../common/protected-route/ProtectedRoute.tsx";
import HomePage from "../pages/home-page/HomePage.tsx";
import LoginPage from "../pages/login-page/LoginPage.tsx";
import RegisterPage from "../pages/register-page/RegisterPage.tsx";
import ProjectsPage from "../pages/projects-page/ProjectsPage.tsx";
import ProjectPage from "../pages/projects-page/project-page/ProjectPage.tsx";
import ErrorPage from "../pages/error-page/ErrorPage.tsx";


export default createBrowserRouter([
    {
        path: "/",
        element: <Provider store={store}><App/></Provider>,
        children: [
            {
                path: "/",
                element: <ProtectedRoute><HomePage/></ProtectedRoute>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            {
                path: "/projects",
                element: <ProtectedRoute><ProjectsPage/></ProtectedRoute>,
                children: [
                    {
                        path: "/projects/:projectId",
                        element: <ProtectedRoute><ProjectPage/></ProtectedRoute>
                    }
                ]
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    },

]);