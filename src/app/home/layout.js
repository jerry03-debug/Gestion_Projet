import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function layout({children}) {
    return(
        <div className="bg-white">
            <Navbar/>
            <div className="flex min-h-screen">
                <Sidebar/>
                <main>{children}</main>
            </div>
        </div>
    )
};
