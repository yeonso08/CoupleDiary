import  { useState, useEffect } from 'react';

const Home = () => {
    const [imageSrc, setImageSrc] = useState("src/assets/mainPhoto.jpg");
    const [containerClass, setContainerClass] = useState("flex justify-center items-center h-screen bg-green-950");

    useEffect(() => {
        // 브라우저 너비에 따라 이미지 소스 변경
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setImageSrc("src/assets/IMG_3048.JPG");
                setContainerClass("flex justify-center items-center h-screen bg-[#314840]");

            } else {
                setImageSrc("src/assets/mainPhoto.jpg");
                setContainerClass("");
            }
        };

        // 컴포넌트 마운트 시 확인
        handleResize();

        // 윈도우 크기가 변경될 때마다 확인
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={containerClass}>
        <img className="max-h-fit sm:min-h-screen filter brightness-75" src={imageSrc} alt="couple"/>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className={""}>
            <p className="text-white sm:text-6xl text-4xl font-medium">JI MIN & JAE YEON</p>
            <p className={"text-white sm:text-4xl text-3xl font-medium"}>D + 109</p>
            </div>
        </div>
    </div>
)
}

export default Home