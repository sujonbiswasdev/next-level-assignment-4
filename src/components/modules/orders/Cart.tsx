'use client'
import { manageCartStore } from "@/store/CartStore";
import { MessageSquareX, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartComponent() {
    const {removeFromCart, cart, clearCart, getSubtotal, getTotal ,increase,decrease} = manageCartStore()
    const router=useRouter()
    const subtotal=getSubtotal()
    const tax=subtotal*0.5
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 md:px-10">
            {/* Main Grid */}
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

                {/* Left Section */}
                <section className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        meals Cart
                    </h2>

                    {cart.map((item: any, index: number) => (
                        <div key={index}>
                            <CartItem
                                title={item.name}
                                image={item.image}
                                value={item.quantity}
                                increase={increase}
                                decrease={decrease}
                                removechat={removeFromCart}
                                quantity={item.id}
                                clearchat={clearCart}
                                price={item.price}
                            />
                        </div>
                    ))}
                    <div className="flex items-center text-sm text-gray-500 mt-4">
                        <span className="mr-2">🔒</span>
                        100% Secure • Money Back Guarantee
                    </div>
                </section>

                {/* Right Section */}
                <aside className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-6 border border-gray-100">
                    <h3 className="text-xl font-semibold mb-6 text-gray-800">
                        Order Summary
                    </h3>
                       <div className="flex justify-between font-semibold text-lg text-gray-800">
                        <span>subtotal</span>
                        <span>${getSubtotal()}</span>
                    </div>
                      <div className="flex justify-between font-semibold text-lg text-gray-800">
                        <span>Tax</span>
                        <span>${tax}</span>
                    </div>

                    <div className="border-t my-4" />

                    <div className="flex justify-between font-semibold text-lg text-gray-800">
                        <span>Total</span>
                        <span>${getTotal()}</span>
                    </div>

                    <button onClick={()=>router.push("/checkout")} className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 active:scale-95">
                        checkout
                    </button>
                </aside>
            </div>
        </main>
    );
}

function CartItem({
    title,
    image,
    value,
    clearchat,
    increase,
    decrease,
    removechat,
    quantity,
    price,
}: {
    title: string;
    image:string;
    clearchat:any;
    increase:any;
    decrease:any;
    removechat:any;
    quantity:number,
    value:number;
    price: number;
}) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center gap-6">

                {/* Image */}
                <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                        src={image}
                        alt={"product"}
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-gray-800">
                        {title}
                    </h3>
                   
                    {/* Quantity */}
                    <div className="flex items-center space-x-3">
                          <button className="bg-gray-100 shadow-sm px-2 py-0.1 rounded-sm" onClick={() => decrease(quantity)}>-</button>
                          
                       <p>{value}</p>
                        <button onClick={()=>increase(quantity)} className="bg-gray-100 shadow-sm px-2 py-0.1 rounded-sm" >
                            +
                        </button>
                        <button className="bg-gray-100 shadow-sm px-2 py-0.1 rounded-sm"  onClick={()=>removechat(quantity)}>  <Trash className="w-[15px] text-red-600" /></button>
                        <button className="bg-gray-100 shadow-sm px-2 flex gap-x-1.5 py-0.1 rounded-sm"  onClick={()=>clearchat()}>  <MessageSquareX className="w-[15px] text-red-600" />All</button>
                    </div>
                </div>

                {/* Price */}
                <div className="text-lg font-semibold text-gray-800">
                    ${price}.00
                </div>
            </div>
        </div>
    );
}