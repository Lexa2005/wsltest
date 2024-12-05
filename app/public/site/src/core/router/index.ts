import {createBrowserRouter} from "react-router-dom";
import {indexPage} from "../../layers/presentation/pages/IndexPage";
import {RootRouter} from "./RootRouter";

export const publicRoutes = createBrowserRouter([
    {
        path: '/',
        Component:() => RootRouter(),
        children: [
            {
                index: true,
                Component: () => indexPage()
            }
        ]
        // exact: true
    },
])
