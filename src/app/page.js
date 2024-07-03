import ProjectContainer from "@/components/ProjectContainer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex bg-slate-100 min-h-screen flex-col">
        <Navbar/>
        <div className="flex min-h-screen">
          <Sidebar/>
          <ProjectContainer/>

        </div>

    </main>
  );
}
