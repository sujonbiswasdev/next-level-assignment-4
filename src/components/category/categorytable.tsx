'use client'
import { deleteCategory } from "@/actions/categories/category";
import { Category } from "@/types/category";
import { Eye, Pencil, SquarePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CategoryTable({categorydata}:{categorydata:any}) {
    const router =useRouter()
    const handleDelete=async(id:string)=>{
        const res=await deleteCategory(id)
        if(res.error){
            toast.error('category delete failed')
            return
        }
        toast.success("category delete successfully")
        router.refresh()
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 bg-pink-300 to-gray-100 flex justify-center p-6 shadow-sm rounded-md">

            {/* Container */}
            <div className="w-full max-w-[700px] bg-white/25 rounded-2xl shadow-2xl p-6 overflow-x-auto">
                {/* Title */}
               <div className="flex justify-between cursor-pointer ">
                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Category List
                </h2>
                  <SquarePlus onClick={()=>router.push("/admin-dashboard/create-category")} className="shadow-sm bg-gray-300 p-0.5 rounded-sm  text-black" />
               </div>

                {/* Table */}
                <table className="w-full min-w-[700px] border-collapse">

                    {/* Header */}
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 text-left">No</th>
                            <th className="px-6 py-4 text-left">Image</th>
                            <th className="px-6 py-4 text-left">categoryID</th>
                            <th className="px-6 py-4 text-left">Admin ID</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Action</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>

                        {categorydata.map((item:Category,index:number)=>{
                            return   <tr key={index} className="border-b hover:bg-gray-50 transition duration-300">

                            

                            <td className="px-6 py-4 text-gray-600">
                                {index+1}
                            </td>
                            {/* image */}
                            <td className="px-6 py-4">
                                <div className="w-10 h-10 relative">
                                    <img
                                        src={item.image ||""}
                                        alt="Admin"
                                        className="rounded-full object-cover w-10 h-10 border-2 border-blue-500"
                                    />
                                </div>
                            </td>
                            {/* id */}
                            <td className="px-6 py-4 font-medium text-gray-600">
                                <Link className="text-blue-600 hover:underline" href={`/admin/categories/${item.id}`}>{item.id.slice(0,7)}.....</Link>
                            </td>
                            {/* adminId */}
                            <td className="px-6 py-4 font-medium text-gray-600">
                               <Link className="text-blue-600 hover:underline" href={`/admin-dashboard/profile/${item.user.id}`}> {item.user.id.slice(0,7)}....</Link>
                            </td>

                            {/* name */}
                            <td className="px-6 py-4 text-gray-700 font-medium">
                                {item.name}
                            </td>

                            {/* action */}
                            <td className="px-6 py-4">
                                <div className="flex gap-3">

                                <button onClick={()=>router.push(`/admin/categories/update/${item.id}`)} className="">
                                    <Eye className="text-blue-600 cursor-pointer hover:text-blue-700"/>
                                    </button>

                                    <button onClick={()=>router.push(`/admin/categories/update/${item.id}`)} className="">
                                        <Pencil className="text-green-600 cursor-pointer hover:text-green-700"/>
                                    </button>

                                    <button onClick={()=>handleDelete(item.id)}>
                                        <Trash2 className="text-red-600 cursor-pointer hover:text-red-700"/>
                                    </button>

                                </div>
                            </td>

                        </tr>
                        })}
                    </tbody>

                </table>

            </div>
        </div>
    );
}