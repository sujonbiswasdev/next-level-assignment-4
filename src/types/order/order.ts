export interface IOrderItem {
  mealId: string
  price: number
  quantity: number
}

export interface ICreateOrderPayload {
  address: string
  phone: string
  first_name:string
  last_name:string
  items: IOrderItem[]
}





export interface OrderItemMeal {
  id?: string;
  meals_name: string;
  price: number;
  image?: string;
  category_name: string;
  cuisine?: string;
  description?: string;
  dietaryPreference?: string;
  isAvailable?: boolean;
  status?: string;
}

export interface OrderItem {
  meal: OrderItemMeal;
  quantity: number;
  price: number;
}


export interface Order {
  id: string;
  customerId: string;
  providerId: string;
  first_name: string;
  last_name: string;
  status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED" |string;
  totalPrice: number;
  phone: string;
  address: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  orderitem: OrderItem[];
}


export interface SingleOrderResponse {
  result: {
    sucess: boolean;
    message: string;
    result: Order;
  };
}