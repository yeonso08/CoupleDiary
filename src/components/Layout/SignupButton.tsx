import { useNavigate } from 'react-router-dom';

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Button } from "../ui/button";
import {  DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const FormSchema = z.object({
    email: z.string()
        .email({ message: "이메일 형식으로 입력해주세요." }),
    password: z.string()
        .min(8, { message: "8자리 이상으로 입력해주세요." }),
    nickName: z.string()
        .min(2, {
            message: "최소 두 글자 이상 입력하세요.",
        })
        .max(10, { message: "10자 미만으로 입력해주세요" })
})

const SignupButton = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            nickName: "",
        },
    })
    const signup =  async (data: z.infer<typeof FormSchema>) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(fsauth, data.email, data.password);
            const user = userCredential.user;

            // 사용자 프로필 업데이트에 닉네임 추가
            await updateProfile(user, {
                displayName: data.nickName
            });

            navigate('/');
            alert('가입 되었습니다.');
        } catch (error) {
            alert('가입 실패 했습니다.');
        }
    };

    return (
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle>회원가입</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(signup)} className="grid gap-3 py-2">
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
                    <FormField
                        control={form.control}
                        name="nickName"
                        render={({field}) => (
                            <FormItem className={"grid grid-cols-4 items-center"}>
                                <FormLabel>닉네임</FormLabel>
                                <FormControl className={"col-span-3"}>
                                    <Input type={"text"} placeholder="닉네임을 입력 해주세요." {...field} />
                                </FormControl>
                                <FormMessage className={"col-span-4"}/>
                            </FormItem>
                        )}
                    />
                    <DialogFooter className={"pt-3"}>
                        <Button type="submit">확인</Button>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent>
    );
};

export default SignupButton;
