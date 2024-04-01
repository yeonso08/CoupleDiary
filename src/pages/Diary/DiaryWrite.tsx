import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"

const FormSchema = z.object({
    username: z.string().min(1, {
        message: "최소 한 글자 이상 작성하세요.",
    }),
    bio: z
        .string()
        .min(1, {
            message: "최소 한 글자 이상 작성하세요.",
        })
        .max(500, {
            message: "500자 미만으로 작성하세요.",
        }),
})

const DiaryWrite = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            bio: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('제목:', data.username);
        console.log('내용:', data.bio);
    }

    return (
        <div className={"bg-[#314840] h-screen"}>
            <div className={"p-16"}/>
            <div className={"flex justify-center text-6xl text-white font-semibold "}>Write</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={"text-white"}>제목</FormLabel>
                                <FormControl>
                                    <Input placeholder="제목을 입력 해주세요" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={"text-white"}>내용</FormLabel>
                                <Textarea
                                    placeholder="내용을 입력 해주세요."
                                    className="resize-none h-[40vh]"
                                    {...field}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={"w-full"}>작성하기</Button>
                </form>
            </Form>
        </div>
    )
}

export default DiaryWrite