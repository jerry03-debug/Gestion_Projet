'use client'

import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { useParams } from 'next/navigation'

export default function Taches() {
    const params = useParams()
    console.log(params)
    return(
        <main className="flex bg-slate-100 min-h-screen flex-col">
        <Navbar/>
        <div className="flex min-h-screen">
          <Sidebar/>

        </div>

    </main>
    )
};
