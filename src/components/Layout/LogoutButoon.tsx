import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "../ui/dialog";
import { fsauth } from "../../../firebase/firebase";
const LogoutButton = ({ onLogout } : {onLogout:() => void}) => {
    const logout = async () => {
        try {
            await fsauth.signOut()
            // 세션 스토리지에서 토큰 제거s
            if (onLogout) {
                onLogout();  // 로그인 성공 후 onLogin 함수 호출
            }

            sessionStorage.removeItem('idToken');
            sessionStorage.removeItem('refreshToken');

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
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                </DialogHeader>
                <div className={"flex justify-center text-lg"}>
                    로그아웃 하시겠습니까 ?
                </div>
                <DialogFooter>
                    <div className={"flex gap-4"}>
                        <DialogClose asChild>
                            <Button className={"w-full"} onClick={logout}>Confirm</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className={"w-full"}>Cancle</Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutButton;
