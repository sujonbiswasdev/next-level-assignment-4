export type UserRole = "Admin" | "Provider" ;
export const getDefaultDashboardRoute = (role : UserRole) => {
    if(role === "Admin") {
        return "/admin/dashboard";
    }
    if(role === "Provider") {
        return "/provider/dashboard";
    }
    return "/";
}