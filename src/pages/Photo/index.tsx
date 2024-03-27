import  { useState, useEffect } from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { fstorage } from '../../../firebase/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const Photo = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const fileRef = ref(fstorage, '/jiminPhoto');
            const result = await listAll(fileRef);
            const urls = await Promise.all(
                result.items.map((item) => getDownloadURL(item))
            );
            setImages(urls); // URL 배열을 상태 변수에 저장
        };

        fetchImages();
    }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

    return (
        <div className={"h-full bg-blue-300"}>
            <div className={"p-24"} />
            <div className={"flex justify-center text-6xl text-white font-semibold mb-16"}>Photo</div>
            <div className={"px-2"}>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 3, 750: 2, 900: 7}}
                >
                    <Masonry gutter="10px">
                        {images.map((url, index) => (
                            <img key={index} className="w-full rounded-lg" src={url} alt="Uploaded"/>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    )
}

export default Photo