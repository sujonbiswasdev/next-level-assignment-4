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
import { toast } from "react-toastify"
import { createCategory } from "@/actions/categories/category"
const allowedDomains = [
    "res.cloudinary.com",
    "images.pexels.com",
];
export const formSchema = z.object({
    name: z.string().min(1, "name is required"),
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
});

export function CreateCategoryForm() {
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            name: "",
            image:"",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastid = toast.loading("category creating.........", { autoClose: 1000, theme: "colored", position: "bottom-right" })
            try {
               const response=await createCategory(value)
                if (!response?.success) {
                    toast.dismiss(toastid)
                    toast.error(response?.message || 'category create failed', { autoClose: 1000, theme: "dark", position: "bottom-right" })
                    return
                }
                toast.dismiss(toastid)
                toast.success(response.message||"category create successfully", { autoClose: 2000, theme: "colored", position: "bottom-right" })
                form.reset()
            } catch (error) {
                toast.dismiss(toastid)
                toast.error("Something went wrong, please try again.", { autoClose: 2000, theme: "colored", position: "bottom-right" });
            }
        },
    })

    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create categories</CardTitle>
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
                            name="name"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}> Name</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="please enter your category name"
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
                                        <FieldLabel htmlFor={field.name}> image</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="please enter your image url"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
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

                    <Button
                        type="submit" form="bug-report-form"
                        variant="outline"
                    >
                        Add
                    </Button>
                    {/* <Button >
            Submit
          </Button> */}
                </Field>
            </CardFooter>
        </Card>
    )
}