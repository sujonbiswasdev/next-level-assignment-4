"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const allowedDomains = ["res.cloudinary.com", "images.pexels.com"];

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .string()
    .min(1, "Image URL is required")
    .url("Invalid URL format")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return allowedDomains.includes(parsed.hostname);
      } catch {
        return false;
      }
    }, {
      message: "Only Cloudinary and Pexels images are allowed",
    }),
});

export function CreateCategoryForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      image: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating category...", {
        theme: "colored",
        position: "bottom-right",
      });

      try {
        // Using native fetch
        const response = await fetch("http://localhost:5000/api/admin/category", {
          method: "POST",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();
        console.log(data,'kdkdd')

        toast.dismiss(toastId);

        if (!data?.success) {
          toast.error(data?.error.CustomeMessage || "Category creation failed", {
            theme: "colored",
            position: "bottom-right",
          });
          return;
        }

        toast.success(data?.message || "Category created successfully!", {
          theme: "colored",
          position: "bottom-right",
        });

        form.reset();
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong! Please try again.", {
          theme: "colored",
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-md mx-auto p-4 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl text-indigo-600">Create Category</CardTitle>
        <CardDescription className="text-gray-500">
          Add a new category with name and image.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter category name"
                      className="border-indigo-400 focus:ring-indigo-400 focus:border-indigo-500"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter image URL"
                      className="border-indigo-400 focus:ring-indigo-400 focus:border-indigo-500"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="text-red-600 border-red-400 hover:bg-red-50"
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="category-form"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Add Category
        </Button>
      </CardFooter>
    </Card>
  );
}