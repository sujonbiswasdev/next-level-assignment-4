export function Step({
  number,
  title,
  isActive,
}: {
  number: string;
  title: string;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center space-x-3">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
          ${isActive
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-600"
          }`}
      >
        {number}
      </div>

      <span
        className={`${isActive
          ? "text-black font-semibold"
          : "text-gray-500"
        }`}
      >
        {title}
      </span>
    </div>
  )
}

export function Divider({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`flex-1 h-[2px] mx-4 hidden sm:block
        ${isActive ? "bg-black" : "bg-gray-300"}
      `}
    />
  )
}