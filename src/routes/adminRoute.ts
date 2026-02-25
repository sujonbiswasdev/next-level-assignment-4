import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "Categories Management",
        icon: "string",
        isActive: true,
        items: [
            {
                title: "categories",
                url: "/admin-dashboard/categories",
            },
        ],
    },
];