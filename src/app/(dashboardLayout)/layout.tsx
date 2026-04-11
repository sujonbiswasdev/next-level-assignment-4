import { AppSidebar } from '@/components/app-sidebar'
import { CartModal } from '@/components/Cardmodel'
import ProfileCard from '@/components/shared/ProfileCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { getSession } from '@/services/auth.service'
import { TUser } from '@/types/user.type'
import React from 'react'

const DashboardLayout = async ({ admin, provider, children }: { admin: React.ReactNode, provider: React.ReactNode, children: React.ReactNode }) => {
  const userinfo = await getSession()
  if (userinfo?.error || !userinfo?.success ) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div className=''>
      <SidebarProvider className=''>
        <div className=''>
          <AppSidebar   user={userinfo?.data as TUser} />
        </div>
        <SidebarInset className=''>
        <header className="w-full md:max-w-[800px] lg:max-w-[1050px] xl:max-w-[1250px] 2xl:max-w-[1440px] mx-auto  border-b bg-white shadow-sm px-3 dark:bg-gray-950 sticky top-0 z-40">
          <div className="flex flex-wrap items-center justify-between gap-4 px-2 sm:px-6 py-2 w-full max-w-full mx-auto min-h-[56px]">
            {/* Sidebar Button + Optional Logo */}
            <div className="flex items-center gap-3 min-w-[2.5rem]">
              <SidebarTrigger />
            </div>

            {/* Unique Professional Input Field - Glass Morphism, Modern Glow, and Animated Icon */}
            <div className="flex-1 flex min-w-[100px]">
              <div className="relative w-full max-w-md select-none">
                <input
                  type="search"
                  id="unique-pro-search"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="System search"
                  placeholder="Type to search across all dashboards…"
                  className="peer w-full px-5 sm:px-8 md:px-12 py-2 md:py-3 rounded-2xl border border-transparent bg-white/70 dark:bg-gray-900/70 backdrop-blur-md focus:bg-white dark:focus:bg-gray-950 focus:border-blue-500 ring-2 ring-transparent focus:ring-blue-400/60 focus:outline-none shadow-lg placeholder-gray-400 dark:placeholder-gray-600 text-base md:text-lg transition-all duration-300 ease-out hover:shadow-xl"
                  style={{
                    boxShadow: '0 2px 32px 0 rgba(74,122,255,0.07)'
                  }}
                />
                {/* Unique animated search icon and colorful accent bar */}
                <span className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 peer-focus:-rotate-6 peer-focus:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 drop-shadow-[0_1px_4px_rgba(74,122,255,0.25)] motion-safe:animate-pulse peer-focus:text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                </span>
                <span className="absolute bottom-0 left-8 sm:left-10 right-5 sm:right-8 h-1 rounded-xl bg-gradient-to-r from-blue-400 via-fuchsia-500 to-emerald-400 opacity-60 pointer-events-none transition-all scale-x-0 peer-focus:scale-x-100 peer-focus:opacity-100 duration-300 origin-left" />
              </div>
            </div>

            {/* Profile Avatar / User Actions -- Responsive handling */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-[2.5rem] justify-end">
              <ProfileCard profile={userinfo.data as TUser} />
            </div>
          </div>
        </header>
          <div className="flex min-h-0 flex-1 flex-col overflow-auto ">
            <main className="flex w-full md:max-w-[800px] lg:max-w-[1050px] xl:max-w-[1250px] 2xl:max-w-[1440px] mx-auto min-w-0 flex-1 flex-col sm:px-2 md:px-4">
              <div className="">
                {userinfo?.data.role == "Admin" ? admin : provider}
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default DashboardLayout
