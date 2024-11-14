<template>
    <header class="shadow-sm container-fluid bg-white py-3 border-bottom fixed-top">
        <div class="container-md d-flex justify-content-between align-item-center">
            <router-link to="/"><img src="@/assets/images/Logoo.png" alt="logo" style="width: 55px; height: 55px;"></router-link> 
            <span class="ms-2 fw-bold mt-2 me-3" style="font-size: 25px;">Vintage</span>
            <navigation-bar></navigation-bar>
        </div>
    </header>
</template>

<script setup>
import NavigationBar from './NavigationBar.vue';
</script>