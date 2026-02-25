'use client'
import { Camera, Pencil, Save, X } from "lucide-react";
import InfoRow from "./infoRow";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "./ui/label";
import { Status, StatusIndicator, StatusLabel } from "./ui/status";
import { use, useState } from "react";
import { Input } from "./ui/input";
import { UpdateUserInput, updateUserSchema, User } from "@/types/user/user";

function ProfileModal({ user }: { user: User }) {
    const router = useRouter()
    const [useinfo, setuserinfo] = useState<User>({ ...user })
    const [inputvalue, setinputvalue] = useState<Partial<UpdateUserInput>>({})
    const [editfield, seteditfield] = useState<string | boolean | 'bgimage' | 'name' | 'phone' | 'isActive'>('')
    const parseData = updateUserSchema.safeParse(inputvalue)
    if (!user) {
        toast('user not found', { autoClose: 2000, theme: "colored" })
        router.push("/")
    }
    const defaultProfile = 'https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg'
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
            setuserinfo((prev) => ({ ...prev, [field]: value }))
        } catch (error: any) {
            toast.error(`someting went wrong please try again`)
        }
    }
    return (
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl mx-auto">
            {/* Header */}
            <div
                className="flex items-center justify-between border-b p-6 max-w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${useinfo.bgimage})`,
                }}
            >

                <div className="flex items-center gap-4">
                    {editfield !== 'image' ? (<div className="flex items-center justify-between px-6 py-4">
                        <div className="flex gap-1 pr-1">
                            <img
                                src={useinfo.image || defaultProfile}
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


            {/* Details */}
            <div className="divide-y">
                {editfield !== 'name' ? (<div className="flex items-center justify-between px-6 py-4">
                    <Label className="text-gray-600">Name</Label>
                    <div className="flex gap-1 pr-1">
                        <p className="text-gray-900">{useinfo?.name}</p>
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


                <InfoRow label="Email Address" value={user.email} />

                {editfield !== 'phone' ? (<div className="flex items-center justify-between px-6 py-4">
                    <Label className="text-gray-600">phone</Label>
                    <div className="flex gap-1 pr-1">
                        <p className="text-gray-900">{useinfo?.phone || '017********'}</p>
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
                <InfoRow label="role" value={user.role} />
                <div className="flex items-center justify-between px-6 py-4">
                    <Label className="text-gray-600">status</Label>
                    <h4>{user.status == "activate" ?
                        (<div className="">
                            <Status variant="success">
                                <StatusIndicator />
                                <StatusLabel className="text-gray-900">{user.status}</StatusLabel>
                            </Status>
                        </div>) : (<>

                            <Status variant="error">
                                <StatusIndicator />
                                <StatusLabel className="text-gray-900">{user.status}</StatusLabel>
                            </Status>

                        </>)}</h4>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                    <Label className="text-gray-600">emailVerified</Label>
                    <h4>{user.emailVerified ?
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

                <div className="flex items-center justify-between px-6 py-4">
                    <Label className="text-gray-600">isActive</Label>

                    {editfield !== 'isActive' ? (<div className="flex gap-1">

                        <h4>{useinfo.isActive ?
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
                <InfoRow label="createdAt" value={user.createdAt.toLocaleString().slice(0, 10)} />



            </div>


            {/* Footer */}
            <div className="flex justify-end p-6">
                <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default ProfileModal