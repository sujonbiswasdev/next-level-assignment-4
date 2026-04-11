import { getmealsforadmin } from "@/actions/meals.action"
import AdminMealsTable from "@/components/modules/meals/adminmealsTable"
import { IGetMealData } from "@/types/meals.type"

interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const AdminMealspage = async ({ searchParams }: PageProps) => {
  const search = await searchParams
  const res = await getmealsforadmin(search);
  if (!res || res.error || !res.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <AdminMealsTable initialmeals={res.data as IGetMealData[]} />
    </div>
  )
}

export default AdminMealspage
