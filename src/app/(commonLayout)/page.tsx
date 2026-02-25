import { Button } from "@/components/ui/button";
import { getSession } from "@/services/service";

export default async function Home() {
  const data=await getSession()
  console.log(data,'dd')
  return (
    <div className="">
      
    </div>
  );
}
