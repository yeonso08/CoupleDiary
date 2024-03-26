import {NavLink} from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import MenuIcon from "@mui/icons-material/Menu";

const SheetButton = () => {
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
                        <NavLink to={"/"}>Diary</NavLink>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SheetButton
