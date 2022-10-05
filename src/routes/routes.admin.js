import { AdminLayout } from "../layouts";
import { HomeAdmin, UsersAdmin, CategoriasAdmin } from "../pages/Admin";

const routesAdmin = [
    { 
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true
    },
    { 
        path: "/admin/users",
        layout: AdminLayout,
        component: UsersAdmin,
        exact: true
    },
    { 
        path: "/admin/categories",
        layout: AdminLayout,
        component: CategoriasAdmin,
        exact: true
    },
];

export default routesAdmin;