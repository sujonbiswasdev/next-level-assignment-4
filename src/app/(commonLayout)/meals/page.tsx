
import { getMeals } from '@/actions/blog.meals'
import MealsCard from '@/components/meals/get-meals'
import { getcategory } from '@/services/category'
import { mealsService } from '@/services/meals'
import next from 'next'
import Image from 'next/image'
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}

const GetMeals = async ({ searchParams }: PageProps) => {
  const serch = await searchParams
  // 🔹 Server fetch
  const res = await getMeals(serch);
  const meals = res?.data?.result?.data || [];
  const pagination = res?.data?.result?.pagination

  // category
  const categorydata = await getcategory()
  const initialcategory = categorydata?.data.result.result

  return (
    <div className="">
      
      <MealsCard initialMeals={meals} initialcategory={initialcategory} pagination={pagination} />

    </div>
  )
}

export default GetMeals