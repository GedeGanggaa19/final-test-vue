import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            cart: [], // Menyimpan keranjang lokal
            qty: 0,   // Total kuantitas produk dalam keranjang
            total: 0,  // Total harga produk dalam keranjang
            transactionHistory: [] // Menyimpan riwayat transaksi
        };
    },
    mutations: {
        setCartData(state, payload) {
            state.cart = payload;
        },
        addToCart(state, product) {
            const existingProduct = state.cart.find(
                item => item.name === product.name && item.color === product.color && item.size === product.size
            );
    
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.cart.push({ 
                    ...product,
                    quantity: 1 
                });
            }
    
            state.qty++;
            state.total += product.price;
        },
        removeFromCart(state, productId) {
            const productIndex = state.cart.findIndex(product => product.id === productId);
    
            if (productIndex !== -1) {
                const product = state.cart[productIndex];
                state.qty -= product.quantity;
                state.total -= product.price * product.quantity;
    
                state.cart.splice(productIndex, 1);
            }
        },
        increaseProductQuantity(state, productId) {
            const product = state.cart.find(item => item.id === productId);
            if (product) {
                product.quantity++;
                state.qty++;
                state.total += product.price;
            }
        },
        decreaseProductQuantity(state, productId) {
            const product = state.cart.find(item => item.id === productId);
            if (product && product.quantity > 1) {
                product.quantity--;
                state.qty--;
                state.total -= product.price;
            }
        },
        setTransactionHistory(state, history) {
            state.transactionHistory = history;
        },
        clearCart(state) {
            state.cart = [];
            state.qty = 0;
            state.total = 0;
        },
    },
    actions: {
        async fetchCartData({ commit, rootState }) {
            const userId = rootState.auth.userLogin.userId; // Ambil userId dari sesi login
            try {
                const { data } = await axios.get(
                    `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/cart/${userId}.json`
                );
        
                const cartArray = [];
                // Pastikan hanya produk yang ada di cart yang dimuat
                for (let key in data) {
                    cartArray.push({ id: key, ...data[key] });
                }
        
                commit("setCartData", cartArray);
            } catch (err) {
                console.log("Error fetching cart data:", err);
            }
        },        

        async addProductToCart({ commit, state, rootState, dispatch }, product) {
            const userId = rootState.auth.userLogin.userId;
        
            const existingProduct = state.cart.find(
                item => item.name === product.name && item.color === product.color && item.size === product.size
            );
        
            if (existingProduct) {
                commit("increaseProductQuantity", existingProduct.id);
                await dispatch("updateProductInFirebase", existingProduct);
            } else {
                const newProductData = { 
                    ...product, 
                    quantity: 1, 
                    userId
                };
        
                try {
                    await axios.put(
                        `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/cart/${userId}/${product.id}.json`,
                        newProductData
                    );
                    commit("addToCart", newProductData);
                } catch (err) {
                    console.log("Error adding product to Firebase:", err);
                }
            }
        },        

        async removeProductFromCart({ commit }, productId) {
            commit("removeFromCart", productId);
            const userId = this.state.auth.userLogin.userId;
            try {
                await axios.delete(
                    `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/cart/${userId}/${productId}.json`
                );
                console.log("Product removed from Firebase:", productId);
            } catch (err) {
                console.log("Error removing product from Firebase:", err);
            }
        },

        async updateProductInFirebase({ rootState }, product) {
            const userId = rootState.auth.userLogin.userId;
            try {
                await axios.patch(
                    `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/cart/${userId}/${product.id}.json`,
                    { quantity: product.quantity }
                );
                console.log(`Product ${product.id} updated with new quantity: ${product.quantity}`);
            } catch (err) {
                console.log("Error updating product quantity in Firebase:", err);
            }
        },

        async increaseProductQuantity({ commit, dispatch }, productId) {
            commit("increaseProductQuantity", productId);
            const product = this.state.cart.cart.find(item => item.id === productId);
            if (product) {
                await dispatch("updateProductInFirebase", product);
            }
        },

        async decreaseProductQuantity({ commit, dispatch }, productId) {
            commit("decreaseProductQuantity", productId);
            const product = this.state.cart.cart.find(item => item.id === productId);
            if (product) {
                await dispatch("updateProductInFirebase", product);
            }
        },

        async placeOrder({ state, rootState, commit }) {
            const userId = rootState.auth.userLogin.userId;
            
            try {
                // Simpan setiap produk ke riwayat pesanan di Firebase
                for (const product of state.cart) {
                    const orderData = {
                        ...product,
                        orderAmount: product.price * product.quantity,
                        orderDate: new Date().toISOString()
                    };
        
                    // Pindahkan produk ke history
                    await axios.put(
                        `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/history/${userId}/${product.id}.json`,
                        orderData
                    );
                }
        
                // Hapus seluruh data cart dari Firebase untuk pengguna
                await axios.delete(`https://final-test-vue-53ca3-default-rtdb.firebaseio.com/cart/${userId}.json`);
                
                console.log("Order placed successfully and cart cleared in Firebase.");
                
                // Kosongkan keranjang di store setelah data dipindahkan
                commit("clearCart");
            } catch (err) {
                console.log("Error placing order and clearing cart in Firebase:", err);
            }
        },        

        async fetchTransactionHistory({ commit, rootState }) {
            const userId = rootState.auth.userLogin.userId;
            try {
                const { data } = await axios.get(
                    `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/history/${userId}.json`
                );

                const historyArray = [];
                for (let key in data) {
                    historyArray.push({ id: key, ...data[key] });
                }

                commit("setTransactionHistory", historyArray);
            } catch (err) {
                console.log("Error fetching transaction history:", err);
            }
        },
        async addToTransactionHistory({ commit, state, rootState }, { orderAmount, shippingFee, totalAmount }) {
            const userId = rootState.auth.userLogin.userId;
            const orderData = {
                orderDate: new Date().toISOString(),
                items: state.cart,
                orderAmount: orderAmount,
                shippingFee: shippingFee,
                totalAmount: totalAmount
            };
            
            try {
                await axios.post(
                    `https://final-test-vue-53ca3-default-rtdb.firebaseio.com/history/${userId}.json`,
                    orderData
                );
                
                // Kosongkan keranjang setelah melakukan pemesanan
                commit("clearCart");
            } catch (err) {
                console.log("Error adding to transaction history:", err);
            }
        },        

        clearCart({ commit }) {
            commit("clearCart");
        }
    },
    getters: {
        transactionHistory: (state) => state.transactionHistory,
    }
};