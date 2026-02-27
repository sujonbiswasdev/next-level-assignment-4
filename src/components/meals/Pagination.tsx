'use client'
import React, { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { pagination } from '@/types/meals/pagination';
const PaginationPage = ({ pagination }: { pagination: pagination }) => {
  const { total, page=1, limit, totalpage=1} = pagination
  console.log(total,totalpage,totalpage,'sdjfs')

  const searchParams = useSearchParams()
  const router = useRouter();
  const navigatetoPage = (page: number) => {
    if (page < 1) return;
    if (page > totalpage) return;
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`?${params.toString()}`);
  }

  const pageWindow = 4;
  const getPageNumbers = () => {
    const windowIndex = Math.floor((page - 1) / pageWindow);
    const start = windowIndex * pageWindow + 1;
    const end = Math.min(start + pageWindow - 1, totalpage);
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages

  }


  return (
    <div className='flex items-center'>
      <Pagination>
        <div className='flex items-center gap-3 mr-3.5'>
          <span className="text-sm font-medium">
            Page {page} of {totalpage}
          </span>
        </div>
        <PaginationContent className='flex items-center space-x-2 flex-wrap'>
          <PaginationItem>
            <Button disabled={page == 1} onClick={() => navigatetoPage(page - 1)}>
              previews
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              {getPageNumbers().map((currentpage, index) => (
                <button className={page === page ? "bg-blue-800 rounded-sm text-white px-2 py-1" : "bg-gray-600 rounded-sm text-white px-2 py-1"} key={index} onClick={() => navigatetoPage(currentpage)}>
                  {currentpage}
                </button>
              ))}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <Button disabled={page == totalpage} className={`${page == total ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => navigatetoPage(page + 1)}>
              next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationPage
