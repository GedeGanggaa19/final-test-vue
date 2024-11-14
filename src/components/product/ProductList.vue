<template>
    <div class="container">
        <div class="popular__list row d-flex">
            <div class="col-10 col-lg-2 col-md-3 col-sm-4" style="padding: 6px; padding-bottom: 12px;"
                v-for="(product, index) in products" :key="index" v-show="index < 5">
                <router-link :to="`product/${ product.id }`" class="card position-relative text-decoration-none"
                    style="height: 360px; color: black">
                    <img :src="product.image" class="card-img-top" :alt="product.name"
                        style="height:230px; width:auto;">
                    <div class="card-body">
                        <div class="h-auto">
                            <h4 class="fs-5 mb-0" style="color: darkgreen;">Rp.{{ product.price }}</h4>
                        </div>
                        <p class="mb-20">{{ product.name }}</p>
                        <hr>
                        <div class="d-flex justify-content-between mt-3">
                            <p style="font-size: 14px;">{{ product.size }} / {{ product.color }}</p>
                            <i class="fa-regular fa-heart mt-1" style="color: #000000; font-size: 14px;"> 19</i>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col-10 col-lg-2 col-md-3 col-sm-4" style="padding: 6px; padding-bottom: 12px;">
                <router-link to="/product-list-all" class="card position-relative"
                    style="height: 360px;  background-color: #be8d50; text-decoration: none;">
                    <div class="card-body position-relative justify-content-center d-flex align-items-center">
                        <div style="color: white; font-size: 20px;">
                            <p>See All Product</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    products: Array
})
</script>