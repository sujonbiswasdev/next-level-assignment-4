import { singlecategory } from "@/actions/categories/category"
import Singlecategory from "@/components/category/singlecategory";

const SingleCategoryPage = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
    const singledata=await singlecategory(id)
 if (!singledata || !singledata.result.meals) {
    return (
      <div className="p-4 text-red-500">
        Failed to load category
      </div>
    );
  }
  return (
    <div>
        <Singlecategory meal={singledata.result.meals}/>
    </div>
  )
}

export default SingleCategoryPage
