import { getProviderwithMeals } from "@/actions/provider.actions";
import ProviderPage from "@/components/modules/provider/singleprovider";
import { IGetAllmeals } from "@/types/meals.type";
import { TResponseproviderData } from "@/types/provider.type";
import { TUser } from "@/types/user.type";

const SignleProviderwithMenu = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
    const res = await getProviderwithMeals(id);
      if (!res.success || res.error ||!res.data?.result) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
    const providerData = res.data.result as any;
    console.log(providerData,'ps')

  return (
    <div>
     <ProviderPage data={providerData as TResponseproviderData<{user:TUser,meals:IGetAllmeals[]}>}/>
    </div>
  )
}

export default SignleProviderwithMenu
