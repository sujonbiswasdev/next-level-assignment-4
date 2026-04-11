"use client"
import { useStore } from "@tanstack/react-form";
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
import { toast } from "react-toastify";
import { authClient } from "@/lib/authClient";
import { registerUser } from "@/services/auth.service";
import { createUserSchema } from "@/validations/auth.validation";
import { useState } from "react";


export function SignupForm() {
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            image: null as File | null,
            phone: "",
            role: "",
            restaurantName: "",
            address: "",
            description: ""
        },
        validators: {
            onSubmit: createUserSchema as any,
        },
        onSubmit: async ({ value }) => {
            console.log(value,'value')
            const toastId = toast.loading("user creating.........");
            try {
                const data  = await registerUser(value);
                if (!data || !data.success ||data.error) {
                    toast.dismiss(toastId)
                    toast.error(data.message || 'user create failed')
                    return
                }
                toast.dismiss(toastId)
                toast.success(data.message ||'user signup successfully');
                localStorage.removeItem("foodhub-cart")
                router.push('/login')
            } catch (error: any) {
                toast.dismiss(toastId)
                toast.error("Something went wrong. Please try again.", error.message);
            }
        },
    })
    const role = useStore(form.store, (state) => state.values.role);
    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>create a new user</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    id="sign-up-user"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.Field
                         validators={{ onChange: createUserSchema.shape.name }}
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
                               validators={{ onChange: createUserSchema.shape.email }}
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
                               validators={{ onChange: createUserSchema.shape.password }}
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
                               validators={{ onChange: createUserSchema.shape.role }}
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
              children={(field) => (
                <Field>
                  <FieldLabel>profile Image *</FieldLabel>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 1 * 1024 * 1024) {
                          toast.error("Image size must be less than 1MB!");
                          e.target.value = "";
                          field.handleChange(null);
                          setPreview(null);
                          return;
                        }
                        field.handleChange(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />

                  {preview && (
                    <img
                      src={preview}
                      className="h-32 rounded-md object-cover mt-2"
                    />
                  )}
                </Field>
              )}
            />

                        <form.Field
                            name="phone"
                               validators={{ onChange: createUserSchema.shape.phone }}
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

                        {role === "Provider" && (
                            <>
                                <form.Field
                                    name="restaurantName"
                                       validators={{ onChange: createUserSchema.shape.restaurantName as any}}
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>restaurantName</FieldLabel>
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
                                    name="address"
                                       validators={{ onChange: createUserSchema.shape.address as any }}
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>address</FieldLabel>
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
                                    name="description"
                                       validators={{ onChange: createUserSchema.shape.description as any}}
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
                                                    placeholder="please enter your name"
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                            </>

                        )}

                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="sign-up-user">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}