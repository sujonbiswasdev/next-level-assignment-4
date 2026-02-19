
import { getMeals } from '@/actions/blog.meals'
import RecipeCard from '@/components/meals/get-meals'
import { getcategory } from '@/services/category'
import { mealsService } from '@/services/meals'
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}

const GetMeals = async ({searchParams}:PageProps) => {
  const serch=await searchParams
  console.log(serch,'serarchsdfsdfsdk')
  const category = searchParams.category_name || null;
   console.log(category,'category data')
  const isAvailable =
    searchParams.isAvailable === "true" ? "true" :
    searchParams.isAvailable === "false" ? "false" : null;

  // 🔹 Server fetch
  const res = await getMeals(serch);
  const meals = res?.data?.result?.data || [];
  const pagination=res?.data.result.pagination
 
// category
const categorydata = await getcategory()
const initialcategory=categorydata?.data.result.result

  return (
    <div className="">
      <RecipeCard initialMeals={meals} initialcategory={initialcategory} pagination={pagination} />
    </div>
  )
}

export default GetMeals