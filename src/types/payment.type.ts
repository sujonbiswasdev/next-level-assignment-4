export type TBasePayment = {
    id: string;
    userId: string;
    mealId: string;
    stripeEventId?: string | null;
    transactionId?: string | null;
    paymentGatewayData?: any;
    amount: number;
    status: 'UNPAID' | 'PAID' | 'FREE' | string;
    orderId: string;
    createdAt:string
  };
  
  export type TResponsePayment<T = unknown> = TBasePayment & T;