import { AppSidebar } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { getSession } from '@/services/service'
import { cookies } from 'next/headers'
import React from 'react'

const DashboardLayout = async ({ admin, provider, children }: { admin: React.ReactNode, provider: React.ReactNode, children: React.ReactNode }) => {
  const userinfo = await getSession()
  const user = userinfo.data.result!
  if (!user || user.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div className='container mx-auto'>
      <SidebarProvider className='px-2 sm:px-4 lg:px-8 max-w-[1440px] mx-auto'>
        <div className='max-w-[10%]'>
          <AppSidebar user={user} />
        </div>
        <SidebarInset className='md:max-w-[90%] md:ml-14 max-[600px]:w-full'>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Build Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 ">
            <main className="flex-1 overflow-x-hidden">
              <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {user.role === "Admin" ? admin : provider}
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default DashboardLayout
