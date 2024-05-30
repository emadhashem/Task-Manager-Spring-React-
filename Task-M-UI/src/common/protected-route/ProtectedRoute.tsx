import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/userAuth.tsx";
import {ReactProps} from "../types/ReactProps.ts";


export const ProtectedRoute = ({children}: ReactProps) => {
    const {accessToken} = useAuth();
    if (!accessToken) {
        return <Navigate to="/login"/>;
    }
    return children;
};