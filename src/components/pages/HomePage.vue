<template>
    <div class="imgutama align-items-center d-flex mb-5">
        <div class="card" style="width: 18rem; margin-left: 120px; ">
            <div class="card-body">
                <h5 class="card-title mb-4 fw-bold pb-4" style="font-size: 28px;">Ready to declutter you closet?</h5>
                <a href="#" class="btn text-white" style="min-width: 100%; background-color: #be8d50; font-size: 19px;">Shop Now</a>
            </div>
        </div>
    </div>
    <div class="container-md my-5">
        <div class="d-flex justify-content-between align-items-center">
            <div class="popular__title">
                <h2>Popular items</h2>
            </div>
            <div>
                <router-link to="/product-list-all" style="color: black; text-decoration: none;">See All</router-link>
            </div>
        </div>
        <product-list
        :products="productList"
        v-if="productListStatus">
        </product-list>
    </div>

    <brand-list></brand-list>
    
    <div class="container-md my-5">
        <div class="d-flex justify-content-between align-items-center">
            <div class="popular__title">
                <h2>Popular items</h2>
            </div>
            <div>
                <router-link to="/product-list-all" style="color: black; text-decoration: none;">See All</router-link>
            </div>
        </div>
        <product-list
        :products="productList"
        v-if="productListStatus">
        </product-list>
    </div>
</template>

<script setup>
import ProductList from '../product/ProductList.vue';
import BrandList from '../brand/BrandList.vue';
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const productListStatus = ref(false);
const productList = ref();

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    productListStatus.value = true;
    productList.value = store.state.product.products
  } catch (error) {
    console.log(error);
  }
});
</script>