import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fsdb } from "../../../firebase/firebase";

import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const FormSchema = z.object({
    title: z.string().min(1, "최소 한 글자 이상 작성하세요."),
    content: z.string().min(1, "최소 한 글자 이상 작성하세요.").max(5000, "5000자 미만으로 작성하세요."),
});

const DiaryModify = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();

    const documentId = id || ''; // 'undefined'일 경우 빈 문자열을 사용

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });


    useEffect(() => {
        const fetchEntry = async () => {
            if (!documentId) {
                alert("Document ID is not provided!");
                navigate('/diary');
                return;
            }

            const docRef = doc(fsdb, "getDiary", documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                form.reset(docSnap.data() as z.infer<typeof FormSchema>);
            } else {
                alert("Document does not exist!");
                navigate('/diary');
            }
        };

        fetchEntry();
    }, [form, documentId, navigate]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (!id) {
            console.error("Document ID is not provided");
            alert("Document ID is missing.");
            return;
        }

        const docRef = doc(fsdb, "getDiary", id);
        try {
            await updateDoc(docRef, {
                title: data.title,
                content: data.content,
                updatedAt: new Date(),
            });
            navigate(`/diary/${id}`);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <div className={"bg-pink-200 h-screen"}>
            <div className={"p-16"} />
            <div className={"flex justify-center text-6xl text-white font-semibold "}>Modify</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={"text-white"}>제목</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={"text-white"}>내용</FormLabel>
                                <Textarea className="resize-none h-[40vh]" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={"w-full"}>수정하기</Button>
                </form>
            </Form>
        </div>
    );
};

export default DiaryModify;
