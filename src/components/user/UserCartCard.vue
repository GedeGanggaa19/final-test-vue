<template>
    <div class="col-12 mb-4">
      <div class="card flex-row">
        <img
          v-if="cartItem.image"
          :src="cartItem.image"
          class="card-img-left"
          alt="Product Image"
        />
        <div class="card-body">
          <h5 class="card-title">{{ cartItem.productName }}</h5>
          <p class="card-text">Price: ${{ cartItem.price }}</p>
          <p class="card-text">Quantity: {{ cartItem.quantity }}</p>
          <p class="card-text text-muted">
            Purchased on: {{ new Date(cartItem.createdAt).toLocaleDateString() }}
          </p>
          <button class="btn btn-danger" @click="handleRemove">
            {{ buttonName[0] }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const props = defineProps({
    cartItem: {
      type: Object,
      required: true,
    },
    buttonName: {
      type: Array,
      default: () => ["Delete"],
    },
  });
  
  // Emit the event to remove the cart item
  const handleRemove = () => {
    emit("btnRemove");
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .card-img-left {
    width: 150px;
    height: auto;
    object-fit: cover;
    margin-right: 1rem;
  }
  
  .card-body {
    flex: 1;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
  </style>