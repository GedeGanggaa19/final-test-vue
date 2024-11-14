import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productDetail: {},
    };
  },
  getters: {},
  mutations: {
    setProductData(state, payload) {
      state.products = payload;
    },

    setProductDetail(state, payload) {
      state.productDetail = payload;
    },

    setNewProduct(state, payload) {
      state.products.push.payload;
    },

    setCartData(state, payload) {
      state.cartItems = payload;
    },

    removeItemFromCart(state, itemId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
  },
  actions: {
    async getProductData({ commit }) {
      try {
        const { data } = await axios.get(
          "https://final-test-vue-53ca3-default-rtdb.firebaseio.com/products.json"
        );
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        console.log(arr)
        commit("setProductData", arr);
      } catch (err) {
        console.log(err);
      }
    },

    async getProductDetail({ commit }, payload) {
      try {
        console.log(payload);
        const { data } = await axios.get(
          `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/products/${payload}.json`
        );
        commit("setProductDetail", data);
      } catch (err) {}
    },

    async addNewProduct({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(
          `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.token}`,
          newData
        );
        commit("setNewProduct", { id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct({ dispatch, rootState }, payload) {
      try {
        const { data } = await axios.delete(
          `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.token}`);
        await dispatch("getProductData");
      } catch (err) {
        console.log(err);
      }
    },
    async updateProduct({ dispatch, rootState }, { id, newProduct }) {
      try {
          const { data } = await axios.put(
              `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/products/${id}.json?auth=${rootState.auth.token}`, newProduct
          );
          await dispatch("getProductData")
      } catch (error) {
          console.log(error);
      }
  },
    async updateUser({ commit, state }, payload) {
      try {
        await axios.put(
          `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/user/${state.userLogin.userId}.json?auth=${state.token}`,
          payload
        );
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
