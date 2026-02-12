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
import { authClient } from "@/lib/authClient"
import { useRouter } from "next/navigation"
import { getSession } from "@/services/service"
import { ProviderProfile } from "../providerprofile/provider"
export const formSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be 6+ chars"),
});

export function SigninForm() {
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
                if(!value){
                    toast.error("please provide correct information")
                 }
               const { data, error } = await authClient.signIn.email(value);
                if (error) {
                    toast.error(error.message);
                    return;
                }
                toast.dismiss(toastId)
                toast.success('login successfully')
                router.push("/dashboard")
            } catch (error) {
                toast.error("Something went wrong, please try again.", { id: toastId });
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
