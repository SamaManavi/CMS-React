import React from 'react';
import {Outlet} from "react-router";
import Sidebar from "../common/Sidebar.jsx";
import Theme from "../common/Theme.jsx";
import Footer from "../common/Footer.jsx";

function DashboardLayout() {
    return (
        <>
            <main>
                <Sidebar/>
                <Outlet/>
            </main>
            <Theme/>
            <Footer/>
        </>
    );
}

export default DashboardLayout;