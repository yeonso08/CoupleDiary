import AddIcon from '@mui/icons-material/Add';

const Diary = () => {

    return (
        <div className={"bg-[#314840] h-screen"}>
            <div className={"p-24"}/>
            <div className={"flex justify-center text-6xl text-white font-semibold mb-16"}>Diary</div>
            <div className={"flex justify-end text-white pb-2 px-2"} ><AddIcon fontSize={"large"} /></div>
            <div className={"grid gap-4 px-2 pb-4"}>
                <div className={"grid p-4 bg-gray-50 rounded-md gap-1"}>
                    <div className={"text-2xl"}>아 날씨 좋다</div>
                    <div className={"flex justify-between"}>
                        <div className={"text-xs"}>작성자: 황재연</div>
                        <div className={"text-xs"}>날짜: 2024-12-11</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Diary