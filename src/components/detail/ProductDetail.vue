<template>
    <div class="col-12">
        <product-description :productId="selectedProductId"></product-description>
    </div>
    <div class="container-md py-5 my-5">
        <div class="d-flex justify-content-between align-items-center">
            <div class="popular__title fw-bold">
                <h2>Other Products</h2>
            </div>
        </div>
        <product-list-all
            :products="productListAll"
            v-if="productListAllStatus"
            @product-selected="handleProductSelected"
        ></product-list-all>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import ProductDescription from './ProductDescription.vue';
import ProductListAll from "../product/ProductListAll.vue";
import { onMounted, ref, watch } from "vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const productListAllStatus = ref(false);
const productListAll = ref();
const selectedProductId = ref(route.params.id);

onMounted(async () => {
    await store.dispatch("product/getProductDetail", selectedProductId.value);
});

onMounted(async () => {
    try {
        await store.dispatch("product/getProductData");
        productListAllStatus.value = true;
        productListAll.value = store.state.product.products;
    } catch (error) {
        console.log(error);
    }
});

function handleProductSelected(productId) {
    selectedProductId.value = productId;
    store.dispatch("product/getProductDetail", productId);
}
</script>
