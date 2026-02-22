'use client'

import { useState } from "react"
import { Menu, Bell, Edit2 } from "lucide-react"
import Image from "next/image"
import { ProviderUser } from "@/types/user/user"
import { Status, StatusIndicator, StatusLabel } from "../ui/status"
import { useRouter } from "next/navigation"

export default function ProviderProfilePage({ userdata }: { userdata: ProviderUser }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router=useRouter()
    const [access,setaccess]=useState<string>("profile")
    console.log(userdata,'data')

    const getDate = new Date(userdata.updatedAt)
    const year = getDate.getFullYear()
    const month = getDate.getMonth()
    const day = getDate.getDay()

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <aside
                className={`fixed lg:static z-40 top-0 left-0 h-full 
        w-64 bg-white shadow-md transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
            >
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                </div>

                <nav className="p-4 space-y-2">
                    <button onClick={()=>{
                        setaccess("profile")
                    }} className={`w-full text-left px-4 py-2 rounded-lg  ${access=='profile'?"text-blue-500 bg-blue-100":"text-black"} font-medium`}>
                        Profile
                    </button>
                      <button onClick={()=>{setaccess("resturant")}} className={`w-full text-left px-4 py-2 rounded-lg ${access=='resturant'?"text-blue-500 bg-blue-100":"text-black"}  hover:bg-gray-100`}>
                        resturant info
                    </button>
                    
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 w-full">

                {/* Top Header */}
                <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>

                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">

                            </h1>
                            <p className="text-sm text-gray-500">
                                {userdata.createdAt}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Bell className="text-gray-500 cursor-pointer" />
                        <Image
                            src={userdata.image}
                            alt="profile"
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                    </div>
                </header>

                {/* Profile Card */}
                <section className="p-4 sm:p-6 lg:p-10">

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                        {/* Gradient Banner */}
                        <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-400" />

                        <div className="px-6 sm:px-10 pb-10">

                            {/* Profile Header */}
                            <div className="-mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                                <div className="flex items-center gap-4">
                                    <Image
                                        src={userdata.image}
                                        alt="avatar"
                                        width={90}
                                        height={90}
                                        className="rounded-full border-4 border-white shadow-md"
                                    />
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-semibold">
                                            {userdata.name}
                                        </h2>
                                        <p className="text-gray-500 text-sm">
                                            {userdata.email}
                                        </p>
                                    </div>
                                </div>

                                <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                            </div>

                            {/* Form Section */}
                            <div className="">
                               {access==='profile'?(
                                
                                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="flex flex-wrap gap-3 shadow-sm p-1 items-center">
                                    <h3 className="font-semibold text-lg">emailVerified :</h3>
                                    <p className="font-medium">{userdata.emailVerified ? "Yes" : "No"}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 shadow-sm p-1 items-center">
                                    <h3 className="font-semibold text-lg">phone :</h3>
                                    <p className="font-medium">{userdata.phone ? userdata.phone : "017*******"}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 shadow-sm p-1 items-center">
                                    <h3 className="font-semibold text-lg">role :</h3>
                                    <p className="font-medium">{userdata.role}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 shadow-sm p-1 items-center">
                                    <h3 className="font-semibold text-lg">status :</h3>
                                    <p className="font-medium">{userdata.status}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 shadow-sm p-1 items-center">
                                    <h3 className="font-semibold text-lg">isActive :</h3>
                                    <p className="font-medium">{userdata.isActive ? (<Status variant="success">
                                        <StatusIndicator />
                                        <StatusLabel>Online</StatusLabel>
                                    </Status>) : (<Status variant="error">
                                        <StatusIndicator />
                                        <StatusLabel>Offline</StatusLabel>
                                    </Status>)}</p>
                                </div>
                               </div>):
                               (
                               <div className="mt-10 ">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="flex flex-wrap gap-3 shadow-sm p-1 items-center">
                                    <h3 className="font-semibold text-lg">restaurantName :</h3>
                                    <p className="font-medium">{userdata.provider.restaurantName}</p>
                                </div>

                                 <div className="flex flex-wrap gap-3 shadow-sm p-1 items-center">
                                    <h3 className="font-semibold text-lg">address :</h3>
                                    <p className="font-medium">{userdata.provider.address}</p>
                                </div>
                                </div>

                                <div className="flex flex-wrap gap-3 shadow-sm p-1 mt-2 items-center">
                                    <h3 className="font-semibold text-lg">description :</h3>
                                    <p className=" text-gray-600 text-sm">{userdata.provider.description}</p>
                                </div>
                               </div>
                            )}
                            </div>

                            {/* Email Section */}
                            <div className="mt-10">
                                <h3 className="font-semibold text-gray-800 mb-4">
                                    My Email Address
                                </h3>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium">
                                            {userdata.email}
                                        </p>
                                        <span className="text-xs text-gray-500">
                                            {year}-{month}-{day}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>

            </main>
        </div>
    )
}