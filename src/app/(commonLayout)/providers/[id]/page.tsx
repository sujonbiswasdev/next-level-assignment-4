import { getProviderwithMeals } from '@/actions/provider.action';
import ProviderPage from '@/components/provider/singleprovider';
const SignleProviderwithMenu = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
    const res = await getProviderwithMeals(id);
      if (!res.data || res.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
    const providerData = res.data;
  return (
    <div>
     <ProviderPage data={providerData}/>
    </div>
  )
}

export default SignleProviderwithMenu
