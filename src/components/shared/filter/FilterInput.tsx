"use client";

import React, { useState } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { TFilterField } from "@/types/filter.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const FilterPanel = ({
  fields,
  onReset,
  onApply,
  isPending,
  className,
  classRoot,
  buttonClassName
}: {
  fields: TFilterField[];
  onReset?: () => void;
  onApply?: () => void;
  isPending?: boolean;
  className?:string
  classRoot?:string
  buttonClassName?:string
}) => {
  const [isApplySpinning, setIsApplySpinning] = useState(false);
  const [isResetSpinning, setIsResetSpinning] = useState(false);


  const handleApplyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onApply) return;
    setIsApplySpinning(true);
    try {
      await Promise.resolve(onApply());
    } finally {
      setIsApplySpinning(false);
    }
  };

  const handleResetClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onReset) return;
    setIsResetSpinning(true);
    try {
      await Promise.resolve(onReset());
    } finally {
      setIsResetSpinning(false);
    }
  };

  return (
    <section className={cn("relative isolate w-full overflow-hidden p-4 sm:p-6 md:p-8 rounded-[28px] border border-white/20 dark:border-white/10 backdrop-blur-2xl bg-white/60 dark:bg-gray-900/60 shadow-lg transition-all duration-300",classRoot)}>
      <div
        className={cn("pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-100/70 via-blue-100/70 to-transparent dark:from-blue-950/30 dark:via-slate-950/30 dark:to-transparent blur-2xl opacity-50",classRoot)}
        aria-hidden
      />
      <form
        className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6",className)}
        style={{ position: "relative", zIndex: 1 }}
        autoComplete="off"
        onSubmit={(e) => { e.preventDefault(); onApply?.(); }}
      >
        {fields.map((field) => {
          // Common class for input-like elements
          const base =
            "w-full rounded-lg px-4 py-2 text-base outline-none border bg-white/90 dark:bg-gray-900/90 border-gray-300 dark:border-gray-700 shadow-sm transition focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600";
          // Field card container
          const card =
            "group flex flex-col gap-2 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-white/95 dark:hover:from-blue-950/40 dark:hover:to-gray-950/40 transition-all";

          // 🔹 TEXT-LIKE
          if (
            field.type === "text" ||
            field.type === "email" ||
            field.type === "password" ||
            field.type === "search" ||
            field.type === "url" ||
            field.type === "tel"
          ) {
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1 tracking-wide">
                  {field.label ?? field.name}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 group-focus-within:scale-110 transition" />
                  <input
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder || "Search..."}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={`${base} pl-11`}
                  />
                </div>
              </div>
            );
          }

          // 🔹 NUMBER
          if (field.type === "number") {
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1 tracking-wide">
                  {field.label}
                </label>

                <input
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (newValue <= 5000000) {
                      field.onChange(newValue);
                    }
                  }}
                  className={base}
                />
          

              </div>
            );
          }

          // 🔹 DATE/TIME
          if (
            field.type === "date" ||
            field.type === "time" ||
            field.type === "datetime-local" ||
            field.type === "month" ||
            field.type === "week"
          ) {
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1 tracking-wide">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={base}
                />
              </div>
            );
          }

          // 🔹 CHECKBOX
          if (field.type === "checkbox") {
            return (
              <div key={field.name} className={`flex items-center gap-4 ${card}`}>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-5 h-5 rounded accent-indigo-500 dark:accent-blue-700 border-gray-400 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 transition-all checked:scale-110"
                  id={field.name}
                  style={{ minWidth: 10, minHeight: 10 }}
                />
                <label htmlFor={field.name} className="text-base font-medium text-gray-800 dark:text-gray-100 select-none">
                  {field.label}
                </label>
              </div>
            );
          }

          // 🔹 SELECT
          if (field.type === "select") {
            const selectedValue = field.value ? String(field.value) : "__all__";
            return (
              <div key={field.name} className={card}>
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1 tracking-wide">
                  {field.label}
                </label>
                <Select
                  value={selectedValue}
                  onValueChange={(value) =>
                    field.onChange(value === "__all__" ? "" : value)
                  }
                >
                  <SelectTrigger className={`${base} cursor-pointer bg-white/80 dark:bg-gray-900/80`}>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[320px] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 ring-1 ring-blue-100 dark:ring-blue-900">
                    <SelectItem value="__all__" className="font-normal py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded">
                      All
                    </SelectItem>
                    {field.options
                      .filter((opt) => String(opt.value) !== "")
                      .map((opt) => (
                        <SelectItem
                          key={String(opt.value)}
                          value={String(opt.value)}
                          className="font-normal py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }

          // 🔹 RANGE
          if (field.type === "range") {
            return (
              <div key={field.name} className={card + " gap-3"}>
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wide">
                  {field.label}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full accent-indigo-500 dark:accent-blue-600 h-2 rounded transition"
                  />
                  <span className="ml-2 text-base font-bold text-indigo-600 dark:text-blue-300">
                  ৳{field.value}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                  <span>৳{field.min}</span>
                  <span>৳{field.max}</span>
                </div>
              </div>
            );
          }

          return null;
        })}
      </form>
      <div className={cn("mt-10 flex flex-wrap justify-center gap-4")}>
        <button
          onClick={handleApplyClick}
          disabled={isPending}
          className={cn("flex items-center justify-center gap-2 px-10 py-3 rounded-lg text-white font-semibold shadow-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 disabled:opacity-50 transition-all text-base tracking-wide outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",buttonClassName)}
          type="button"
        >
          {isApplySpinning && isPending && onApply
            ? (
              <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Filter className="w-5 h-5" />
            )}
          Apply Filters
        </button>
        <button
          onClick={handleResetClick}
          disabled={isPending}
          className={cn("flex items-center justify-center gap-2 px-10 py-3 rounded-lg text-gray-700 dark:text-gray-300 font-semibold shadow border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 hover:bg-gray-100 dark:hover:bg-gray-800/90 hover:shadow-xl transition-all disabled:opacity-50 text-base tracking-wide outline-none focus:ring-2 focus:ring-blue-400",buttonClassName)}
          type="button"
        >
          {isResetSpinning && isPending && onReset
            ? (
              <div className="h-6 w-6 border-2 border-gray-400/30 border-t-green-600 dark:border-t-green-300 rounded-full animate-spin" />
            ) : (
              <RotateCcw className="w-5 h-5" />
            )}
          Reset
        </button>
      </div>
    </section>
  );
};