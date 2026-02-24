import { Route } from "@/types";

export const ProviderRoutes: Route[] = [
    {
        title: "meals management",
        icon: "string",
        isActive: true,
        items: [
            {
                title: "Create meals",
                url: "/provider-dashboard/create-meals",
            },
            {
                title: "menu",
                url: "/provider-dashboard/menu",
            },
        ],
    },

    {
        title: "order management",
        icon: "string",
        isActive: true,
        items: [
            {
                title: "orders",
                url: "/provider-dashboard/orders",
            },
        ],
    },
];