import './App.css'
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Outlet, useNavigate} from "react-router-dom";
import {AuthProvider, useAuth} from "./common/hooks/userAuth.tsx";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <>
            <AuthProvider>
                <OurAppBar/>
                <Outlet/>
                <ToastContainer />
            </AuthProvider>
        </>
    )
}

function OurAppBar() {
    const {accessToken} = useAuth();
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (accessToken) setShow(true)
        else setShow(false)
    }, [accessToken])
    return (
        <AppBar position="static">
            {show ? <PrivateAppBar/> : <PublicAppBar/>}
        </AppBar>
    )
}

function PrivateAppBar() {
    const navigate = useNavigate();
    const {logout} = useAuth();
    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Task Manager
            </Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
                Tasks
            </Button>
            <Button color="inherit" onClick={() => navigate("/projects")}>Projects</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
    )
}

function PublicAppBar() {
    const navigate = useNavigate();
    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Task Manager
            </Typography>
            <Button color="inherit" onClick={() => navigate("/login")}>
                Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
        </Toolbar>
    )
}

export default App
