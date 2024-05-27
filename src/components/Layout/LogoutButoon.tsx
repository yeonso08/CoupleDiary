import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "../ui/dialog";
import { fsauth } from "../../../firebase/firebase";

interface LogoutButtonProps {
    onLogout?: () => void;
}
const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    const logout = async () => {
        try {
            await fsauth.signOut()
            if (onLogout) {
                onLogout();
            }

            localStorage.removeItem('idToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('nickname');

            console.log('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>Logout</div>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
                <div className={"flex justify-center text-lg p-4"}>
                    로그아웃 하시겠습니까 ?
                </div>
                <DialogFooter>
                    <div className={"flex gap-4"}>
                        <DialogClose asChild>
                            <Button className={"w-full"} onClick={logout}>확인</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className={"w-full"}>취소</Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutButton;
