import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {  onAuthStateChanged } from 'firebase/auth';
import {fsauth} from "../../firebase/firebase";

const RequireAuth = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fsauth, (user) => {
            if (user) {
                // 사용자가 로그인한 경우
                setIsAuthenticated(true);
            } else {
                // 사용자가 로그인하지 않은 경우, 로그인 페이지로 리다이렉트
                navigate("/");
                alert("로그인을 해주세요.")
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return isAuthenticated ? <Outlet /> : null;
};

export default RequireAuth
