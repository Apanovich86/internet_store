import Admin from "./pages/BoardAdmin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProductPage from "./pages/ProductPage";
import {FC} from "react";

interface IAuthRouter {
    path: string,
    Component: FC
}

export const authRoutes = [
    {
        path: '/admin',
        Component: Admin
    },
    {
        path: '/basket',
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: '/shop',
        Component: Shop
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/registration',
        Component: Register
    },
    {
        path: '/product'+'/:id',
        Component: ProductPage
    }
]