'use client'
import { ProviderProfile } from '@/types/user/user'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Label } from './ui/label'
import { Pencil, Save } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const Resturantinfo = ({ userinfo }: { userinfo: ProviderProfile }) => {
    const [useinfo, setuserinfo] = useState<ProviderProfile>({ ...userinfo })
    const [editfield, seteditfield] = useState<string | boolean | 'restaurantName' | 'address' | 'description'>('')
    const [inputvalue, setinputvalue] = useState<Partial<ProviderProfile>>({})

    const handleUpdateUser = async <k extends keyof ProviderProfile>(field: k, value: ProviderProfile[k]) => {
        if (value == null) {
            toast.error("please provide a value", { theme: "colored", position: "bottom-right", autoClose: 2000 })
            return
        }
        try {
            const toastid = toast.loading(`"user ${field} updating...."`, { theme: "dark", position: "bottom-right", autoClose: 2000 })
            const res = await fetch(`http://localhost:5000/api/providers/update`, {
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
        <div>

            <div className="divide-y">
                {editfield !== 'restaurantName' ? (<div className="flex shadow-sm items-center justify-between px-6 py-4">
                    <Label className="text-gray-800 font-semibold">restaurantName</Label>
                    <div className="flex gap-1 pr-1">
                        <p className="text-gray-900">{useinfo?.restaurantName || 'sylhet'}</p>
                        <button className="w-[5px]" onClick={() => seteditfield('restaurantName')}><Pencil className="text-green-800 text-[5px]" /></button>
                    </div>
                </div>) :
                    (
                        <div className="flex items-center justify-between px-6 py-4 gap-1">
                            <Input onChange={(e) => setinputvalue({ ...inputvalue, restaurantName: e.target.value })} placeholder="Enter your resturant name" />
                            <button onClick={() => {
                                handleUpdateUser('restaurantName', inputvalue.restaurantName as string)
                                seteditfield('')
                            }
                            }
                            ><Save className="text-blue-800 text-[5px]" /></button>
                        </div>
                    )}

                {editfield !== 'address' ? (<div className="flex shadow-sm items-center justify-between px-6 py-4">
                    <Label className="text-gray-800 font-semibold">address</Label>
                    <div className="flex gap-1 pr-1">
                        <p className="text-gray-900 break-all">{useinfo?.address || 'sylhet'}</p>
                        <button className="w-[5px]" onClick={() => seteditfield('address')}><Pencil className="text-green-800 text-[5px]" /></button>
                    </div>
                </div>) :
                    (
                        <div className="flex items-center justify-between px-6 py-4 gap-1">
                            <Input onChange={(e) => setinputvalue({ ...inputvalue, address: e.target.value })} placeholder="Enter your address" />
                            <button onClick={() => {
                                handleUpdateUser('address', inputvalue.address as string)
                                seteditfield('')
                            }
                            }
                            ><Save className="text-blue-800 text-[5px]" /></button>
                        </div>
                    )}

                {editfield !== 'description' ? (<div className="flex flex-col shadow-sm px-6 py-4">
                    <div className='flex justify-between items-center'>
                        <Label className="text-gray-800 font-semibold mb-2">description</Label>
                        <button className="w-[5px]" onClick={() => seteditfield('description')}><Pencil className="text-green-800 text-[5px]" /></button>
                    </div>

                    <div className="flex flex-1 gap-1 pr-1">
                        <p className="text-gray-600 text-sm break-all">{useinfo?.description}</p>
                    </div>
                </div>) :
                    (
                        <div className="flex items-center justify-between px-6 py-4 gap-1">
                            <Textarea onChange={(e) => setinputvalue({ ...inputvalue, description: e.target.value })} placeholder="Enter your description" />
                            <button onClick={() => {
                                handleUpdateUser('description', inputvalue.description as string)
                                seteditfield('')
                            }
                            }
                            ><Save className="text-blue-800 text-[5px]" /></button>
                        </div>
                    )}
            </div>

        </div>
    )
}

export default Resturantinfo
