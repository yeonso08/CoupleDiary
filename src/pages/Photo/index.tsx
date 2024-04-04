import React, {useEffect, useRef, useState} from 'react';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import {useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import {fstorage} from '../../../firebase/firebase';
import {getDownloadURL, listAll, ref as storageRef, uploadBytes, deleteObject} from 'firebase/storage';

import {Skeleton} from "../../components/ui/skeleton";

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';

const fetchImages = async () => {
    const fileRef = storageRef(fstorage, '/jiminPhoto');
    const result = await listAll(fileRef);
    const files = await Promise.all(
        result.items.map((item) => getDownloadURL(item))
    );
    return files.sort((a, b) => a.localeCompare(b));
};

const getImageRefFromUrl = (url: string) => {
    const imagePath = url.split('/o/')[1].split('?')[0];
    return storageRef(fstorage, decodeURIComponent(imagePath));
};

const Photo = () => {
    const { data: images, isLoading } = useQuery({queryKey: ['images'], queryFn: fetchImages});
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const queryClient = useQueryClient()
    const modalRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            for (const file of files) {
                const timestamp = format(new Date(), 'yyyyMMddHHmmss');
                const storagePath = `/jiminPhoto/${timestamp}-${file.name}`;
                const fileRef = storageRef(fstorage, storagePath);

                try {
                    await uploadBytes(fileRef, file).then(() =>
                        queryClient.invalidateQueries({queryKey: ['images']})
                    )
                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert(`업로드 실패 ${file.name}`);
                }
            }
            alert('업로드 성공.');
        }
    };
    const deleteImage = async (url: string) => {
        if (window.confirm("삭제 하시겠습니까?")) {
            const imageRef = getImageRefFromUrl(url);
            try {
                await deleteObject(imageRef).then(() =>
                    queryClient.invalidateQueries({queryKey: ['images']})
                )
                setSelectedImage(null)
            } catch (error) {
                alert('삭제 실패 했습니다.');
            }
        }
    };

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
                                <button onClick={() => deleteImage(selectedImage)}>
                                    <DeleteIcon />
                                </button>
                                <button onClick={() => setSelectedImage(null)}>
                                    <CloseIcon />
                                </button>
                            </div>
                            <img src={selectedImage} className="max-h-fit sm:h-[50vh] object-cover rounded-lg"
                                 alt="Selected"/>
                        </div>
                    </div>
                )
            }

            <div className={"p-20"}/>
            <div className={"flex justify-center text-6xl text-white font-semibold mb-16"}>Photo</div>
            <div className={"flex justify-end pb-2 text-white"}>
                <button
                    onClick={() => fileInputRef.current?.click()}
                >
                    <AddIcon fontSize="large"/>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={uploadImages}
                    className="hidden"
                    accept="image/*"
                    multiple
                />
            </div>
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
