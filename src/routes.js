import Cookies from "js-cookie";
import { store } from "./store/index";
import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import EditProductPage from "./components/pages/EditProductPage.vue"
import NewProductPage from "./components/pages/NewProductPage.vue";
import ProductListAllPage from "./components/pages/ProductListAllPage.vue"
import CartPage from "./components/pages/CartPage.vue"
import OrderPage from "./components/pages/OrderPage.vue"


const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");

    if (jwtCookie) {
        if (new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationDate,
            });
            store.dispatch("auth/getUser", userId);
            return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        }
    } else {
        return false;
    }
};

export const routes = [
    {
        path: "/",
        name: "homePage",
        component: HomePage,
        beforeEnter: () => {
            checkAuth();
        }
    },
    { 
        path: "/signup", 
        name: "signup", 
        component: SignupPage,
    },
    { 
        path: "/login", 
        name: "login", 
        component: LoginPage,
    },
    {
        path: "/product-list-all", 
        name: "productListAllPage", 
        component: ProductListAllPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    },
    {
        path: "/new-product",
        name: "newProductPage",
        component: NewProductPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    },
    { 
        path: "/product/:id", 
        name: "detailPage", 
        component: DetailPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    },
    {
        path: "/cart", 
        name: "cartPage", 
        component: CartPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    },
    {
        path: "/user/:component",
        name: "userPage",
        component: UserPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    }, 
    {
        path: "/user/product/edit/:id", 
        name: "editProductPage", 
        component: EditProductPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    },
    {
        path: "/order", 
        name: "orderPage", 
        component: OrderPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({ name: "login" });
        },
    }
];
