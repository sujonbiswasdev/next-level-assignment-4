"use client";

import { getIconComponent } from "@/lib/IconMapper";
import React from "react";

export type StatCardProps = {
  title: string;
  value: string | number;
  percentage?: string;
  trend?: "up" | "down";
  iconName?: string;
  bgGradient?: string;
};

export const StatsCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  trend = "up",
  iconName,
  // Custom project-matching palette: cyan/teal/emerald
  bgGradient = "from-cyan-500 via-teal-400 to-emerald-400",
}) => {
  const trendColor =
    trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-rose-500 dark:text-rose-400";

  // Dynamic icon for the card
  const IconComponent = iconName ? getIconComponent(iconName) : null;
  const TrendIcon =
    trend === "up"
      ? getIconComponent("ArrowUpRight")
      : getIconComponent("ArrowDownRight");

  return (
    <div
      className={`
        group relative flex flex-col min-h-[170px]
        h-full w-full max-w-full
        rounded-3xl border border-teal-100 dark:border-cyan-900
        bg-gradient-to-br ${bgGradient}
        shadow-xl
        transition-all duration-300
        hover:shadow-emerald-200/40 hover:-translate-y-1
        overflow-hidden
        p-5 md:p-7
        sm:min-w-[240px]
      `}
      style={{
        // Subtle diagonal accent overlaying bg color
        backgroundImage:
          "linear-gradient(120deg,rgba(34,211,238,0.28) 0%,rgba(16,185,129,0.13) 55%,rgba(52,211,153,0.21) 100%)",
      }}
    >
      {/* Animated border ring on hover */}
      <span className="absolute inset-0 pointer-events-none z-0 rounded-3xl ring-2 ring-cyan-200/30 ring-offset-2 opacity-0 group-hover:opacity-80 transition duration-500" aria-hidden="true" />
      {/* Subtle glow effect accent */}
      <div className="absolute -inset-2 z-0 pointer-events-none opacity-0 group-hover:opacity-40 blur-xl bg-gradient-to-br from-cyan-400/30 via-teal-200/20 to-emerald-300/25 transition-all duration-700" />
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Title & Icon */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-cyan-900 dark:text-cyan-100 tracking-wider drop-shadow-[0_1px_3px_rgba(16,185,129,0.10)]">
            {title}
          </h3>
          {IconComponent && (
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-white/80 via-cyan-50 to-emerald-100 w-12 h-12 border-2 border-white dark:border-cyan-900 shadow-lg shadow-cyan-300/10 -mr-1">
              {React.createElement(IconComponent, {
                className:
                  "w-7 h-7 text-teal-500 drop-shadow-sm dark:text-emerald-300",
              })}
            </span>
          )}
        </div>

        {/* Value + trend */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-emerald-950 dark:text-white drop-shadow-lg">
            {value}
          </span>
          {percentage && (
            <span
              className={`flex items-center gap-1 text-base font-semibold ${trendColor} transition-colors`}
            >
              {TrendIcon && React.createElement(TrendIcon, { className: "w-5 h-5" })}
              <span>{percentage}%</span>
            </span>
          )}
        </div>

        {/* Unique progress effect: glassy with subtle bubbles */}
        {title !== "Users" && (
          <div className="relative w-full h-4 sm:h-5 mt-2 rounded-full bg-gradient-to-r from-cyan-100 via-emerald-50 to-teal-100 shadow-inner overflow-hidden border border-emerald-100 dark:border-cyan-700/40">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-md"
              style={{
                width: percentage
                  ? `${Math.min(100, Math.max(0, parseFloat(percentage)))}%`
                  : "50%",
                minWidth: "0.5rem",
                maxWidth: "100%",
                transition: "width 0.6s cubic-bezier(0.49,1.36,0.37,1)",
                opacity: 0.94,
                filter: "brightness(0.98) saturate(1.1)"
              }}
            />
            {/* Decorative "bubbles" for unique lively look */}
            <span className="absolute left-3 top-1 w-2 h-2 rounded-full bg-white/60 blur-[2px] animate-pulse" />
            <span className="absolute left-10 top-2 w-1.5 h-1.5 rounded-full bg-cyan-200/60 blur-[1.5px] animate-pulse" />
            <span className="absolute left-20 top-1.5 w-2 h-2 rounded-full bg-emerald-200/50 blur-[2px]" />
            {/* Percentage badge */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <span className="text-xs font-bold text-emerald-50 bg-gradient-to-tr from-emerald-700 via-cyan-700 to-teal-700 px-2 py-[3px] rounded-full shadow-md border border-cyan-200/30">
                {percentage || "--"}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};