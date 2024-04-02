import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from "firebase/firestore";
import { fsdb } from "../../../firebase/firebase";
import { NavLink } from "react-router-dom";
import {Button} from "../../components/ui/button";

interface DiaryEntry {
    id: string;
    title: string;
    name: string;
    content: string;
    createdAt: { seconds: number };
}

const fetchDiaryEntry = async (id: string) => {
    const docRef = doc(fsdb, "getDiary", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as DiaryEntry;
    } else {
        throw new Error("No such document!");
    }
};

const DiaryDetail = () => {
    const { id } = useParams<{ id?: string }>();
    const { data: entry } = useQuery({
        queryKey: ['entry', id],
        queryFn: () => id ? fetchDiaryEntry(id) : Promise.reject('No ID provided'),
        enabled: !!id  // id가 있을 때만 쿼리 실행
    });

    return (
        <div className={"bg-[#314840] h-screen"}>
            <div className={"p-16"} />
            <NavLink to={"/diary"} className={"flex justify-center text-6xl text-white font-semibold mb-8"}>Diary</NavLink>
            <div className={"text-white p-2"}>
                <div className={"grid gap-2"}>
                    <div className={"flex justify-between"}>
                        <div>제목</div>
                        <div>작성자: {entry?.name}</div>
                    </div>
                    <div className={"bg-white text-black p-1 rounded-md"}>
                        {entry?.title}
                    </div>
                    <div className={"flex justify-end"}>
                        {entry?.createdAt ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString() : '날짜 없음'}
                    </div>
                    <div className={"grid gap-2"}>
                        <div>내용</div>
                        <div className={"bg-white text-black p-2 rounded-md h-[40vh]"}>
                            {entry?.content}
                        </div>
                    </div>
                    <div className={"flex pt-3 gap-2"}>
                    <NavLink to={`/diary/modify/${entry?.id}`} className={"w-full"}>
                        <Button type="submit" className={"w-full"}>수정</Button>
                    </NavLink>
                        <Button type="submit" className={"w-full"}>삭제</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiaryDetail;
