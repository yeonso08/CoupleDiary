import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"

import { fsauth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

import SignupButton from "./SignupButton";

const FormSchema = z.object({
    email: z.string()
        .email({ message: "이메일 형식으로 입력해주세요." }),
    password: z.string()
        .min(8, { message: "8자리 이상으로 입력해주세요." }),
})
interface LoginButtonProps {
    onLogin?: () => void;
}

const LoginButton = ({ onLogin } : LoginButtonProps) => {  // onLogin prop 추가
    const [open, setOpen] = useState(false);
    const [isSign, setIsSign] = useState(false);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const login = async (data: z.infer<typeof FormSchema>) => {
        try {
            const { user } = await signInWithEmailAndPassword(fsauth, data.email, data.password);
            const idToken = await user.getIdToken();
            const refreshToken = user.refreshToken;

            localStorage.setItem('idToken', idToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('nickname', user.displayName || '익명');

            if (onLogin) {
                onLogin();
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
                    <DialogTitle>로그인</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(login)} className="grid gap-3 py-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className={"grid grid-cols-4 items-center"}>
                                <FormLabel>아이디</FormLabel>
                                <FormControl className={"col-span-3"}>
                                    <Input type={"email"} placeholder="이메일로 입력 해주세요." {...field} />
                                </FormControl>
                                <FormMessage className={"col-span-4"}/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className={"grid grid-cols-4 items-center"}>
                                <FormLabel>비밀번호</FormLabel>
                                <FormControl className={"col-span-3"}>
                                    <Input type={"password"} placeholder="8자리 이상으로 입력 해주세요." {...field} />
                                </FormControl>
                                <FormMessage className={"col-span-4"}/>
                            </FormItem>
                        )}
                    />
                    <DialogFooter className={"pt-3"}>
                        <div className={"flex gap-2"}>
                            <Button type="submit" className={"w-full"}>로그인</Button>
                            <Button onClick={() => setIsSign(true)} className={"w-full"}>회원가입</Button>
                        </div>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent> :
            <SignupButton  />
            }
        </Dialog>
    );
};

export default LoginButton;
