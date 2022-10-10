import { AdminLayout } from "../layouts";
import { HomeAdmin, UsersAdmin, CategoriasAdmin, ProductAdmin } from "../pages/Admin";

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
    {
        path: "/admin/products",
        layout: AdminLayout,
        component: ProductAdmin,
        exact: true
    }
];

export default routesAdmin;