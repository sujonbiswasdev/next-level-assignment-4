import z from "zod";


const allowedDomains= [
  "res.cloudinary.com",
  "images.pexels.com",
];

export const passwordSchema =z.object({
  password: z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must contain uppercase, lowercase, number, and special character"
  )
})

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be 8+ chars").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must contain uppercase, lowercase, number, and special character"
  ),
  image: z.any(),
  phone: z.string().min(11, "Minimum 11 digits").max(14),
  role: z.enum(["Customer", "Provider"]),
  restaurantName: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.role === "Provider") {
    if (!data.restaurantName) {
      ctx.addIssue({ path: ["restaurantName"], message: "Required for Providers", code: "custom" });
    }
    if (!data.address) {
      ctx.addIssue({ path: ["address"], message: "Address is required", code: "custom" });
    }
  }
});
export const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ chars").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must contain uppercase, lowercase, number, and special character"
  ),
});

// update user by admin
export const UpdateuserschemabyAdmin = z
  .object({
    role: z.string().optional(),
    status: z.string().optional(),
    email: z.string().optional(),
  })
  .strict();

export const updateUserSchema = z.object({
  name: z.string().optional(),
  image: z
    .string()
    .url("Invalid image URL")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return allowedDomains.includes(parsed.hostname);
        } catch {
          return false;
        }
      },
      {
        message: "Only Cloudinary and Pexels images allowed",
      },
    )
    .optional(),
  bgimage: z
    .string()
    .url("Invalid image URL")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return allowedDomains.includes(parsed.hostname);
        } catch {
          return false;
        }
      },
      {
        message: "Only Cloudinary and Pexels images allowed",
      },
    )
    .optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must contain uppercase, lowercase, number, and special character"
  ).optional(),
  phone: z.string().min(10).max(15).optional(),
  isActive: z.boolean().optional(),
});

// updateusr commont data
export const UpdateUserCommonData = z
    .object({
      role: z.string().optional(),
      status: z.string().optional(),
      email: z.string().optional(),
    })
    .strict();
