import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { fsauth } from "../../firebase/firebase";

const RequireAuth = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fsauth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                navigate("/");
                alert("로그인을 해주세요.");
            }
            setIsCheckingAuth(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    if (isCheckingAuth) {
        return <div>로딩 중...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
