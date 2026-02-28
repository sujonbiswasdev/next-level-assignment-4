import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "Categories Management",
        icon: "string",
        isActive: true,
        items: [
            {
                title: "create-category",
                url: "/admin-dashboard/create-category",
            },
             {
                title: "categories",
                url: "/admin-dashboard/categories",
            },
        ],
    },

     {
        title: "users Management",
        icon: "string",
        isActive: true,
        items: [
            {
                title: "users",
                url: "/admin/users",
            },
        ],
    },

    {
        title: "meals Management",
        icon: "string",
        isActive: true,
        items: [
            {
                title: "meals",
                url: "/admin/meals",
            },
        ],
    },
    {
        title: "reviews Management",
        icon: "string",
        isActive: true,
        items: [
            {
                title: "revies",
                url: "/admin/review",
            },
        ],
    },
];