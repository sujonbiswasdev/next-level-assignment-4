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
                title: "meals-get",
                url: "/provider-dashboard/meals-get",
            },
        ],
    },
];