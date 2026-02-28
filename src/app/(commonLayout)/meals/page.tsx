
import { getMeals } from '@/actions/blog.meals'
import { getCategory } from '@/actions/categories/category'
import MealsCard from '@/components/meals/get-meals'
import { Category } from '@/types/category'
import { pagination } from '@/types/meals/pagination'
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}

const GetMeals = async ({ searchParams }: PageProps) => {
  const serch = await searchParams
  const response = await getMeals(serch);
  if (!response) {
  return (
    <div className="p-4 text-red-500">
      No data found
    </div>
  );
}

const { data, pagination } = response;
  const categorydata = await getCategory()
  console.log(categorydata,'csategory')
    if (!categorydata) {
    return (
      <div className="p-4 text-red-500">
        Failed to load category
      </div>
    );
  }
  

  return (
    <div className="">
      
      <MealsCard initialMeals={data} initialcategory={categorydata.data as Category[]} pagination={pagination as pagination} />
    </div>
  )
}

export default GetMeals