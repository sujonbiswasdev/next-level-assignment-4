

import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import { NavSection } from "@/types/dashboard.type";



export const getCommonNavItems = (role : UserRole) : NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            items : [
                {
                    title : "Home",
                    href : "/",
                    icon : "Home"
                },
                {
                    title : "Dashboard",
                    href : defaultDashboard,
                    icon : "LayoutDashboard"

                }
            ]
        }
    ]
}


export const providerNavItem: NavSection[] = [
    {
        title: "Meals Management",
        items: [
            {
                title: "Create meals",
                href: "/provider/dashboard/create-meals",
                icon: "PlusSquare"
            },
            {
                title: "my-menu",
                href: "/provider/dashboard/my-menu",
                icon: "List"
            }
        ]
    },
    {
        title: "Order Management",
        items: [
            {
                title: "orders",
                href: "/provider/dashboard/orders",
                icon: "ClipboardList"
            }
        ]
    },
    {
        title: "settings",
        items: [
            {
                title: "setting",
                href: "/provider/dashboard/setting",
                icon: "Settings"
           
            }
        ]
    },
];



export const adminNavItems: NavSection[] = [
    {
        title: "Categories Management",
        items: [
            {
                title: "create-category",
                href: "/admin/dashboard/create-category",
                icon: "Calendar"
            },
            {
                title: "categories",
                href: "/admin/dashboard/categories",
                icon: "Folder"
            },
        ]
    },
    {
        title: "users Management",
        items: [
            {
                title: "users",
                href: "/admin/users",
                icon: "UserCog"
            },
        ]
    },
    {
        title: "meals Management",
        items: [
            {
                title: "meals",
                href: "/admin/meals",
                icon: "Utensils"
            },
        ]
    },
    {
        title: "reviews Management",
        items: [
            {
                title: "reviews",
                href: "/admin/reviews",
                icon: "Star"
            },
        ]
    },
    {
        title: "settings",
        items: [
            {
                title: "setting",
                href: "/provider/dashboard/setting",
                icon: "Settings"
           
            }
        ]
    },
]


export const getNavItemsByRole = (role : UserRole) : NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "Admin":
            return [...commonNavItems, ...adminNavItems];

        case "Provider":
            return [...commonNavItems, ...providerNavItem];
    }


}