import {Outlet} from "react-router-dom";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

const Layout = () => {
    return(
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout