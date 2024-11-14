import { createStore } from "vuex";
import auth from "./auth";
import product from "./product";
import cart from './cart';

export const store = createStore ({
    modules: {
        product,
        auth,
        cart
    }
})