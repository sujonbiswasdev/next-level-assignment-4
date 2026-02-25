'use client'
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
import { getSession } from '@/services/service';
import { User } from '@/types/user/user';
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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileCard({ profile }: { profile: User }) {
  const defaultProfile = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1766941482/chatgpt_m8tmep.png'


  const router = useRouter()
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      }
    })
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
            <Link className='w-full' href={`${profile.role == 'Customer' ? "/profile" : profile.role == "Admin" ? "/admin-dashboard/profile" : profile.role == 'Provider' ? "/provider-dashboard/profile" : "/"}`}>👤 profile</Link>
          </DropdownMenuItem>
          {profile.role === 'Customer' ? "" : <DropdownMenuItem><Link className='w-full' href={'/dashboard'}> 📊 Dashboard</Link></DropdownMenuItem>}
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>


        {/* Team Management Section */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Team Management</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users />
              <span>Team Settings</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem disabled>
                  <Shield />
                  <span>Permissions</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus />
                  <span>Invite Members</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Monitor />
                    <span>Monitor Activity</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <FileText />
                        <span>Logs</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Server />
                        <span>Server Status</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Globe />
                        <span>Web Traffic</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Bug />
                        <span>System Errors</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {/* Roles Submenu */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Shield />
              <span>Roles</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Plus />
                  <span>Add Role</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users />
                  <span>Assign Roles</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash />
                  <span>Delete Role</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Package />
            <span className="grow flex items-center justify-between">
              <span>Integrations</span>
              <Badge variant="destructive">
                5
              </Badge>
            </span>
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