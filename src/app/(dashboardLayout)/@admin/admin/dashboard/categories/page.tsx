import { getCategory } from "@/actions/category"
import CategoryTable from "@/components/modules/category/categorytable"
import { TGetCategory } from "@/types/category";
const CreateCategory = async() => {
  const category=await getCategory()
    if (!category || !category.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <CategoryTable categorydata={category.data.data as TGetCategory[]}/>
    </div>
  )
}

export default CreateCategory
