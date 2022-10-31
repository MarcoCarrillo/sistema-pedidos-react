import { ClientLayout, BasicLayout } from "../layouts";
import { SelectTable } from "../pages/Client";
import { Error404 } from "../pages";

const routesClient = [
    {
        path: "/",
        layout: BasicLayout,
        component: SelectTable,
        exact: true
    }
];

export default routesClient;