"use client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
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
export const formSchema = z.object({
    name: z.string().min(1, "name is required"),
});
 
export function CreateCategoryForm() {
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            name: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            toast.loading("category creating.........")
            try {
                const response = await fetch('http://localhost:5000/api/admin/category', {
                    method: "POST",
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(value)
                })
                const body = await response.json()
                if (!response.ok) {
                    toast.error(body.message)
                    return
                }

                toast.success("category create successfully")
            } catch (error) {
                toast.error("Something went wrong, please try again.");
            }
        },
    })

    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create category</CardTitle>
                <CardDescription>
                    Fresh and savory seafood dishes
                </CardDescription>
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
                        onClick={() => {
                            toast.promise<{ name: string }>(
                                () =>
                                    new Promise((resolve) =>
                                        setTimeout(() => resolve({ name: "Event" }), 2000)
                                    ),
                                {
                                    loading: "cateogry creating.....",
                                }
                            )
                        }}
                    >
                        Promise
                    </Button>
                    {/* <Button >
            Submit
          </Button> */}
                </Field>
            </CardFooter>
        </Card>
    )
}