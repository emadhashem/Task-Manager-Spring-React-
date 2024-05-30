import {createContext, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage";
import {ReactProps} from "../types/ReactProps.ts";

interface AuthContextType {
    login: (data: any) => Promise<void>,
    logout: () => void,
    accessToken: string | null
}

const AuthContext = createContext<AuthContextType>({
    login: async () => {
    },
    logout: () => {
    },
    accessToken: "" || null
});


export const AuthProvider = ({children}: ReactProps) => {
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
    const navigate = useNavigate();

    const login = async (data: any) => {
        setAccessToken(data);
        navigate("/");
    };

    const logout = () => {
        setAccessToken(null);
        navigate("/login", {replace: true});
    };

    const value = useMemo(
        () => ({
            accessToken: accessToken,
            login,
            logout,
        }),
        [accessToken]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};