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
import { authClient } from "@/lib/authClient"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { getSession } from "@/services/service"
export const formSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be 6+ chars"),
});

export function SigninForm() {

    const signIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",

        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("signning user");
            try {
                if (!value) {
                    toast.dismiss(toastId)
                    toast.error("please provide correct information", { theme: "dark", autoClose: 1000 })
                    return
                }
                const {data,error} = await authClient.signIn.email(value)
                if (error) {
                    toast.dismiss(toastId)
                    toast.error(`user login failed ${error.message}`, { theme: "dark", autoClose: 1000 })
                    return
                }
                const existinguser = await getSession()
                if (existinguser.data.result.status === 'suspend') {
                    toast.dismiss(toastId)
                    toast.error("Your account has been suspended. Please contact support for assistance.")
                    await authClient.signOut();
                    return
                }
                localStorage.removeItem("foodhub-cart")
                toast.dismiss(toastId)
                toast.success('login successfully', { theme: "dark", autoClose: 1000 })
                router.push("/profile")
            } catch (error) {
                toast.dismiss(toastId)
                toast.error("Something went wrong, please try again.");
            }
        },
    })



    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Sign In to Your Account</CardTitle>
                <CardDescription>
                    Please sign in to your account to access your dashboard, manage your activities, and continue using our services securely
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
                    </FieldGroup>
                </form>
            </CardContent>
            <Button
                onClick={() => signIn()}
                variant="outline"
                type="button"
                className="w-full"
            >
                Continue with Google
            </Button>
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
