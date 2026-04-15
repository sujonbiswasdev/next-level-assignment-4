import { getCategory } from "@/actions/category"
import CategoryTable from "@/components/modules/category/categorytable";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";
import { TGetCategory, TResponseCategoryData } from "@/types/category";
import { Ipagination } from "@/types/pagination.type";

const CreateCategory = async () => {
  let categories;
  try {
    categories = await getCategory();
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load categories
      </div>
    );
  }


  return (
    <ErrorBoundary fallback={<ErrorFallback title="Failed to Load Categories" message="An error occurred while loading the categories. Please try again later."/>}>
      <div>
        <CategoryTable pagination={categories?.pagination as Ipagination} category={categories?.data as TResponseCategoryData[]} />
      </div>
    </ErrorBoundary>
  );
};

export default CreateCategory
