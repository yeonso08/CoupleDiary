import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Layout from "../components/Layout/Layout.tsx";
import Photo from "../pages/Photo";
import Diary from "../pages/Diary";
import Write from "../pages/write";

const AppRoutes = () => {
    return (
<Router>
    <Routes>
        <Route element={<Layout /> }>
            <Route path={"/"} element={<Home />} />
            <Route path={"/photo"} element={<Photo />} />
            <Route path={"/diary"} element={<Diary />} />
            <Route path={"/write"} element={<Write />} />
        </Route>
    </Routes>
</Router>
    )
}

export default AppRoutes