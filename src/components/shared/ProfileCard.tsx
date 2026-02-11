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
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileCard() {
  const [data, setdata] = useState(null)



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




  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSession();
        setdata(data?.result.role!)
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

  }, [])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='outline-none border-none p-4 rounded-full cursor-pointer '>👤</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {/* Account Section */}
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
            {data==='Customer'?"":<DropdownMenuItem><Link href={'/dashboard'}> 📊 Dashboard</Link></DropdownMenuItem>}
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
        <DropdownMenuItem>
          <LogOut />
          <Button onClick={handleLogout}>Log out</Button>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}