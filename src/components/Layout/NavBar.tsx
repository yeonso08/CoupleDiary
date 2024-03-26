import {NavLink} from "react-router-dom";
import SheetButton from "./SheetButton.tsx";
const NavBar = () => {
    return (
        <div className={"bg-blue-600 p-4"}>
                <div className={"flex justify-between text-white"}>
                    <div className={"font-semibold text-xl pl-4"}>
                    <NavLink to={"/"}>23.12.11</NavLink>
                    </div>
                    <div className={" gap-10 pr-24 sm:flex hidden"}>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/"}>Photo</NavLink>
                    <NavLink to={"/"}>Diary</NavLink>
                    </div>
                    <div className={"sm:hidden"}>
                        <SheetButton />
                    </div>
                </div>
        </div>
    )
}
export default NavBar