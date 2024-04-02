import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Layout from "../components/Layout/Layout";
import Photo from "../pages/Photo";
import Diary from "../pages/Diary/Diary";
import DiaryDetail from "../pages/Diary/DiaryDetail";
import DiaryWrite from "../pages/Diary/DiaryWrite";
import RequireAuth from './RequireAuth';
import DiaryModify from "../pages/Diary/DiaryModify";
const AppRoutes = () => {
    return (
<Router>
    <Routes>
        <Route element={<Layout /> }>
            <Route path={"/"} element={<Home />} />
            <Route path={"/photo"} element={<Photo />} />
            <Route element={<RequireAuth />}>
                <Route path={"/diary"} element={<Diary />} />
                <Route path={"/diary/:id"} element={<DiaryDetail />} />
                <Route path={"/diary/write"} element={<DiaryWrite />} />
                <Route path={"/diary/modify/:id"} element={<DiaryModify />} />
            </Route>
        </Route>
    </Routes>
</Router>
    )
}

export default AppRoutes