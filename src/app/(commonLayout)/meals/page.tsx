
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
  const {data,pagination} = await getMeals(serch);
  console.log(data,'padkjsfd')
    if (!data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  // category
  const categorydata = await getCategory()
    if (!categorydata) {
    return (
      <div className="p-4 text-red-500">
        Failed to load category
      </div>
    );
  }
  

  return (
    <div className="">
      
      <MealsCard initialMeals={data} initialcategory={categorydata} pagination={pagination} />
    </div>
  )
}

export default GetMeals