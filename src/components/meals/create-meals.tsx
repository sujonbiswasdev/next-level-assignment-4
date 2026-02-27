"use client"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea";
import { getuserProvider } from "@/services/service";
import { createmeals } from "@/actions/blog.meals";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Category } from "@/types/category"
import { getCategory } from "@/actions/categories/category"
import { cuisines, dietaryPreferences } from "@/types/meals/mealstype"
const allowedDomains = [
  "res.cloudinary.com",
  "images.pexels.com",
];
export const formSchema = z.object({
  meals_name: z.string().min(1, "meals name is required"),
  description: z.string().min(5, 'description atleast 5 character'),
  image: z
    .string()
    .min(1, "Image is required")
    .url("Invalid image URL")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return allowedDomains.includes(parsed.hostname);
      } catch {
        return false;
      }
    }, {
      message: "Only Cloudinary and Pexels images allowed",
    }),
  price: z.int().min(1, "price is required").max(1000, 'max price only 1000'),
  isAvailable: z.boolean(),
  dietaryPreference: z.enum(dietaryPreferences),
  providerId: z.string(),
  category_name: z.string().min(1, 'category name is required'),
  cuisine: z.enum(cuisines)
})

export function MealsForm() {
  const [category, setcategory] = useState<Category[] | undefined>()
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      meals_name: "",
      description: "",
      image: "",
      price: 0,
      isAvailable: true,
      dietaryPreference: "HALAL",
      providerId: "",
      category_name: "",
      cuisine: "BANGLEDESHI",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastid = toast.loading("meals creating.........")
      const mealsdData = {
        meals_name: value.meals_name,
        description: value.description,
        image: value.image,
        price: value.price,
        isAvailable: value.isAvailable,
        dietaryPreference: value.dietaryPreference as "HALAL" | "VEGAN" | "VEGETARIAN" | "ANY",
        category_name: value.category_name,
        cuisine: value.cuisine,
      }
      try {
        const res = await createmeals(mealsdData)
        if (res.error) {
          toast.dismiss(toastid)
          toast.error(res.error)
          return;
        }
        toast.dismiss(toastid)
        toast.success("meals created successfully")
        form.reset()

      } catch (error) {
        toast.dismiss(toastid)
        toast.error("Something went wrong, please try again.");
      }
    },
  })

  useEffect(() => {
    const fetchCategory = async () => {
      const categorydata = await getCategory()
      console.log(categorydata, 'categyrodf')
      setcategory(categorydata)
    }
    fetchCategory()
  }, [])


  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Meal</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="bug-report-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="meals_name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>meals_name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your meals_name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Image</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your image"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}

                  </Field>
                )
              }}
            />

            <form.Field
              name="price"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>price</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={isInvalid}
                      placeholder="please enter your price"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="cuisine"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>cuisine</FieldLabel>
                    <select
                      className="border-amber-50 shadow-sm px-2 py-2.5"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a cuisines</option>
                      {cuisines?.map((item: any, index: number) => <option value={item} key={index}>{item}</option>)}
                    </select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />


            <form.Field
              name="category_name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>

                    <select
                      className="border-amber-50 shadow-sm px-2 py-2.5"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a category</option>
                      {category?.map((item: any, index: number) => <option key={index}>{item.name}</option>)}
                    </select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="dietaryPreference"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>dietaryPreference</FieldLabel>
                    <select
                      className="border-amber-50 overflow-scroll shadow-sm px-2 py-2.5"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    >
                      <option value="">Select a dietaryPreference</option>
                      {dietaryPreferences?.map((item: any, index: number) => <option value={item} key={index}>{item}</option>)}
                    </select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}

            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your description"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="isAvailable"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="flex gap-3 items-center ">

                    <div className="flex items-center gap-2">
                      <FieldLabel htmlFor={field.name}>isAvailable</FieldLabel>
                      <input
                        type="checkbox"
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.checked)
                        }
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="bug-report-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}