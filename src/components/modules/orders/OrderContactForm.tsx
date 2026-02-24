import { CreateOrder } from "@/actions/order.action"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { manageCartStore } from "@/store/CartStore"
import { ICreateOrderPayload } from "@/types/order/order"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

export function OrderForm({
    setactiveButton,
}: {
    setactiveButton: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [orderdata, setorderdata] = useState<ICreateOrderPayload | {}>({})
    const { removeFromCart, cart, clearCart, getSubtotal, getTotal, increase, decrease } = manageCartStore()

    const items = cart.map(item => ({
        mealId: item.mealid,
        price: item.price,
        quantity: item.quantity
    }))

    console.log(items,'items')
    const formData = {
        ...orderdata,
        items
    }
    console.log(formData,'formdata')
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const toastid = toast.loading("order creating.....")
        const response = await CreateOrder(formData as ICreateOrderPayload)
        console.log(response,'responsedata')
        if (response.error) {
            toast.dismiss(toastid)
           toast.error(`order creation failed ${response.error}`)
           return
        }
        toast.dismiss(toastid)
        toast.success(response.data.result.message || 'order created successfully')
        setactiveButton(true)
    }
    return (
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="form-name">First Name</FieldLabel>
                    <Input
                        onChange={(e) => setorderdata({ ...orderdata, first_name: e.target.value })}
                        id="form-name"
                        type="text"
                        placeholder="Evil Rabbit"
                        required
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="form-name">Last Name</FieldLabel>
                    <Input
                        onChange={(e) => setorderdata({ ...orderdata, last_name: e.target.value })}
                        id="last_name"
                        type="text"
                        placeholder="Evil Rabbit"
                        required
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                    <Input id="form-phone" onChange={(e) => setorderdata({ ...orderdata, phone: e.target.value })} type="number"  placeholder="01*********" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="form-address">Address</FieldLabel>
                    <Input id="form-address" onChange={(e) => setorderdata({ ...orderdata, address: e.target.value })} type="text" placeholder="123 Main St" />
                </Field>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </Field>
            </FieldGroup>
        </form>
    )
}
