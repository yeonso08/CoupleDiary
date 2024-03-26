import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import Layout from "../components/Layout/Layout.tsx";

const AppRoutes = () => {
    return (
<Router>
    <Routes>
        <Route element={<Layout /> }>
        <Route path={"/"} element={<Home />} />
        </Route>
    </Routes>
</Router>
    )
}

export default AppRoutes