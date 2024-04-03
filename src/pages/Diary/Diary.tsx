import { NavLink } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { fsdb } from "../../../firebase/firebase";
import { getDocs, collection } from "firebase/firestore"
import AddIcon from '@mui/icons-material/Add';

interface DiaryEntry {
    id: string;
    title: string;
    name: string;
    createdAt: { seconds: number };
}

const fetchEntries = async (): Promise<DiaryEntry[]> => {
    const querySnapshot = await getDocs(collection(fsdb, "getDiary"));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }) as DiaryEntry);
};

const Diary = () => {
    const { data: entries } = useQuery({ queryKey: ['entries'], queryFn: fetchEntries });

    return (
        <div className={"bg-[#314840] h-screen"}>
            <div className={"p-24"} />
            <div className={"flex justify-center text-6xl text-white font-semibold mb-16"}>Diary</div>
            <NavLink to={"write"} className={"flex justify-end text-white pb-2 px-2"} ><AddIcon fontSize={"large"} /></NavLink>
            <div className={"grid gap-4 px-2 pb-4"}>
                {entries?.map(item => (
                    <NavLink key={item.id} to={`/diary/${item.id}`} className={"grid p-4 bg-gray-50 rounded-md gap-1"}>
                        <div className={"text-2xl"}>{item.title}</div>
                        <div className={"flex justify-between"}>
                            <div className={"text-xs"}>작성자: {item.name || "익명"}</div>
                            <div className={"text-xs"}>날짜: {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Diary