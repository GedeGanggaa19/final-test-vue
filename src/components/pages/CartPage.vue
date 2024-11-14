<template>
  <div class="container-md my-5 py-5">
      <cart-product></cart-product>
      <div class="d-flex justify-content-between align-items-center mt-5">
          <div class="popular__title">
              <h2>Other Products</h2>
          </div>
      </div>
      <product-list-all
      :products="productListAll"
      v-if="productListAllStatus">
      </product-list-all>
  </div>
</template>

<script setup>
import CartProduct from "../cart/CartProduct.vue";
import ProductListAll from "../product/ProductListAll.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const productListAllStatus = ref(false);
const productListAll = ref();

onMounted(async () => {
  try {
      await store.dispatch("product/getProductData");
      productListAllStatus.value = true;
      productListAll.value = store.state.product.products;
  } catch (error) {
      console.log(error);
  }
});
</script>