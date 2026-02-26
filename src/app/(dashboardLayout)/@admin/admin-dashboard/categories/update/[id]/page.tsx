import Categoryupdate from '@/components/category/categoryupdate'
import React from 'react'

const CategoryUpdatePage = async({params}:{params:Promise<{id:string}>}) => {
    const categoryId=await params
      if (!categoryId) {
    return (
      <div className="p-4 text-red-500">
        Failed to load category
      </div>
    );
  }
  return (
    <div>
      <Categoryupdate categoryid={categoryId.id}/>
    </div>
  )
}

export default CategoryUpdatePage
