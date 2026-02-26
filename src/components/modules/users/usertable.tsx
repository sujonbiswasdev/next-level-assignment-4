'use client'

import Image from "next/image"
import { useState } from "react"
import { Eye, Pen, Pencil, Search, Trash, Trash2 } from "lucide-react"
import { User } from "@/types/user/user"
import Link from "next/link"
import PaginationPage from "@/components/meals/Pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import UserRoleChage from "./userprofilechange"
import { AdminService } from "@/services/users/admin"
import { toast } from "react-toastify"
import { deleteUser } from "@/actions/user/admin"

interface Props {
  users: User[],
  pagination: {
    totalusers: number,
    page: number,
    limit: number,
    totalpage: number
  }
}

export default function UsersTable({ users, pagination }: Props) {
  const [search, setSearch] = useState("")
  const [isActive, setisActive] = useState<boolean>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) || user?.phone?.toLowerCase().includes(search.toLowerCase())
  )
  const handleDelete = async (id: string) => {
    const toastid=toast.loading("user deleting........")
    const res=await deleteUser(id)
    if(res.error){
      toast.dismiss(toastid)
      toast.error(res.error||"user delete failed")
      return
    }
    toast.dismiss(toastid)
    toast.success("user deleted successfully")
  }

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString().toLowerCase());

    if (value === null || value === '' || value === '0') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);

  };
  const roles = ['Admin', 'Provider', "Customer"]
  const status = ['activate', 'suspend']

  return (
    <section className="px-1 sm:px-2 lg:px-3">
      <div className=" mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          All Users
        </h2>
        <p className="text-sm text-gray-500 mt-1 mb-3">
          Manage and monitor platform users
        </p>

        <div className="bg-gray-200 shadow-sm rounded-sm px-1 py-1 gap-0.5 space-y-1 space-x-1 flex flex-wrap mb-3">
          {/* isActive */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border bg-white/80 p-3 shadow-md backdrop-blur transition hover:shadow-lg flex-1">
            <span className="text-sm font-semibold text-gray-700">
              {isActive ? "Active" : "Inactive"}
            </span>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => {
                  setisActive(!isActive)
                  updateFilter("isActive", e.target.checked ? "true" : "false")
                }}
                className="peer sr-only"
              />

              {/* Track */}
              <div className="h-7 w-14 rounded-full bg-gray-300 transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600 peer-focus:ring-4 peer-focus:ring-emerald-300" />

              {/* Thumb */}
              <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ease-out peer-checked:translate-x-7 peer-checked:scale-110" />
            </label>
          </div>
          {/* clear button */}
          {(isActive || !isActive) && (
            <button
              onClick={() => router.push(pathname)}
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 sm:px-4 sm:py-2 flex-1"
            >
              <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur transition group-hover:opacity-100" />
              <span className="relative">Clear Filters</span>
            </button>
          )}

          <select
            onChange={(e) => updateFilter("role", e.target.value)}
            className="min-w-[200px] appearance-none rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-md transition-all hover:shadow-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-200 flex-1"
          >
            <option value="">All role</option>
            {roles?.map((item: any, index: number) => (
              <option key={index} value={item} className="text-black">
                {item}
              </option>
            ))}
          </select>

          {/* status */}
          <select
            onChange={(e) => updateFilter("status", e.target.value)}
            className="
    w-[80%]] max-w-xs
    rounded-2xl
    border border-gray-300
    bg-gradient-to-r from-white via-blue-50 to-white
    px-2
    text-gray-800 text-sm font-medium
    shadow-md
    hover:shadow-lg
    focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400
    appearance-none flex-1
  "
          >
            <option value="">All status</option>
            {status?.map((item: any, index: number) => (
              <option key={index} value={item} className="text-gray-900">
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <div className="flex gap-3">
              <p className="text-gray-700 font-semibold">page:{pagination.page} of {pagination.totalpage},</p>
              <p className="text-gray-700 font-semibold">limit:{pagination.limit},</p>
              <p className="text-gray-700 font-semibold">totaluser:{pagination.totalusers}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users with name and email phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />

          </div>

        </div>

        {/* Table Wrapper */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Scroll wrapper for small devices */}
          <div className="overflow-x-auto">

            <table className="min-w-[1100px] w-full text-sm text-left">

              {/* Table Head */}
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Id</th>

                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email Verified</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Active</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* User Info */}

                    <td className="px-6 py-4 flex items-center gap-4">
                      {index + 1}
                    </td>

                    {/* user */}
                    <td className="px-6 py-4 text-gray-600">

                      <div className="flex items-center gap-2">
                        <div className="relative w-7 h-7">
                          <img
                            src={user.image || ""}
                            alt={user.name}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                    </td>


                    {/* Phone */}
                    <td className="px-6 py-4 text-gray-600">
                      {user.phone ?? "—"}
                    </td>
                    {/* Role */}
                    <td className="px-6 py-4 capitalize">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>

                    {/* Email Verified */}
                    <td className="px-6 py-4">
                      {user.emailVerified ? (
                        <span className="text-green-600 text-xs font-semibold">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-500 text-xs font-semibold">
                          Not Verified
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 capitalize text-gray-700">
                      {user.status}
                    </td>

                    {/* Active */}
                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex  items-center justify-end gap-1">

                        <button onClick={()=>router.push(`/profile/${user.id}`)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition">
                          <Eye size={18} />
                        </button>

                         <button onClick={()=>router.push(`/admin-dashboard/users/${user.id}`)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition">
                          <Pencil size={18} />
                        </button>
                          
                        <button onClick={()=>handleDelete(user.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition">
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No users found.
          </div>
        )}
        <PaginationPage pagination={pagination} />

      </div>
    </section>
  )
}