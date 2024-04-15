import  { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import SheetButton from "./SheetButton";
const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className={`p-4 fixed top-0 left-0 right-0 z-10 ${scrolled ? 'bg-pink-200 opacity-90' : 'bg-transparent'}`}>
            <div className={"flex justify-between text-white"}>
                <div className={"font-semibold text-xl pl-4"}>
                    <NavLink to={"/"}>23.12.11</NavLink>
                    </div>
                    <div className={" gap-10 pr-24 sm:flex hidden"}>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/photo"}>Photo</NavLink>
                    <NavLink to={"/diary"}>Diary</NavLink>
                    </div>
                    <div className={"sm:hidden"}>
                        <SheetButton />
                    </div>
                </div>
        </div>
    )
}
export default NavBar