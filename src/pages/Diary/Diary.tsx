import { NavLink } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { fsdb } from "../../../firebase/firebase";
import { getDocs, collection, orderBy, query, startAfter, limit, getCountFromServer, QuerySnapshot, DocumentData, CollectionReference } from "firebase/firestore";
import AddIcon from '@mui/icons-material/Add';
import { Skeleton } from "../../components/ui/skeleton";
import CommonPagination from "../../components/common/CommonPagination";
import { useQueryPage } from '../../hooks/useQueryPage'

interface DiaryEntry {
    id: string;
    title: string;
    name: string;
    createdAt: { seconds: number };
}

const ITEMS_PER_PAGE = 10;

const fetchEntries = async (page: number): Promise<{ entries: DiaryEntry[], total: number }> => {
    const diaryCollection = collection(fsdb, "getDiary") as CollectionReference<DocumentData>;

    const [countSnapshot, querySnapshot] = await Promise.all([
        getCountFromServer(diaryCollection),
        getEntriesForPage(diaryCollection, page)
    ]);

    const total = countSnapshot.data().count;
    const entries = parseQuerySnapshot(querySnapshot);

    return { entries, total };
};

const getEntriesForPage = async (diaryCollection: CollectionReference<DocumentData>, page: number): Promise<QuerySnapshot<DocumentData>> => {
    const baseQuery = query(
        diaryCollection,
        orderBy("createdAt", "desc"),
        limit(ITEMS_PER_PAGE)
    );

    if (page === 1) return getDocs(baseQuery);

    const previousSnapshot = await getDocs(query(diaryCollection, orderBy("createdAt", "desc"), limit(ITEMS_PER_PAGE * (page - 1))));
    const lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1];
    return getDocs(query(diaryCollection, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(ITEMS_PER_PAGE)));
};

const parseQuerySnapshot = (querySnapshot: QuerySnapshot<DocumentData>): DiaryEntry[] => {
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        name: doc.data().name,
        createdAt: doc.data().createdAt,
    }));
};

const Diary = () => {
    const page = useQueryPage();
    const { data, isLoading, error } = useQuery({
        queryKey: ['entries', page],
        queryFn: () => fetchEntries(page),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const entries = data?.entries || [];
    const total = data?.total || 0;

    if (error) {
        return <div>Error loading diary entries. Please try again later.</div>;
    }

    return (
        <div className="bg-pink-200 h-screen overflow-hidden">
            <div className="p-20" />
            <h1 className="flex justify-center text-6xl text-white font-semibold mb-16">Diary</h1>
            <NavLink to="write" className="flex justify-end text-white pb-2 px-2">
                <AddIcon fontSize="large" />
            </NavLink>
            <div className="grid gap-4 px-2 pb-4 overflow-auto max-h-[calc(100vh-360px)]">
                {isLoading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <Skeleton key={index} className="grid p-4 bg-gray-50 rounded-md gap-1 h-20" />
                    ))
                ) : (
                    entries.map(item => (
                        <DiaryEntryItem key={item.id} item={item} />
                    ))
                )}
                <CommonPagination currentPage={page} total={total} />
            </div>
        </div>
    );
}

const DiaryEntryItem = ({ item }: { item: DiaryEntry }) => (
    <NavLink to={`/diary/${item.id}`} className="grid p-4 bg-gray-50 rounded-md gap-1">
        <div className="text-2xl">{item.title}</div>
        <div className="flex justify-between">
            <div className="text-xs">작성자: {item.name || "익명"}</div>
            <div className="text-xs">날짜: {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}</div>
        </div>
    </NavLink>
);

export default Diary;
