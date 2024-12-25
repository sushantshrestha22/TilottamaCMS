import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem("access_token") || null
    );
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        if (!token) {
            setIsLoggedIn(false);
            return null;
        }
        try {
            const res = await axiosInstance.get("api/users/verify", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (res.status === 200) {
                setIsLoggedIn(true);
                setUser(res.data);
                return res.data;
            } else {
                logoutUser();
                return null;
            }
        } catch (error) {
            logoutUser();
            return null;
        }
    };

    const storeToken = (data) => {
        setToken(data);
        localStorage.setItem("access_token", data);
        setIsLoggedIn(true);
    };

    const logoutUser = () => {
        axiosInstance.post("api/auth/logout");
        setToken(null);
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/login";
    };

    const checkLogin = async () => {
        if (!token) {
            if (window.location.pathname !== "/login") {
                logoutUser();
            }
        } else {
            const userData = await checkAuth();
            if (isLoggedIn) {
                if (window.location.pathname === "/login") {
                    window.location.href = "/";
                }
            } else {
                logoutUser();
            }
        }
    };

    useEffect(() => {
        checkLogin();
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, user, storeToken, logoutUser,checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};