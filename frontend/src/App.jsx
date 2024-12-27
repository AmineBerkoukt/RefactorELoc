import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import {Routes, Route, Navigate} from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";




import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {
    const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
    const { theme } = useThemeStore();

    const location = useLocation(); // Hook pour accéder à la route actuelle

    //console.log({ onlineUsers });

    const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

    useEffect(() => {
        if (!publicRoutes.includes(location.pathname)) {
            checkAuth();
        }
    }, [checkAuth, location.pathname]);

    console.log({ authUser });
    console.log({ location });

    if (isCheckingAuth && !authUser && !publicRoutes.includes(location.pathname))
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );


    return (
        <div data-theme={theme}>
            <Routes>
                <Route path="/fb" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>


                <Route path="/chat" element={<HomePage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </div>
    );
};
export default App;
