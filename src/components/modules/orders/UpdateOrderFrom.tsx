"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { updateorderstatus } from "@/actions/order.action";
import { TResponseOrderData } from "@/types/order/order.type";

const ORDER_STATUSES = [
  "PLACED",
  "PREPARING",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

export function UpdateOrderStatusForm({
  id,
  initialStatus,
  role
}: {
  id: string;
  initialStatus: string;
  role:string
}) {
  const form = useForm({
    defaultValues: {
      status: initialStatus || "",
    },
    onSubmit: async ({ value }) => {

      const toastId = toast.loading("Updating order status... Please wait.");
      try {
        const res = await updateorderstatus(id, { status: value.status });
        toast.dismiss(toastId);
        if (!res.success) {
          toast.error(res.message || "Failed to update order status. Please try again.");
          return;
        }
        toast.success(res.message || "Order status updated successfully!");
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Update Order Status</CardTitle>
        <CardDescription className="text-center">Change the status for this order</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="update-status-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

            {role==="Admin" && <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Status</option>
                    {ORDER_STATUSES.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>}

            {role==="Provider" && <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Status</option>
                    {ORDER_STATUSES.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>}

            {
              role==="Customer" && <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Status</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            }
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          form="update-status-form"
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}