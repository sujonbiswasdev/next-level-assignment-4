import { getMeals } from '@/actions/meals.action'
import { getCategory } from '@/actions/category'
import MealsCard from '@/components/modules/meals/get-meals'
import Notfounddata from '@/components/Notfounddata'
import { TGetCategory } from '@/types/category'
import { IGetMealData } from '@/types/meals.type'
import { Ipagination } from '@/types/pagination.type'
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}

const GetMeals = async ({ searchParams }: PageProps) => {
  const search =await searchParams
  // const response = await getMeals(search,{revalidate:60});
  const response=await fetch("http://localhost:5000/api/v1/meals",{next:{revalidate:60}})
  const res=await response.json()

  // const categorydata = await getCategory()
  //   if (!categorydata) {
  //   return (
  //     <div className="p-4 text-red-500">
  //       Failed to load category
  //     </div>
  //   );
  // }
  return (
    <div className="">
      
      {!res.success?(
        <div>
          <Notfounddata content='data not found'/>
        </div>
      ):(<div>

        {/* <MealsCard initialMeals={res.data?.data as IGetMealData[]} initialcategory={categorydata.data?.data as TGetCategory[]} pagination={res.data?.pagination as Ipagination} /> */}
      </div>)}
    </div>
  )
}

export default GetMeals