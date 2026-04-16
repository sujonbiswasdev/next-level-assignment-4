import CopyableId from "@/components/shared/CopyAndRoutebyId";
import { TResponsePayment } from "@/types/payment.type";
import { format } from "date-fns";

export const createPaymentColumns = () => [
  {
    key: "id",
    label: "ID",
    render: (row: TResponsePayment<any>) => (
      <CopyableId id={row.id} showShort={row.id} />
    ),
  },
  {
    key: "mealId",
    label: "mealId",
    render: (row: TResponsePayment<any>) => (
      <CopyableId
        id={row.mealId}
        href={row.mealId ? `/meals/${row.mealId}` : undefined}
        showShort={row.mealId}
      />
    ),
  },
  {
    key: "userId",
    label: "User",
    render: (row: TResponsePayment<any>) => (
      <CopyableId
        id={row.userId}
        href={row.userId ? `/profile/${row.userId}` : undefined}
        showShort={row.userId}
      />
    ),
  },
  {
    key: "orderId",
    label: "orderId",
    render: (row: TResponsePayment<any>) => (
      <CopyableId
        id={row.orderId}
        showShort={row.orderId}
      />
    ),
  },
  {
    key: "amount",
    label: "Amount",
    render: (row: TResponsePayment<any>) => (
      <span className="text-gray-900 dark:text-gray-100">${row.amount}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: TResponsePayment<any>) => {
      let color = "";
      let text = "";
      switch (row.status) {
        case "PAID":
          color = "bg-green-100 text-green-800";
          text = "Paid";
          break;
        case "UNPAID":
          color = "bg-red-100 text-red-800";
          text = "Unpaid";
          break;
        case "REFUNDED":
          color = "bg-yellow-100 text-yellow-800";
          text = "Refunded";
          break;
        default:
          color = "bg-gray-50 text-gray-400";
          text = row.status || "N/A";
      }
      return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
          {text}
        </span>
      );
    },
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row: TResponsePayment<any>) =>
      row.createdAt ? (
        <span
          className="text-gray-600"
          title={new Date(row.createdAt).toLocaleString()}
        >
          {format(new Date(row.createdAt), "dd/MM/yyyy HH:mm")}
        </span>
      ) : (
        <span className="text-gray-400">--</span>
      ),
  },
];