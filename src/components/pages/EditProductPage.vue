<template>
  <main>
    <div class="container-md my-5 ccol-12" style="font-family: sans-serif;">
      <product-form
          v-if="detailData && !isLoading" :isEdit="true">
      </product-form>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import ProductForm from '../productForm/ProductForm.vue';

const store = useStore();
const route = useRoute();
const detailData = ref();
const isLoading = ref(false);

onMounted(async () => {
  try {
      isLoading.value = true;

      const productId = route.params.id;
      await store.dispatch("product/getProductDetail", productId);

      detailData.value = store.state.product.productDetail;
  } catch (error) {
      console.log(error);
  } finally {
      isLoading.value = false;
  }
});
</script>