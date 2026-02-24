import { getProviderwithMeals } from '@/actions/provider.action';
import ProviderPage from '@/components/provider/singleprovider';
const SignleProviderwithMenu = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
    const res = await getProviderwithMeals(id);
    const providerData = res.data;
  return (
    <div>
     <ProviderPage data={providerData}/>
    </div>
  )
}

export default SignleProviderwithMenu
