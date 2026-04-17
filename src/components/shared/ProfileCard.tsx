'use client'
import { userLogout } from '@/actions/auth.actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/authClient';
import { TUser } from '@/types/user.type';
import {
  LogOut,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export default function ProfileCard({ profile }: { profile: TUser }) {
  const defaultProfile = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1766941482/chatgpt_m8tmep.png'


  const router = useRouter()
  const handleLogout = async () => {
    const toastId=toast.loading("user logouting........")
    const res=await userLogout()
    if(!res.data || !res.success){
      toast.dismiss(toastId)
      toast.error("user logout failed")
      return;
    }
    toast.dismiss(toastId)
    toast.success(res.message || "user logout successfully")
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-primary shadow-md">
          <Image
            src={profile.image || defaultProfile}
            alt={profile.name}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {/* Account Section */}
        <DropdownMenuLabel>
          My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className='w-full' href={`${profile.role == 'Customer' ? "/profile" : profile.role == "Admin" ? "/admin/dashboard/profile" : profile.role == 'Provider' ? "/provider/dashboard/profile" : "/"}`}>👤 profile</Link>
          </DropdownMenuItem>
          {profile.role === 'Customer' ? "" : <DropdownMenuItem><Link className='w-full' href={'/dashboard'}> 📊 Dashboard</Link></DropdownMenuItem>}
          <DropdownMenuItem>
            <Settings />
            <Link href={profile.role==="Customer"?"/settings":profile.role=="Provider"?"/provider/dashboard/setting":profile.role==="Admin"?"/admin/dashboard/setting":"/"}><span>Settings</span></Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* Logout */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}