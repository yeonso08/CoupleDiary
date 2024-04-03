import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router v6 사용 가정
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { fsauth } from "../../../firebase/firebase";
import SignupButton from "./SignupButton";

const LoginButton = ({ onLogin } : {onLogin:() => void}) => {  // onLogin prop 추가
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [isSign, setIsSign] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        try {
            const { user } = await signInWithEmailAndPassword(fsauth, email, password);
            const idToken = await user.getIdToken(); // 사용자의 ID 토큰 가져오기
            const refreshToken = user.refreshToken; // 사용자의 Refresh 토큰 가져오기

            // 세션 스토리지에 토큰 저장
            sessionStorage.setItem('idToken', idToken);
            sessionStorage.setItem('refreshToken', refreshToken);
            sessionStorage.setItem('nickname', user.displayName || '익명');

            if (onLogin) {
                onLogin();  // 로그인 성공 후 onLogin 함수 호출
            }

            setOpen(false)
            navigate('/');
        } catch (error) {
            alert('로그인 실패.');
        }
    };

    return (
        <Dialog open={open}  onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div onClick={() => setIsSign(false)}>Login</div>
            </DialogTrigger>
            {!isSign ?
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }} className="grid gap-4 py-4">
                    <div className="grid grid-cols-8 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            ID
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-7"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-8 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            PW
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="col-span-7"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <div className={"flex gap-2"}>
                            <Button type="submit" className={"w-full"}>Login</Button>
                            <Button onClick={() => setIsSign(true)} className={"w-full"}>Signup</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent> :
            <SignupButton  />
            }
        </Dialog>
    );
};

export default LoginButton;
