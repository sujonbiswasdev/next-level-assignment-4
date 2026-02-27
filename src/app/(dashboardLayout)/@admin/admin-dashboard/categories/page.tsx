import { getCategory } from "@/actions/categories/category"
import CategoryTable from "@/components/category/categorytable"

const CreateCategory = async() => {
  const category=await getCategory()
    if (!category) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <CategoryTable categorydata={category}/>
    </div>
  )
}

export default CreateCategory
