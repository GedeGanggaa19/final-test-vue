<template>
    <div class="container">
        <div class="popular__list row d-flex">
            <div class="col-10 col-lg-2 col-md-3 col-sm-4" style="padding: 6px; padding-bottom: 12px;" 
            v-for="(product, index) in products" :key="index">
                <router-link
                :to="`/product/${product.id}`" 
                class="card position-relative text-decoration-none" 
                style="height: 360px; color: black">
                    <img 
                    :src="product.image" class="card-img-top" 
                    :alt="product.name" 
                    style="height:230px; width: 100%;">
                    <div class="card-body">
                        <div class="h-auto">
                            <h4 class="fs-5 mb-0" style="color: darkgreen;">Rp.{{ product.price }}</h4>
                        </div>
                        <p class="mb-20">{{ product.name }}</p>
                        <hr>
                        <div class="d-flex justify-content-between ">
                            <p>{{ product.size }} / {{ product.color }}</p>
                            <i class="fa-regular fa-heart mt-1" style="color: #000000;"> 19</i>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import product from '@/store/product';

defineProps({
    products: Array
})
</script>