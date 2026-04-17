import { createUserSchema, UpdateUserCommonData, updateUserSchema, UpdateuserschemabyAdmin } from "@/validations/auth.validation"
import z from "zod"
import { IProviderInfo } from "./provider.type"
export type TUpdateuserbyAdmin = z.infer<typeof UpdateuserschemabyAdmin>

export type TUserRoleType = "Provider" | "Admin" | "Customer"
export type TUserStatusType = "activate" | "suspend"

export type UserCreateInput = z.infer<typeof createUserSchema>

// user type
export type TUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: any| string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  status: string;
  phone: string | null;
  isActive: boolean;
  bgimage: string | null;
  provider?: IProviderInfo;
};


export type TResponseUserData<T = unknown> = TUser & T;

export type TUpdateUserInput = z.infer<typeof updateUserSchema>;
