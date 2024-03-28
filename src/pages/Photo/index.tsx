import {useEffect, useRef, useState} from 'react';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import {fstorage} from '../../../firebase/firebase';
import {getDownloadURL, listAll, ref} from 'firebase/storage';
import {useQuery} from '@tanstack/react-query';
import {Skeleton} from "../../components/ui/skeleton.tsx";
import CloseIcon from '@mui/icons-material/Close';

const fetchImages = async () => {
    const fileRef = ref(fstorage, '/jiminPhoto');
    const result = await listAll(fileRef);
    return await Promise.all(
        result.items.map((item) => getDownloadURL(item))
    );
};

const Photo = () => {
    const { data: images, isLoading } = useQuery({queryKey: ['images'], queryFn: fetchImages});
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickImage = (url: string) => {
        setSelectedImage(url);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setSelectedImage(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <div className={"h-full bg-[#314840]"}>
            {
                selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                        <div className="p-2 relative" ref={modalRef}>
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button onClick={() => setSelectedImage(null)}>
                                    <CloseIcon />
                                </button>
                            </div>
                            <img src={selectedImage} className="max-h-fit sm:h-[50vh] object-cover rounded-lg" alt="Selected"/>
                        </div>
                    </div>
                )
            }

            <div className={"p-24"}/>
            <div className={"flex justify-center text-6xl text-white font-semibold mb-16"}>Photo</div>
            <div className={"px-2 pb-4"}>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 3, 750: 2, 900: 7}}
                >
                    <Masonry gutter="10px">
                        {isLoading ? (
                            Array.from({ length: 30 }).map((_, index) => (
                                <Skeleton key={index} className={`w-28 h-28 sm:w-60 sm:h-48 rounded-xl`} />
                            ))
                        ) : (
                            images?.map((url, index) => (
                                <img key={index} className="w-full rounded-lg cursor-pointer" src={url} alt="Uploaded" onClick={() => handleClickImage(url)} />
                            ))
                        )}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    );
};

export default Photo;
