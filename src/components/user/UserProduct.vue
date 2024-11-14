<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Product</p>
          <p class="my-0 text-secondary">Add your original product here</p>
        </div>
        <div>
          <button class="btn add-btn px-3 py-2 border" style="background-color: darkgreen; color: white;" @click="$router.push( '/new-product' )">
            <i class="fa-solid fa-circle-plus pe-2"></i>Add Product
          </button>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Product</p>
      <div class="row">
        <user-product-card
              v-for="product in products"
              :key="product.id"
              :product="product"
              :buttonName="['Delete', 'Edit']"
              @btnRemowe="deleteProduct(product.id)"
              @btnUpdate="updateProduct(product.id)"
          >
              <p>{{ new Date(product.createdAt).toDateString() }}</p>
          </user-product-card>
      </div>
    </li>
  </ul>
</template>

<script setup>
import UserProductCard from './UserProductCard.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const products = computed(() => {
const allProduct = store.state.product.products;
const userId = store.state.auth.userLogin.userId;
return allProduct.filter((product) => product.userId === userId);
});

const deleteProduct = async (id) => {
await store.dispatch("product/deleteProduct", id);
};

const updateProduct = async (id) => {
await store.dispatch("product/updateProduct", id);
router.push(`product/edit/${id}`);
};
</script>