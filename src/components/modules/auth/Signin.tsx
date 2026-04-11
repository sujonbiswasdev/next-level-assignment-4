"use client";
import { useForm } from "@tanstack/react-form";
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
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoginSchema } from "@/validations/auth.validation";
import { userLogin } from "@/actions/auth.actions";
import { createAuthClient } from "better-auth/react";
export function SigninForm() {
  const authClient = createAuthClient();
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("user signning.......");
      try {
        const loginuser = await userLogin(value);
        console.log(loginuser,'loinuser')
        if (!loginuser || !loginuser.success) {
          toast.dismiss(toastId);
          toast.error(loginuser.message || "login failed", { theme: "dark" });
          return;
        }
        localStorage.removeItem("foodhub-cart");
        toast.dismiss(toastId);
        toast.success(loginuser.message || 'user login successfully', { theme: "dark" });
        router.push("/profile");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong, please try again.");
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="mx-auto fonb">Welcome Back</CardTitle>
        <CardDescription className="mx-auto">
          Please sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
            validators={{ onChange: LoginSchema.shape.email }}
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
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
                );
              }}
            />
            <form.Field
              name="password"
               validators={{ onChange: LoginSchema.shape.password }}
              children={(field) => {
                
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
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
                );
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
      <CardFooter className="mx-auto">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="login-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
