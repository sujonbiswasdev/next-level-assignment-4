"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Eye, Pen, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { updateorderstatus } from "@/actions/order.action";
import { IGetOrderData, TResponseOrderData } from "@/types/order/order.type";
import { useRouter } from "next/navigation";
import { TGetCategory } from "@/types/category";
import { useFilter } from "@/components/shared/filter/ReuseableFilter";
import { TFilterField } from "@/types/filter.types";
import { createOrderColumns } from "./CreateordersColumns";
import { FilterPanel } from "@/components/shared/filter/FilterInput";
import { ReusableTable } from "@/components/shared/ReuseableTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ViewOrdersData from "./ViewOrdersData";
import { UpdateOrderStatusForm } from "./UpdateOrderFrom";
export interface IOrderUpdateStatus {
  status: string
}

const CustomerOrderTable = ({ role,initialorder }: {role:string,initialorder: IGetOrderData[]}) => {
  const router = useRouter();
  const [meals, setMeals] = useState(initialorder);
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState<TResponseOrderData[]>(initialorder);
  const [viewData, setViewData] = useState<TResponseOrderData | null>(null);
  const { updateFilters, reset, isPending } = useFilter();
  const [open, setOpen] = useState(false);
  const [selectedmealid, setSelectedmealId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState(false);


  const [form, setForm] = useState({
    search: "",
      status: "",
      phone: "",
      paymentStatus:'',
      totalPrice: 5000000,
      createdAt: "",
  });

  const columns = createOrderColumns();


  useEffect(() => {
    setTableData(initialorder ?? []);
  }, [initialorder,form]);

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({
      ...prev,
      [key]: typeof value === "string" ? value : String(value)
    }));
  }, []);


  const handleApply = () => {
    updateFilters(form);
  };


  const handleReset = () => {
    const defaultForm = {
      search: "",
            status: "",
            phone: "",
            paymentStatus:'',
            totalPrice: 5000000,
            createdAt: "",

    };
    setForm(defaultForm);
    reset();
  };

  // Filter fields for important column data as per @file_context_0
  const fields: TFilterField[] = [
    {
      type: "text",
      name: "search",
      label: "Search",
      placeholder: "search by name...",
      value: form.search,
      onChange: (val: string) => handleChange("search", val),
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val: string) => handleChange("status", val),
      options: [
        { label: "All", value: "" },
        { label: "Placed", value: "PLACED" },
        { label: "Preparing", value: "PREPARING" },
        { label: "Ready", value: "READY" },
        { label: "Delivered", value: "DELIVERED" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
    },
    {
      type: "select",
      name: "paymentStatus",
      label: "paymentStatus",
      value: form.paymentStatus,
      onChange: (val: string) => handleChange("paymentStatus", val),
      options: [
        { label: "All", value: "" },
        { label: "paid", value: "PAID" },
        { label: "unpaid", value: "UNPAID" },
      ],
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      placeholder: "Search by phone",
      value: form.phone,
      onChange: (val: string) => handleChange("phone", val),
    },
    {
      type: "date",
      name: "createdat",
      label: "Created At",
      placeholder: "YYYY-MM-DD",
      value: form.createdAt,
      onChange: (val: string) => handleChange("createdAt", val),
    },
 
    {
      type: "number",
      name: "total price",
      label: "totla price",
      value: form.totalPrice,
      onChange: (val) => handleChange("totalPrice", Number(val)),
    },


  ];


  const actions = [
    {
      icon: Eye,
      label: "View",
      onClick: (item: any) => {
        setViewData(item);
        setViewMode(true);
        setOpen(true);
      },
    },
    {
      icon: Pencil,
      label: "Edit",
      onClick: (item: any) => {
        setSelectedmealId(item.id);
        setViewMode(false);
        setViewData(item)
        setOpen(true);
      },
    },
  ]
      

    

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Orders Management
        </h1>
        <div className="text-sm text-gray-500">
          Total Orders: {tableData.length}
        </div>
      </div>


      <div className="mb-6 bg-white dark:bg-gray-950 p-3 sm:p-4 md:p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800 transition-all">
       <section className="mb-8 w-full">
        <FilterPanel
          fields={fields}
          onApply={handleApply}
          onReset={handleReset}
          isPending={isPending}
        />
      </section>
       </div>



      {/* Table */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
       {isPending && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm font-medium">Filtering data...</p>
          </div>
        )}
      <div className="mb-6 overflow-x-auto rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        {tableData && Array.isArray(tableData) && tableData.length > 0 ? (
          <ReusableTable columns={columns as any} data={tableData} actions={actions} />
        ) : (
          <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-base select-none">
            No meals data found.
          </div>
        )}
      </div>
      </div>



      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) {
            setSelectedmealId(null);
            setViewData(null);
          }
        }}
      >
        <DialogContent className="max-w-md w-full rounded-xl p-0 sm:p-0 bg-white dark:bg-gray-950">
          <DialogHeader className="flex flex-col items-center justify-center px-6 pt-8 pb-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-t-xl shadow-none">
            <DialogTitle className="text-[1.45rem] sm:text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-1 sm:mb-2 tracking-tight text-center">
              {viewMode ? "My Menu Details" : "Edit Meal"}
         
            </DialogTitle>
            <p
              id="dialog-description"
              className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-0 text-center"
            >
              {viewMode
                ? "View all details about your meal below."
                : "Edit the details of your meal below as needed."}
           
            </p>
          </DialogHeader>

          {/* Make ONLY the modal content scrollable */}
          <div
            className="py-6 px-4 sm:px-8"
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            <ViewOrdersData
              viewData={Array.isArray(viewData) ? viewData[0] : viewData ?? undefined}
              viewMode={viewMode}
            />
      

            {!viewMode && selectedmealid && (
              <div className="mt-6">
                <UpdateOrderStatusForm role={role as string} initialStatus={tableData[0].status as string} id={selectedmealid}/>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default CustomerOrderTable;