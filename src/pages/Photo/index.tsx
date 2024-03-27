import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Photo = () => {

    return (
        <div className={"h-screen bg-blue-300"}>
            <div className={"p-24"} />
            <div className={"flex justify-center text-6xl text-white font-semibold mb-16"}>Photo</div>
            <div>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 7}}
                >
                    <Masonry gutter="10px">
                        <img className={"w-full"} src={"src/assets/1.jpg"}/>
                        <img className={"w-full"} src={"src/assets/2.jpg"}/>
                        <img className={"w-full"} src={"src/assets/3.jpg"}/>
                        <img className={"w-full"} src={"src/assets/4.jpg"}/>
                        <img className={"w-full"} src={"src/assets/5.jpg"}/>
                        <img className={"w-full"} src={"src/assets/6.jpg"}/>
                        <img className={"w-full"} src={"src/assets/7.jpg"}/>
                        <img className={"w-full"} src={"src/assets/8.jpg"}/>
                        <img className={"w-full"} src={"src/assets/9.jpg"}/>
                        <img className={"w-full"} src={"https://picsum.photos/200/300?image=1050"}/>

                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    )
}

export default Photo