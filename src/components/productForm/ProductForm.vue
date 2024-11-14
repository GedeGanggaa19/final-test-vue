<template>
  <ul class="list-group mt-5 py-5">
    <product-form-header ></product-form-header>
    <product-form-body
    :isEdit="isEdit">
  </product-form-body>
  </ul>
</template>

<script setup>
import ProductFormHeader from './ProductFormHeader.vue';
import ProductFormBody from './ProductFormBody.vue';
import { defineProps } from 'vue';

defineProps({
isEdit: { type: Boolean, default: false }
});
</script>