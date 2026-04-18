"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BadgePlus, Eye, Pen, Pencil, Trash, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Status, StatusIndicator, StatusLabel } from "../../ui/status";
import { DeleteMeals } from "@/actions/meals.action";
import { cuisines, dietaryPreferences, IGetMealData, TResponseMeals, UpdateMealsData } from "@/types/meals.type";
import { useFilter } from "@/components/shared/filter/ReuseableFilter";
import { IgetReviewData } from "@/types/reviews.type";
import { IProviderInfo } from "@/types/provider.type";
import { TGetCategory, TResponseCategoryData } from "@/types/category";
import { createMyMealColumns } from "./CreatemymealColumns";
import { TFilterField } from "@/types/filter.types";
import { FilterPanel } from "@/components/shared/filter/FilterInput";
import { ReusableTable } from "@/components/shared/ReuseableTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ViewMealsData from "./ViewMealsData";
import { TUser } from "@/types/user.type";
import UpdateMeal from "./updateMeals";
import { Ipagination } from "@/types/pagination.type";
import PaginationPage from "./Pagination";
import AdminMealsUpdate from "./AdminUpdateMeals";


const MealTable = ({role,pagination,categories, initialmeals }: {role?:string,pagination:Ipagination,categories:TResponseCategoryData<{user:TUser}>[], initialmeals: TResponseMeals<{category:TGetCategory,provider:IProviderInfo,reviews:IgetReviewData}>[]}) => {
  const router = useRouter();
  const [meals, setMeals] = useState(initialmeals);
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState<TResponseMeals<{category:TGetCategory,provider:IProviderInfo,reviews:IgetReviewData}>[]>(initialmeals);
  const [viewData, setViewData] = useState<TResponseMeals<{category:TGetCategory,provider:IProviderInfo,reviews:IgetReviewData}>[] | null>(null);
  const { updateFilters, reset, isPending } = useFilter();
  const [open, setOpen] = useState(false);
  const [selectedmealid, setSelectedmealId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState(false);


  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) return;

    try {
      const toastId=toast.loading("meal deleting......")
      const res = await DeleteMeals(id)
      if (!res.data || !res.success) {
        toast.dismiss(toastId)
        toast.error(res.message || "Failed to delete meal.");
        return
      }
      setMeals(meals.filter((meal: any) => meal.id !== id));
      toast.dismiss(toastId)
      toast.success(res.message || "Meal deleted successfully.");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };
   
  const [form, setForm] = useState({
    search:"",
    status: "",
    isAvailable: "",
    category_name: "",
    cuisine: "",
    price:null,
    dietaryPreference: "",
  });

  const columns = createMyMealColumns();


  useEffect(() => {
    setTableData(initialmeals ?? []);
  }, [initialmeals]);

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);


  const handleApply = () => {
    updateFilters(form);
  };


  const handleReset = () => {
    const defaultForm = {
      search: "",
      status: "",
      isAvailable: "",
      category_name: "",
      cuisine: "",
      price: null,
      dietaryPreference: "",
 
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
      placeholder: "Meal name or description",
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
        { label: "Pending", value: "PENDING" },
        { label: "Approved", value: "APPROVED" },
        { label: "Rejected (set status)", value: "REJECTED" },
   
      ],
    },
    {
      type: "select",
      name: "isAvailable",
      label: "Available",
      value: form.isAvailable || "",
      onChange: (val: string) => handleChange("isAvailable", val),
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
    { type: "select", name: "cuisine", value: form.cuisine, placeholder: "cuisine...", label: "cuisine", onChange: (val) => handleChange("cuisine", val), options: cuisines.map(v => ({ label: v, value: v })) },
    { type: "select", name: "dietaryPreference", value: form.dietaryPreference, placeholder: "e.g. Gluten Free", label: "dietaryPreference", onChange: (val) => handleChange("dietaryPreference", val), options: dietaryPreferences.map(v => ({ label: v, value: v })) },
    { type: "number", name: "price", label: "Price", value: form.price as any, onChange: (val) => handleChange("price", val) },
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

        {
          icon: Trash2,
          label: "delete",
          onClick: (item: any) => {
            handleDelete(item.id);
          },
        },
      ]

    


  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center sm:text-left">
          Meal Management
        </h1>

        <button
          onClick={() => router.push(role=="Provider"?"/provider/dashboard/create-meals":"")}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition duration-300"
        >
          <BadgePlus size={18} />
          Add Meal
        </button>
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
            <ViewMealsData
              viewData={Array.isArray(viewData) ? viewData[0] : viewData ?? undefined}
              viewMode={viewMode}
            />
      

            {!viewMode && selectedmealid && (
              <div className="mt-6">
              
              {role=="Admin"?(<div>
                <AdminMealsUpdate id={selectedmealid}/>
              </div>):(<div>
                <UpdateMeal mealId={selectedmealid}/>
              </div>)}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div>
        <PaginationPage pagination={pagination}/>
      </div>

    </div>
  );
};

export default MealTable;