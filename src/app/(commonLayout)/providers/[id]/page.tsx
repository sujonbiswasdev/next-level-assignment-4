import { getProviderwithMeals } from '@/actions/provider.action';
import ProviderPage from '@/components/provider/singleprovider';
import { ProviderProfile } from '@/types/user/user';
const SignleProviderwithMenu = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
    const res = await getProviderwithMeals(id);
      if (!res.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
    const providerData = res.data;
    console.log(providerData,'providerdata')

  return (
    <div>
     <ProviderPage data={providerData as ProviderProfile}/>
    </div>
  )
}

export default SignleProviderwithMenu
