import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";


/**
 * Layout component: wraps all pages with the Header nav.
 * <Outlet /> renders the matched child route.
 */

function Layout (){
    return (
       <>
       <Header/>
       <main className="main-content">
        <Outlet/>
       </main>
       </>
    )
}
export default Layout;
