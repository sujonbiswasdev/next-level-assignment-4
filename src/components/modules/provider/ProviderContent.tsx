'use client'
import { FilterPanel } from '@/components/shared/filter/FilterInput';
import { useFilter } from '@/components/shared/filter/ReuseableFilter';
import { TFilterField } from '@/types/filter.types';
import { TResponseproviderData } from '@/types/provider.type';
import { TUser } from '@/types/user.type';
import React, { useCallback, useState } from 'react'
import ProviderCard from './ProviderCard';
import Notfounddata from '@/components/Notfounddata';

const ProviderContent = ({data}:{data:TResponseproviderData<{user:TUser}>}) => {
  const { updateFilters, reset, isPending } = useFilter();
  const [form, setForm] = useState({
    search: "",
    email: "",
    isActive: true,
  });

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleApply = () => {
    updateFilters(form);
  };

  const handleReset = () => {
    const defaultForm = {
      search: "",
      email: "",
      isActive: true,
    };
    setForm(defaultForm);
    reset();
  };
  const fields:TFilterField[] = [
    { type: "text", name: "search", value: form.search, placeholder: "Search provider by name...", label: "Search", onChange: (val: string) => handleChange("search", val) },
    { type: "text", name: "email", value: form.email, placeholder: "Search by email...", label: "Email", onChange: (val: string) => handleChange("email", val) },
    {
      type: "select",
      name: "isActive",
      label: "Active Status",
      value: String(form.isActive),
      onChange: (val: string) => handleChange("isActive", val),
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" }
      ]
    }
  ];

  return (
    <section className="w-full flex justify-center py-10 max-w-[1480px] mx-auto">
  <div className="w-full">
      <div className="text-center mb-10 space-y-3 mt-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Provider Management
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Easily discover, filter, and manage food providers. Use the search tools below to find providers by name, email, or status. This dashboard streamlines the process of connecting with trusted restaurants and home chefs on FoodHub.
      </p>
 
      </div>
   <div className="grid grid-cols-1 md:grid-cols-2">
     <section className="mb-8 w-full px-2 sm:px-4">
        <FilterPanel
          fields={fields}
          onApply={handleApply}
          onReset={handleReset}
          isPending={isPending}
          className='flex flex-wrap max-w-[300px]'
          classRoot='bg-none max-w-[300px]'
          buttonClassName='px-2 py-1 text-[14px]'
        />
      </section>

      <div className="relative dark:bg-gray-950 w-full ">
        {isPending && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm font-medium">Filtering data...</p>
          </div>
        )}
        <div className="flex w-full flex-col lg:flex-row gap-6">
          <div className="w-full lg:max-w-sm lg:w-[400px] xl:w-[450px] 2xl:w-[500px] mx-auto lg:mx-0">
            <div className="w-full">
              {!data ? (
                <Notfounddata content="No provider data found." path='/providers' btntext='providers' emoji="📦"/>
              ) : (
                <ProviderCard data={data}/>
              )}
            </div>
          </div>
        </div>
      </div>
 
   </div>
    
  </div>
      </section>
  )
}

export default ProviderContent