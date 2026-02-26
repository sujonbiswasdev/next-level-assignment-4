import { getCategory } from "@/actions/categories/category"
import CategoryTable from "@/components/category/categorytable"

const CreateCategory = async() => {
  const category=await getCategory()
  const categorydata=category?.data.result.result
    if (!category?.data || category.error || !categorydata) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <CategoryTable categorydata={categorydata}/>
    </div>
  )
}

export default CreateCategory
