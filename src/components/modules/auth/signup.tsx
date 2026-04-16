"use client";
import { useStore } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { registerUser } from "@/services/auth.service";
import { createUserSchema } from "@/validations/auth.validation";
import { useState } from "react";
import { UserPlus, ArrowRight, RefreshCw, Home, LogIn } from "lucide-react";
import { FormInput } from "@/components/shared/FormInput";

export function SignupForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
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
      description: "",
    },
    validators: {
      onSubmit: createUserSchema as any,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");
      try {
        const data = await registerUser(value as any);
        if (!data || !data.success || data.error) {
          toast.dismiss(toastId);
          toast.error(data.message || "User creation failed.");
          return;
        }
        toast.dismiss(toastId);
        toast.success(data.message || "Signup successful!");
        localStorage.removeItem("foodhub-cart");
        router.push(`/verify-email?email=${value.email}`);
      } catch (error: any) {
        toast.dismiss(toastId);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
  const role = useStore(form.store, (state) => state.values.role);

  // -- Navigation handlers
  const handleGoHome = () => router.push("/");
  const handleGoLogin = () => router.push("/login");

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-gradient-to-br from-gray-100 via-white to-purple-50 p-3">
      <Card className="w-full max-w-lg rounded-2xl shadow-[0_2px_32px_rgba(120,70,255,0.09)] border-2 border-purple-100/80 bg-white/95 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center pb-2 gap-1">
          <span className="rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 p-2 mb-1 shadow-md">
            <UserPlus className="text-white w-7 h-7" />
          </span>
          <CardTitle className="font-extrabold tracking-tight text-2xl text-zinc-900 text-center">
            FoodHub
          </CardTitle>
          <p className="text-xs text-zinc-500 font-semibold mt-1 text-center">
            Create your account to discover, order, or provide amazing food experiences.
          </p>
        </CardHeader>
        <CardContent>
          <form
            id="sign-up-user"
            autoComplete="off"
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                validators={{ onChange: createUserSchema.shape.name }}
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-2">
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your full name"
                        className="focus:border-purple-500 transition"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                validators={{ onChange: createUserSchema.shape.email }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-2">
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="you@email.com"
                        autoComplete="off"
                        className="focus:border-purple-500 transition"
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
                validators={{ onChange: createUserSchema.shape.password }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-2">
                      <FormInput
                      field={field}
                      label="Password"
                      isPassword
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="please enter your password"
                      name={field.name}
                      value={field.state.value}
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
                name="role"
                validators={{ onChange: createUserSchema.shape.role }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-2">
                      <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                      <select
                        className="border border-zinc-300 px-3 py-2 rounded-lg shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition"
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
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="mb-2">
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Your phone number"
                        className="focus:border-purple-500 transition"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {role === "Provider" && (
                <>
                  <form.Field
                    name="restaurantName"
                    validators={{
                      onChange: createUserSchema.shape.restaurantName as any,
                    }}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid} className="mb-2">
                          <FieldLabel htmlFor={field.name}>
                            Restaurant Name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Restaurant name"
                            className="focus:border-purple-500 transition"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="address"
                    validators={{
                      onChange: createUserSchema.shape.address as any,
                    }}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid} className="mb-2">
                          <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Full address"
                            className="focus:border-purple-500 transition"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="description"
                    validators={{
                      onChange: createUserSchema.shape.description as any,
                    }}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid} className="mb-2">
                          <FieldLabel htmlFor={field.name}>
                            Restaurant Description
                          </FieldLabel>
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Describe your restaurant"
                            className="focus:border-purple-500 transition"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </>
              )}
            </FieldGroup>

            <div className="flex justify-between gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleGoHome}
                className="flex items-center gap-2 font-medium"
              >
                <Home className="w-4 h-4 mr-1" /> Home
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={handleGoLogin}
                className="flex items-center gap-1 text-indigo-500 font-bold"
              >
                <LogIn className="w-4 h-4" /> Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 pt-2 border-t border-zinc-100 mt-3">
          <Field orientation="horizontal" className="gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="w-1/2 hover:border-purple-500"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button
              type="submit"
              form="sign-up-user"
              className="w-1/2 bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-bold hover:scale-[1.03] transition"
            >
              Sign Up <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Field>
          <span className="text-xs text-zinc-500 font-medium pt-2">
            By signing up, you agree to our{" "}
            <a href="#" className="font-semibold text-purple-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-purple-500 hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}