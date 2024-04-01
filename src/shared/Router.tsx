import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Layout from "../components/Layout/Layout.tsx";
import Photo from "../pages/Photo";
import Diary from "../pages/Diary/Diary.tsx";
import DiaryDetail from "../pages/Diary/DiaryDetail.tsx";
import DiaryWrite from "../pages/Diary/DiaryWrite.tsx";

const AppRoutes = () => {
    return (
<Router>
    <Routes>
        <Route element={<Layout /> }>
            <Route path={"/"} element={<Home />} />
            <Route path={"/photo"} element={<Photo />} />
            <Route path={"/diary"} element={<Diary />} />
            <Route path={"/diary/:id"} element={<DiaryDetail />} />
            <Route path={"/diary/write"} element={<DiaryWrite />} />
        </Route>
    </Routes>
</Router>
    )
}

export default AppRoutes