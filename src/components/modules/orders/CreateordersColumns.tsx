import CopyableId from "@/components/shared/CopyAndRoutebyId";

// Columns for Orders Table - shows just essential order data
export const createOrderColumns = () => [
  {
    key: "id",
    label: "Order ID",
    render: (row: any) => (
     <CopyableId 
       id={row.id}
       href={`/orders/${row.id}`} 
       className="" 
       showShort={row.id.slice(0,10)?"...":row.id} 
       key={row.id}
     />
    ),
  },
  {
    key: "customerId",
    label: "Customer ID",
    render: (row: any) => (
        <CopyableId 
          id={row.customerId}
          href={`/profile/${row.customerId}`} 
          className="" 
          showShort={row.customerId.slice(0,10)?"...":row.customerId} 
          key={row.customerId}
        />

    ),
  },
  {
    key: "providerId",
    label: "provider Id",
    render: (row: any) => (
        <CopyableId 
          id={row.providerId}
          href={`/providers/${row.providerId}`} 
          className="" 
          showShort={row.customerId.slice(0,10)?"...":row.providerId} 
          key={row.providerId}
        />

    ),
  },
  {
    key: "phone",
    label: "Phone",
    render: (row: any) => (
      <span className="text-gray-700">{row.phone}</span>
    ),
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
    render: (row: any) => {
      const isPaid = row.paymentStatus === "PAID";
      const label = isPaid ? "Paid" : "Unpaid";
      const bgColor = isPaid ? "bg-green-100" : "bg-red-100";
      const textColor = isPaid ? "text-green-800" : "text-red-800";
      const borderColor = isPaid ? "border-green-200" : "border-red-200";

      return (
        <span
          className={`
            px-3 py-1 rounded-lg text-xs font-semibold
            ${bgColor} ${textColor} border ${borderColor} min-w-[100px] text-center inline-block
            tracking-wide shadow-sm transition
          `}
        >
          {label}
        </span>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => (
      <span className="capitalize px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200 min-w-[85px] text-center">
        {row.status}
      </span>
    ),
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row: any) => {
      const date = new Date(row.createdAt);
      return (
        <span className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-700 border border-gray-100 font-medium">
          {isNaN(date.getTime())
            ? "-"
            : date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
               
              })}
        </span>
      );
    },
  },

  
  {
    key: "totalPrice",
    label: "totalPrice",
    render: (row: any) => (
      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
        ৳ {Number(row.totalPrice).toFixed(2)}
      </span>
    ),
  },

];