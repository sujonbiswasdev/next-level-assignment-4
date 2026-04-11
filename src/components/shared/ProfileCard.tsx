'use client'
import { userLogout } from '@/actions/auth.actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/authClient';
import { TUser } from '@/types/user.type';
import {
  Bug,
  FileText,
  Globe,
  LogOut,
  Mail,
  Monitor,
  Package,
  Plus,
  Server,
  Settings,
  Shield,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export default function ProfileCard({ profile }: { profile: TUser }) {
  const defaultProfile = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1766941482/chatgpt_m8tmep.png'


  const router = useRouter()
  const handleLogout = async () => {
    const toastId=toast.loading("user logouting........")
    const res=await userLogout()
    if(res.error){
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
          <img
            src={profile.image || defaultProfile}
            alt={profile.name}
            width={100}
            height={100}
            className="object-cover"
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
            <Link className='w-full' href={`${profile.role == 'Customer' ? "/profile" : profile.role == "Admin" ? "/profile" : profile.role == 'Provider' ? "/provider-dashboard/profile" : "/"}`}>👤 profile</Link>
          </DropdownMenuItem>
          {profile.role === 'Customer' ? "" : <DropdownMenuItem><Link className='w-full' href={'/dashboard'}> 📊 Dashboard</Link></DropdownMenuItem>}
          <DropdownMenuItem>
            <Settings />
            <Link href={"/profile/settings"}><span>Settings</span></Link>
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