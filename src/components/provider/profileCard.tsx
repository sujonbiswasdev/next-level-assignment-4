'use client'

import { useState } from "react"
import { Menu, Bell, Edit2, Pencil, Save } from "lucide-react"
import Image from "next/image"
import { ProviderProfile, UpdateUserInput, updateUserSchema, User } from "@/types/user/user"
import { Status, StatusIndicator, StatusLabel } from "../ui/status"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import InfoRow from "../infoRow"
import Resturantinfo from "../resturant"

export default function ProviderProfilePage({ userdata }: { userdata: User }) {
    const [userinfo, setuserinfo] = useState<User>({ ...userdata })
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()
    const [access, setaccess] = useState<string>("profile")
    console.log(userdata, 'data')
    const [inputvalue, setinputvalue] = useState<Partial<UpdateUserInput>>({})
    const [editfield, seteditfield] = useState<string | boolean | 'bgimage' | 'name' | 'phone' | 'isActive'>('')
    const getDate = new Date(userdata.updatedAt)
    const year = getDate.getFullYear()
    const month = getDate.getMonth()
    const day = getDate.getDay()


    const handleUpdateUser = async <k extends keyof User>(field: k, value: User[k]) => {
        if (value == null) {
            toast.error("please provide a value", { theme: "colored", position: "bottom-right", autoClose: 2000 })
            return
        }
        const parseData = updateUserSchema.safeParse({ [field]: value });
        if (!parseData.success) {
            const errors = parseData.error.flatten().fieldErrors;

            Object.values(errors).forEach((err) => {
                if (err) {
                    toast.error(err[1], {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                }
            });
            return;
        }
        try {
            const toastid = toast.loading(`"user ${field} updating...."`, { theme: "dark", position: "bottom-right", autoClose: 2000 })
            const res = await fetch(`http://localhost:5000/api/users/profile/update`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ [field]: value }),
            });
            if (!res.ok) {
                toast.dismiss(toastid)
                toast.error(`"user ${field} update failed"`, { theme: "dark", position: "bottom-right", autoClose: 2000 })
                return
            }
            toast.dismiss(toastid)
            toast.success(`"user ${field} update successfully"`, { theme: "dark", position: "bottom-right", autoClose: 2000 })
            setuserinfo((prev:any) => ({ ...prev, [field]: value }))
        } catch (error: any) {
            toast.error(`someting went wrong please try again`)
        }
    }

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
                    <button onClick={() => {
                        setaccess("profile")
                    }} className={`w-full text-left px-4 py-2 rounded-lg  ${access == 'profile' ? "text-blue-500 bg-blue-100" : "text-black"} font-medium`}>
                        Profile
                    </button>
                    <button onClick={() => { setaccess("resturant") }} className={`w-full text-left px-4 py-2 rounded-lg ${access == 'resturant' ? "text-blue-500 bg-blue-100" : "text-black"}  hover:bg-gray-100`}>
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
                <div
                    className="flex items-center justify-between border-b p-6 max-w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${userinfo.bgimage})`,
                    }}
                >

                    <div className="flex items-center gap-4">
                        {editfield !== 'image' ? (<div className="flex items-center justify-between px-6 py-4">
                            <div className="flex gap-1 pr-1">
                                <img
                                    src={userinfo.image}
                                    alt="profile"
                                    className="w-[100px] h-[100px] object-cover rounded-full shadow-sm border-2"
                                />
                                <button className="w-[5px] -ml-3 -mt-4" onClick={() => seteditfield('image')}><Pencil className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md  text-[5px]" /></button>
                            </div>
                        </div>) :
                            (
                                <div className="flex items-center justify-between gap-1 bg-blue-200 rounded-sm">
                                    <Input className="focus:ring-2 placeholder:text-black" onChange={(e) => setinputvalue({ ...inputvalue, image: e.target.value })} placeholder="Enter your image url" />
                                    <button className="w-[5px] -ml-3 -mt-4" onClick={() => {
                                        handleUpdateUser('image', inputvalue.image as string)
                                        seteditfield('')
                                    }}><Save className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md  text-[5px]" /></button>
                                </div>
                            )}
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            {editfield !== 'bgimage' ? (<div className="flex items-center justify-between px-6 py-4">
                                <div className="flex gap-1 pr-1">
                                    <button className="w-[5px] ml-30 -mt-30" onClick={() => seteditfield('bgimage')}><Pencil className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md  text-[5px]" /></button>
                                </div>
                            </div>) :
                                (
                                    <div className="flex items-center justify-between gap-1 bg-blue-200 rounded-sm">
                                        <Input className="focus:ring-2 placeholder:text-black" onChange={(e) => setinputvalue({ ...inputvalue, bgimage: e.target.value })} placeholder="Enter your image url" />
                                        <button className="w-[5px] -ml-3 -mt-4" onClick={() => {
                                            handleUpdateUser('bgimage', inputvalue.bgimage as string)
                                            seteditfield('')
                                        }}><Save className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md  text-[5px]" /></button>
                                    </div>
                                )}
                        </div>

                    </div>

                </div>

                {/* Profile Card */}
                <section className="p-4 sm:p-6 lg:p-10">

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                        <div className="px-6 sm:px-10 pb-10">



                            {/* Form Section */}
                            <div className="">
                                {access === 'profile' ? (

                                    <div className="mt-10 gap-6">

                                        <div className="divide-y">


                                            {editfield !== 'name' ? (<div className="flex items-center shadow-sm justify-between px-6 py-4">
                                                <Label className="text-gray-600 font-bold">Name</Label>
                                                <div className="flex gap-1 pr-1">
                                                    <p className="text-gray-900 break-all">{userinfo?.name}</p>
                                                    <button className="w-[5px]" onClick={() => seteditfield('name')}><Pencil className="text-green-800 text-[5px]" /></button>
                                                </div>
                                            </div>) :
                                                (
                                                    <div className="flex items-center justify-between px-6 py-4 gap-1">
                                                        <Input onChange={(e) => setinputvalue({ ...inputvalue, name: e.target.value })} placeholder="Enter your name" />
                                                        <button onClick={() => {
                                                            handleUpdateUser('name', inputvalue.name as string)
                                                            seteditfield('')
                                                        }
                                                        }
                                                        ><Save className="text-blue-800 text-[5px]" /></button>
                                                    </div>
                                                )}

                                            <div className="shadow-sm ">
                                                <InfoRow label="Email Address" value={userinfo.email} />
                                            </div>

                                            {editfield !== 'phone' ? (<div className="flex items-center shadow-sm justify-between px-6 py-4">
                                                <Label className="text-gray-800 font-semibold">phone</Label>
                                                <div className="flex gap-1 pr-1">
                                                    <p className="text-gray-900">{userinfo?.phone || '017********'}</p>
                                                    <button className="w-[5px]" onClick={() => seteditfield('phone')}><Pencil className="text-green-800 text-[5px]" /></button>
                                                </div>
                                            </div>) :
                                                (
                                                    <div className="flex items-center justify-between px-6 py-4 gap-1">
                                                        <Input onChange={(e) => setinputvalue({ ...inputvalue, name: e.target.value })} placeholder="Enter your phone number" />
                                                        <button onClick={() => {
                                                            handleUpdateUser('phone', inputvalue.name as string)
                                                            seteditfield('')
                                                        }
                                                        }
                                                        ><Save className="text-blue-800 text-[5px]" /></button>
                                                    </div>
                                                )}



                                            <div className="shadow-sm ">
                                                <InfoRow label="role" value={userinfo.role} />

                                            </div>


                                            <div className="flex items-center justify-between shadow-sm px-6 py-4">
                                                <Label className="text-gray-800 font-semibold">status</Label>
                                                <h4>{userinfo.status == "activate" ?
                                                    (<div className="">
                                                        <Status variant="success">
                                                            <StatusIndicator />
                                                            <StatusLabel className="text-gray-900">{userinfo.status}</StatusLabel>
                                                        </Status>
                                                    </div>) : (<>

                                                        <Status variant="error">
                                                            <StatusIndicator />
                                                            <StatusLabel className="text-gray-900">{userinfo.status}</StatusLabel>
                                                        </Status>

                                                    </>)}</h4>
                                            </div>


                                            <div className="flex items-center justify-between px-6 py-4 shadow-sm">
                                                <Label className="text-gray-800 font-semibold">emailVerified</Label>
                                                <h4>{userinfo.emailVerified ?
                                                    (<div className="">
                                                        <Status variant="success">
                                                            <StatusIndicator />
                                                            <StatusLabel className="text-gray-900">Yes</StatusLabel>
                                                        </Status>
                                                    </div>) : (<>

                                                        <Status variant="error">
                                                            <StatusIndicator />
                                                            <StatusLabel className="text-gray-900">No</StatusLabel>
                                                        </Status>

                                                    </>)}</h4>
                                            </div>


                                            <div className="flex items-center justify-between shadow-sm px-6 py-4">
                                                <Label className="text-gray-800 font-semibold">isActive</Label>

                                                {editfield !== 'isActive' ? (<div className="flex gap-1">

                                                    <h4>{userinfo.isActive ?
                                                        (<div className="">
                                                            <Status variant="success">
                                                                <StatusIndicator />
                                                                <StatusLabel className="text-gray-900">online</StatusLabel>
                                                            </Status>
                                                        </div>) : (<>

                                                            <Status variant="error">
                                                                <StatusIndicator />
                                                                <StatusLabel className="text-gray-900">offline</StatusLabel>
                                                            </Status>

                                                        </>)}</h4>
                                                    <button className="w-[5px]" onClick={() => seteditfield('isActive')}><Pencil className="text-green-800 text-[5px]" /></button>


                                                </div>) : (<div className="flex items-center justify-between px-6 py-4 gap-1">
                                                    <Input
                                                        type="checkbox"
                                                        checked={(inputvalue.isActive) as boolean || false}
                                                        onChange={(e) =>
                                                            setinputvalue((prev: any) => ({ ...prev, isActive: e.target.checked }))
                                                        }
                                                    />
                                                    <button onClick={() => {
                                                        handleUpdateUser('isActive', inputvalue.isActive as boolean)
                                                        seteditfield('')
                                                    }
                                                    }
                                                    ><Save className="text-blue-800 text-[5px]" /></button>
                                                </div>)}
                                            </div>
                                            <InfoRow label="createdAt" value={userinfo.createdAt.toLocaleString().slice(0, 10)} />



                                        </div>
                                    </div>) :
                                    (
                                        <div className="mt-10 ">
                                            <Resturantinfo userinfo={userinfo.provider} />

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
                                            {userinfo.email}
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