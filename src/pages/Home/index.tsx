import  { useState, useEffect } from 'react';
import mainPhoto from '../../assets/mainPhoto.jpg';
import mobileMainPhoto from '../../assets/mobileMainPhoto.jpg';

const Home = () => {
    const [imageSrc, setImageSrc] = useState<string>(mainPhoto);
    const [containerClass, setContainerClass] = useState<string>("flex justify-center items-center h-screen bg-pink-200");
    const [daysTogether, setDaysTogether] = useState<number>(0);

    useEffect(() => {
        // 사귄 일수 계산 (한국 시간 기준)
        const calculateDaysTogether = (): void => {
            const koreaTimeOffset = 9 * 60; // 한국은 UTC+9
            const now = new Date();
            const currentKoreaTime = new Date(now.getTime() + (now.getTimezoneOffset() + koreaTimeOffset) * 60000);

            const startDate = new Date("2023-12-11T00:00:00+09:00"); // 사귄 시작 날짜 (한국 시간 기준)
            const timeDiff = currentKoreaTime.getTime() - startDate.getTime();
            const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // 일 단위로 변환
            setDaysTogether(daysDiff + 1);
        };

        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setImageSrc(mobileMainPhoto);
                setContainerClass("flex justify-center items-center h-screen bg-pink-200");
            } else {
                setImageSrc(mainPhoto);
                setContainerClass("flex justify-center items-center h-screen bg-pink-200");
            }
        };

        calculateDaysTogether();
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={containerClass}>
        <img className="max-h-fit sm:min-h-screen filter brightness-75" src={imageSrc} alt="couple"/>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className={""}>
            <p className="text-white sm:text-6xl text-4xl font-medium">JI MIN & JAE YEON</p>
                <p className="text-white sm:text-4xl text-3xl font-medium">D + {daysTogether}</p>
            </div>
        </div>
    </div>
)
}

export default Home