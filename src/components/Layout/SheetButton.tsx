import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../ui/sheet"
import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButoon";
import { fsauth } from "../../../firebase/firebase";

const SheetButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = fsauth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe(); // 구독 해제
    }, []);

    const closeSheet = () => setIsSheetOpen(false);

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <button onClick={() => setIsSheetOpen(true)}><MenuIcon /></button>
            </SheetTrigger>
            <SheetContent>
                <div className={"grid text-2xl gap-6"}>
                    <NavLink to={"/"} onClick={closeSheet}>Home</NavLink>
                    <NavLink to={"/photo"} onClick={closeSheet}>Photo</NavLink>
                    <NavLink to={"/diary"} onClick={closeSheet}>Diary</NavLink>
                    {isLoggedIn ? <LogoutButton onLogout={closeSheet} /> : <LoginButton onLogin={closeSheet} />}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default SheetButton;
