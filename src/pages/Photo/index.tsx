import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import { fstorage } from '../../../firebase/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useQuery } from '@tanstack/react-query'
import {Skeleton} from "../../components/ui/skeleton.tsx";

const fetchImages = async () => {
    const fileRef = ref(fstorage, '/jiminPhoto');
    const result = await listAll(fileRef);
    const urls = await Promise.all(
        result.items.map((item) => getDownloadURL(item))
    );
    return urls;
};
const Photo = () => {

    const { data: images, isLoading } = useQuery({queryKey: ['images'], queryFn: fetchImages});

    return (
        <div className={"h-full bg-[#314840]"}>
            <div className={"p-24"} />
            <div className={"flex justify-center text-6xl text-white font-semibold mb-16"}>Photo</div>
            <div className={"px-2 pb-4"}>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 3, 750: 2, 900: 7}}
                >
                    <Masonry gutter="10px">
                        {isLoading ? (
                        Array.from({ length: 30 }).map((_, index) => {
                            return (
                                <Skeleton key={index} className={`w-28 h-28 sm:w-60 sm:h-48 rounded-xl`} />
                            );
                        })
                    ) : (
                        images?.map((url, index) => (
                            <img key={index} className="w-full rounded-lg" src={url} alt="Uploaded"/>
                        ))
                    )}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    )
}

export default Photo