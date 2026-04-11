"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, Pen, Pencil, Search, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import PaginationPage from "@/components/modules/meals/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserRoleChage from "./userprofilechange";
import { AdminService } from "@/services/users/admin";
import { toast } from "react-toastify";
import { deleteUser } from "@/actions/user/admin";
import { Ipagination } from "@/types/pagination.type";
import { TUser } from "@/types/user.type";
import { useFilter } from "@/components/shared/Filter";
import { createUserColumns } from "./CreateUserColums";
import { FilterPanel } from "@/components/shared/FilterPanel";
import { TFilterField } from "@/types/filter.types";
import { ReusableTable } from "@/components/shared/ReuseableTable";

interface Props {
  users: TUser[];
  pagination: Ipagination;
}

export default function UsersTable({ users, pagination }: Props) {
  const { page, total, totalpage, limit } = pagination;
  const [tableData, setTableData] = useState(users);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<any>(null);
  const router = useRouter();
  const { updateFilters, reset,isPending } = useFilter();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    phone: "",
    image: "",
    isActive: false,
    emailVerified: false,
  });

  useEffect(() => {
    setTableData(users ?? []);
  }, [users]);

  const handleChange = (key: string, value: any) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    updateFilters(updated);
  };

  const handleDelete = async (id: string) => {
    const toastid = toast.loading("user deleting........");
    const res = await deleteUser(id);
    if (!res.data) {
      toast.dismiss(toastid);
      toast.error(res.message || "user delete failed");
      return;
    }
    toast.dismiss(toastid);
    toast.success(res.message || "user deleted successfully");
  };
  const roles = ["Admin", "Provider", "Customer"];
  const status = ["activate", "suspend"];

  const fields = [
    {
      type: "text",
      name: "name",
      label: "Name",
      value: form.name,
      onChange: (val: string) => handleChange("name", val),
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      value: form.email,
      onChange: (val: string) => handleChange("email", val),
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      value: form.phone,
      onChange: (val: string) => handleChange("phone", val),
    },
    {
      type: "select",
      name: "role",
      label: "Role",
      value: form.role,
      onChange: (val: string) => handleChange("role", val),
      options: [
        { label: "Admin", value: "ADMIN" },
        { label: "User", value: "USER" },
      ],
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      value: form.status,
      onChange: (val: string) => handleChange("status", val),
      options: [
        { label: "Active", value: "ACTIVE" },
        { label: "Inactive", value: "INACTIVE" },
        { label: "Blocked", value: "BLOCKED" },
        { label: "Deleted", value: "DELETED" },
      ],
    },
    {
      type: "select",
      name: "emailVerified",
      label: "Email Verified",
      value: form.emailVerified,
      onChange: (val: string) => handleChange("emailVerified", val),
      options: [
        { label: "No", value: "false" },
        { label: "Yes", value: "true" },
      ],
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
        setSelectedUserId(item.id);
        setViewMode(false);
        setOpen(true);
      },
      className: "text-blue-500",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: (item: any) => handleDelete(item.id),
      className: "text-red-500",
    },
  ];

  const columns = createUserColumns();

  return (
    <section className="px-1 sm:px-2 lg:px-3">
          <div className="mb-6 bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800">
     <FilterPanel
          fields={fields as TFilterField[]}
          onReset={() => {
            setForm({
              name: "",
              email: "",
              role: "",
              status: "",
              phone: "",
              image: "",
              isActive: false,
              emailVerified: false,
            });
            reset();
          }}
        />
      </div>
      <div className="">
        <ReusableTable columns={columns as any} data={tableData} actions={actions as any} />
      </div>

    </section>
  );
}
