import { Outlet } from "react-router";
import Header from "../cors-components/header";
import MainContent from "../cors-components/main-content";


export default function LayoutMain() {
    return (
        <>  
            <Header className="mt-9"/>
            <MainContent>
            <Outlet />
            </MainContent>
        </>
    )
}