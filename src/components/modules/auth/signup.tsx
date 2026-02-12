"use client"

import * as React from "react"
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
import { authClient } from "@/lib/authClient"
import { useRouter } from "next/navigation"
import { getSession } from "@/services/service"
import { ProviderProfile } from "../providerprofile/provider"
export const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be 6+ chars"),
    image: z.string(),
    phone: z.string(),
    role: z.enum(['Customer', "Provider"])
});

export function SignupForm() {
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            image: "",
            phone: "",
            role: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating user");
        
            try {
                if(!value){
                    toast.error("please provide correct information")
                 }
               const { data, error } = await authClient.signUp.email(value);
                if (error) {
                    toast.error(error.message);
                    return;
                }

                await authClient.signIn.email({
                    email: value.email,
                    password: value.password,
                });

                await authClient.getSession();

                if (value.role === "Provider") {
                    toast.dismiss(toastId)
                    router.push("/provider");
                    router.refresh();
                } else {
                    toast.success("user created successfully")
                    toast.dismiss(toastId)
                    router.push("/profile");
                }

            } catch (error) {
                toast.error("Something went wrong, please try again.", { id: toastId });
            }
        },
    })

    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Bug Report</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
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
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="please enter your name"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="email"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="please enter your email"
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
                            name="password"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="please enter your password"
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
                            name="role"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                                        <select className="border-1 px-2 py-1.5 rounded-md shadow-sm"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                        >
                                            <option value="">Select a role</option>
                                            <option value="Customer">Customer</option>
                                            <option value="Provider">Provider</option>
                                        </select>

                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
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
                            name="phone"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="please enter your phone number"
                                            autoComplete="off"
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
                    <Button type="submit" form="bug-report-form">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}