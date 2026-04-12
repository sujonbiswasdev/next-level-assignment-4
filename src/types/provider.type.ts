import { IGetMealData } from "./meals.type"
import { TUser } from "./user.type"
  // get provider info
  export interface IProviderInfo {
  id: string;
  userId: string;
  restaurantName: string;
  address: string;
  description: string;
  user:TUser;
  meals?:IGetMealData[]
  rating?:{totalReview: number, averageRating: number};
  totalReview?: number, 
  averageRating?: number
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export type TResponseproviderData<T = unknown> = IProviderInfo & T;
