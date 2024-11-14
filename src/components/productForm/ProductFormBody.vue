<template>
  <li class="list-group-item col-md-10 mx-auto" >
      <form @submit.prevent="addNewProduct">
          <div>
          <p class="my-3 fs-5 fw-semibold">General Information</p>
          <div>
              <div class="mb-3">
                  <base-input
                      type="file"
                      identity="productImage"
                      label="Photo Product"
                      @input="checkImage">
                  </base-input>
                  <div v-if="productData.image">
                      <img 
                      :src="productData.image" 
                      :alt="productData.name"
                      class="image">
                  </div>
              </div>
              <div class="mb-3">
                  <base-input
                      type="text"
                      identity="productName"
                      placeholder="Name Product"
                      label="Name Product"
                      v-model="productData.name">
                  </base-input>
              </div>
              <div class="mb-3">
                  <base-text-area
                      identity="productDescription"
                      label="Description"
                      placeholder="Share story behind product and what is make it special"
                      v-model="productData.description">
                  </base-text-area>
              </div>
              <div class="mb-3">
                  <base-input
                      type="text"
                      identity="productCategory"
                      placeholder="Category Product"
                      label="Category Product"
                      v-model="productData.category">
                  </base-input>
              </div>
              <div class="mb-3">
                  <label for="productSize" class="fw-semibold">Size Product <span style="color: #cb3a31;">*</span></label>
                  <base-select
                      identity="productSize"
                      :data="['S', 'M', 'L', 'XL', 'XXL']"
                      v-model="productData.size">
                  </base-select>
              </div>
              <div class="mb-3">
                  <base-input
                      type="text"
                      identity="productColor"
                      placeholder="Color Product"
                      label="Color Product"
                      v-model="productData.color">
                  </base-input>
              </div>
              <div class="mb-3">
                  <base-input
                      type="number"
                      identity="productPrice"
                      placeholder="Price Product"
                      label="Price Product"
                      v-model="productData.price">
                  </base-input>
              </div>
              <div class="mb-3">
                  <base-input
                      type="number"
                      identity="productShipping"
                      placeholder="Shipping Product"
                      label="Shipping Product"
                      v-model="productData.shipping">
                  </base-input>
              </div>
          </div>
          </div>
          <div class="border-top py-3 d-flex my-4 justify-content-end">
              <base-button
                  class="cancel-btn px-3 py-2 ms-1 border" style="background-color: darkred; color: white;">Cancel
              </base-button>
              <base-button 
                  class="submit-product-btn px-3 py-2 ms-1 border" style="background-color: darkgreen; color: white;">Submit
              </base-button>
          </div>
      </form>
  </li>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseTextArea from '../ui/BaseTextArea.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const productData = ref({
image: "",
name: "",
description: "",
category: "",
size: "",
color: "",
price: 0,
shipping: 0,
});

const checkImage = (e) => { 
const file = e.target.files[0];
const reader = new FileReader();
reader.readAsDataURL(file);

reader.addEventListener("load", () => {
  productData.value.image = reader.result;
});
};

const store = useStore();
const router = useRouter();

const addNewProduct = async () => {
  const route = router.currentRoute.value;

  if (props.isEdit) {
      await store.dispatch("product/updateProduct", { id: route.params.id, newProduct: productData.value });
  } else {
  await store.dispatch("product/addNewProduct", productData.value);
  }
  router.push("/");
};

const props = defineProps({
isEdit: { type: Boolean, default: false },
});

onMounted(() => {
if (props.isEdit) {
  productData.value = store.state.product.productDetail;
}
});
</script>