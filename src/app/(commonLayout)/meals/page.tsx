
import { getMeals } from '@/actions/blog.meals'
import { getCategory } from '@/actions/categories/category'
import MealsCard from '@/components/meals/get-meals'
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}

const GetMeals = async ({ searchParams }: PageProps) => {
  const serch = await searchParams
  const res = await getMeals(serch);
    if (!res?.data || res.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  const meals = res?.data?.result?.data || [];
  const pagination = res?.data?.result?.pagination

  // category
  const categorydata = await getCategory()
  const initialcategory = categorydata?.data.result.result
    if (!categorydata?.data || categorydata.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }

  return (
    <div className="">
      
      <MealsCard initialMeals={meals} initialcategory={initialcategory} pagination={pagination} />

    </div>
  )
}

export default GetMeals