import { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "../ui/sheet"
import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButoon";
import { fsauth } from "../../../firebase/firebase";

const SheetButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = fsauth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe(); // 구독 해제
    }, []);
    return (
        <Sheet>
            <SheetTrigger asChild>
                <MenuIcon />
            </SheetTrigger>
            <SheetContent>
                <div className={"grid text-2xl gap-6"}>
                    <SheetClose asChild>
                    <NavLink to={"/"}>Home</NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                    <NavLink to={"/photo"}>Photo</NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                        <NavLink to={"/diary"}>Diary</NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                        {isLoggedIn ? <LogoutButton /> : <LoginButton />}
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SheetButton
