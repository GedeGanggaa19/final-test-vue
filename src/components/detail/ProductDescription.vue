<template>
    <div class="container" style="font-family: sans-serif;">
      <div class="row my-5">
        <div class="col-6">
          <img :src="productDetail.image" alt="Product Image" class="border" style="width: 100%; height: 100%; margin-left: 60px;">
        </div>
        <div class="col-4" style=" margin-left: 60px; ">
          <div class="card" style=" width: 500px;">
            <div class="card-body my-3" style="height: 575px;">
              <div class="d-flex justify-content-between">
                <h5 class="card-title fw-bold fs-2">Rp.{{ productDetail.price }}</h5>
                <i class="fa-regular fa-heart fs-2" style="color: #000;"></i>
              </div>
              <h6 class="fw-bold fs-4 mt-2">{{ productDetail.name }}</h6>
              <div class="d-flex mt-3" style="font-size: 15px;">
                <p>{{ productDetail.size }} / {{ productDetail.color }}</p>
                <ul class="d-flex">
                  <li class="p-0">Very Good</li>
                </ul>
                <ul>
                  <li class="p-0">Denpasar</li>
                </ul>
              </div>
              <hr>
              <p class="fw-bold">Item Description</p>
              <h6>{{ productDetail.description }}</h6>
              <div class="d-flex mt-4">
                <div class="col-lg-12">
                  <ul type="none" style="margin-left: -30px;">
                    <div class="row py-3" v-for="(value, key) in productInfo" :key="key">
                      <li class="col-6">{{ key }}</li>
                      <li class="col-6">{{ value }}</li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-footer mt-5">
              <a href="#" class="btn btn-primary w-100 mb-3 mt-3" style="background-color: darkgreen; border: 1px solid black;">Buy now</a>
              <button @click="addToCart(productDetail)" class="btn  btn-continue w-100 mb-2">Add to Cart</button>
              <hr>
              <div class="d-flex align-items-center my-3">
                <i class="fas fa-user-circle me-2" style="font-size: 40px; color: darkgreen;"></i>
                <div>
                  <h6 class="mb-0">Gede Gangga Sahtya Bhuana</h6>
                  <div class="d-flex align-items-center" style="font-size: 14px; color: #f39c12;">
                    <i class="fas fa-star" v-for="n in 5" :key="n"></i>
                    <span class="text-muted ms-1">(999)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="showModal" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5);" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-3">
            <div class="modal-body text-center">
              <video autoplay loop muted playsinline width="250">
                <source src="@/assets/images/cartmodal.webm" type="video/webm" />
              </video>
              <h5 class="mb-3 fw-bold">Product Successfully Added To Cart</h5>
              <p><strong> "{{ productDetail.name }}" </strong> successfully added to cart. Check now on the cart or continue shopping</p>
              <div class="mt-4">
                <button @click="continueShopping" class="btn btn-outline-primary w-100 my-1 btn-continue" style="color: darkgreen; border: 1px solid black;">Continue shopping</button>
                <router-link to="/cart" class="btn btn-primary w-100 my-1" style="background-color: #006400; border: 1px solid black;">Go to cart</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const loading = ref(true);
  const showModal = ref(false);
  
  const productDetail = computed(() => store.state.product.productDetail);
  const productInfo = computed(() => ({
    Category: productDetail.value.category,
    Size: productDetail.value.size,
    Condition: "Very Good",
    Color: productDetail.value.color,
    Uploaded: "5 hours ago",
    Shipping: `Rp.${productDetail.value.shipping}`
  }));
  
  const fetchProductDetail = async () => {
    loading.value = true;
    await store.dispatch("product/getProductDetail", route.params.id);
    loading.value = false;
  };
  
  onMounted(fetchProductDetail);
  watch(() => route.params.id, fetchProductDetail);
  
  const addToCart = async (product) => {
    try {
      const productToAdd = {
        ...product,
        id: product.id || Date.now(),
        quantity: 1
      };
      await store.dispatch("cart/addProductToCart", productToAdd);
      showModal.value = true;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  
  const continueShopping = () => {
    showModal.value = false;
  };
  </script>
  
<style scoped>
.btn-continue {
  color: darkgreen; border: 1px solid black; background-color: white;
}

.btn-continue:hover {
  background-color: darkgreen;
  color: white !important;
}
  </style>
  