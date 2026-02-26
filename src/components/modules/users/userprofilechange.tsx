'use client'
import { updateuserdata } from '@/actions/user/admin'
import { updateUser } from '@/actions/user/user'
import { Updateuserdata, Updateuserschema } from '@/types/user/user'
import { useState } from 'react'
import { toast } from 'react-toastify'

const UserUpdate = ({ userid }: { userid: string }) => {
    const [userdata, setuserdata] = useState<Partial<Updateuserdata>>({});
      const parsedata = Updateuserschema.safeParse(userdata);
      console.log(parsedata,'parsedata')
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       const data = await updateuserdata(userid,parsedata.data!)
       if (!data || data === undefined || data.error || data === null) {
         toast.error("Failed to update meal");
       } else {
         toast.success("Meal updated successfully");
         setuserdata({})
       }
     };
   
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit} className={`w-full max-w-2xl shadow-2xl rounded-3xl p-8 md:p-12 space-y-6`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Update users
        </h2>

        <div className="grid grid-cols-1  gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="role" className="font-medium ml-2 ">role</label>
            <input
              type="text"
              placeholder="please enter your role(Admin,Provider,Customer)"
              value={userdata.role}
              onChange={(e) => setuserdata({ ...updateUser, role: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"

            />
          </div>
        </div>

         <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="status" className="font-medium ml-2 ">status</label>
            <input
              type="text"
              placeholder="please enter your status(activate,suspend)"
              value={userdata.status}
              onChange={(e) => setuserdata({ ...userdata, status: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"

            />
          </div>
        </div>
    
    <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="font-medium ml-2 ">email</label>
            <input
              type="text"
              placeholder="please enter your email"
              value={userdata.email}
              onChange={(e) => setuserdata({ ...userdata, email: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"

            />
          </div>
        </div>
    
        <button
          disabled={!parsedata.success}
          type="submit"
          className={`bg-black text-white p-2 w-full rounded-md ${!parsedata.success ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Update
        </button>
      </form>
    </div>
    )
}

export default UserUpdate
