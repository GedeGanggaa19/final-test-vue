<template>
  <div class="container-md">
    <div class="row">
      <!-- Bagian Cart Card -->
      <div class="col-8">
          <div class="d-flex justify-content-between align-items-center">
              <h2>Cart</h2>
              <p class="px-3 py-1 mt-3 fw-bold" style="border: 1px solid black;">{{ totalItems }} Items</p>
          </div>
          <hr>
          <div class="d-flex">
              <i class="fa-solid fa-location-dot p-1" style="color: #000000;"></i>
              <p>shipping to <span class="fw-semibold">Sekar Tunjung, Denpasar, Bali, Indonesia</span></p>
          </div>
          <div v-if="cartProducts && cartProducts.length > 0">
              <div v-for="(product, index) in cartProducts" :key="index" class="cart-item d-flex justify-content-between align-items-start border p-3 my-3">
                  <div class="d-flex align-items-center">
                      <img :src="product.image" alt="Product Image" class="product-image me-3 border" style="width: 100px; height: 100%;"/>
                      <div>
                      <h5>{{ product.name }}</h5>
                      <p>{{ product.size }}/{{ product.color }}</p>
                      <h6 class="text-dark">Rp.{{ formatPrice(product.price) }}</h6>
                      <button class="btn btn-link p-2 mt-2" @click="removeProduct(product.id)"  style="text-decoration: none; background-color: darkred; color: white;">Remove</button>
                      </div>
                  </div>
                  <div class="quantity-controls d-flex align-items-center py-5">
                      <button class="btn btn-outline-secondary" @click="decreaseQuantity(product.id)">−</button>
                      <span class="mx-2">{{ product.quantity }}</span>
                      <button class="btn btn-outline-secondary" @click="increaseQuantity(product.id)">+</button>
                  </div>
              </div>
          </div>
          <div v-else class="empty-cart text-center my-5">
              <i class="fa-solid fa-cart-shopping mb-3" style="font-size: 100px; color: black;"></i>
              <h4>Your cart is still empty</h4>
              <p class="text-muted">Find your favorite items and add to cart before checking out.</p>
              <router-link to="/product-list-all" class="btn btn-primary mt-3 btn-find">Find Products</router-link>
          </div>
      </div>

      <!-- Bagian Order Summary -->
      <div class="col-4">
        <div class="order-summary card p-3" style="position: sticky; top: 95px;">
          <h5 class="d-flex justify-content-between">
            <span>Order Summary</span>
            <span>Rp{{ formatPrice(totalPrice) }}</span>
          </h5>
          <p>{{ totalItems }} items</p>
          <p class="text-muted">Not include shipping fee</p>
          <router-link
          to="/order"
          class="btn btn-checkout"
          :disabled="totalItems === 0"
          :class="{ 'disabled': totalItems === 0 }"
          >
          Checkout ( {{ totalItems }} )
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cartProducts = computed(() => store.state.cart.cart);


onMounted(() => {
  // Ambil produk di keranjang dari Vuex store
  cartProducts.value = store.state.cart.cartItems || [];
});

function formatPrice(price) {
  return price.toLocaleString('id-ID');
}

const totalPrice = computed(() => {
  return cartProducts.value.reduce((sum, product) => sum + (product.price * product.quantity), 0);
});

const totalItems = computed(() => {
  return cartProducts.value.reduce((count, product) => count + product.quantity, 0);
});

function removeProduct(productId) {
  store.dispatch("cart/removeProductFromCart", productId);
}

function increaseQuantity(productId) {
  console.log("Increasing quantity for product with id:", productId);
  store.dispatch("cart/increaseProductQuantity", productId);
}

function decreaseQuantity(productId) {
  console.log("Decreasing quantity for product with id:", productId);
  store.dispatch("cart/decreaseProductQuantity", productId);
};
</script>

<style scoped>
.product-image {
width: 80px;
height: 80px;
object-fit: cover;
}

.order-summary {
background-color: #f8f9fa;
border-radius: 8px;
}

.btn-checkout {
background-color: darkgreen;
color: white;
width: 100%;
}

.btn-checkout:disabled {
color: white;
}

.btn-checkout:active {
background-color: darkgreen;
}

.empty-cart {
padding: 2rem;
display: flex;
flex-direction: column;
align-items: center;
color: #333;
}

.empty-cart h4 {
margin-top: 1rem;
}

.empty-cart p {
opacity: 75%;
}

.btn-find {
background-color: darkgreen;
border: 1px solid black;
}

.btn-find:active {
background-color: darkgreen;
}
</style>