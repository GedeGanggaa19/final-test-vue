<template>
    <div class="container-md py-5 my-5">
        <div class="d-flex justify-content-between align-items-center">
            <div class="popular__title mt-4 mb-4">
                <h2 class="fw-bold">Items</h2>
            </div>
        </div>
        <product-list-all
        :products="productListAll"
        v-if="productListAllStatus">
        </product-list-all>
    </div>
</template>

<script setup>
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