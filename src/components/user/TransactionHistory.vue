<template>
    <div class="transaction-history" style="padding: 20px;">
      <h2 style="font-size: 24px; margin-bottom: 20px;">My Order</h2>
      <div v-if="orders && orders.length > 0">
        <div v-for="(order, index) in orders" :key="index" class="order-card" style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 20px; text-align: left;">
          <div class="order-header" style="display: flex; align-items: center; margin-bottom: 10px;">
            <div class="icon me-3" style="font-size: 16px; color: #006400; display: flex; align-items: center; font-weight: bold;">
              <i class="fas fa-shopping-bag" style="margin-right: 5px;"></i> Shopping
            </div>
            <span class="order-date me-3" style="font-size: 14px; color: #777;">{{ new Date(order.orderDate).toLocaleDateString() }}</span>
            <span class="order-status done me-3" style="font-size: 14px; color: #006400; font-weight: bold;">Done</span>
            <span class="order-id" style="font-size: 14px; color: #777;">{{ order.id }}</span>
          </div>
          <div class="order-content" style="margin-top: 10px;">
            <div v-for="(item, itemIndex) in (order.items ? order.items.slice(0, 1) : [])" :key="itemIndex" class="order-item" style="display: flex; align-items: center;">
              <div class="item-image" style="margin-right: 15px;">
                <img :src="item.image" alt="Product Image" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
              </div>
              <div class="item-details">
                <h3 style="font-size: 16px; margin: 0;">{{ item.name }}</h3>
                <p style="font-size: 14px; color: #555; margin: 2px 0;">{{ item.quantity }} product x {{ formatCurrency(item.price) }}</p>
                <p style="font-size: 14px; color: #555; margin: 2px 0;">{{ item.size }} / {{ item.color }}</p>
              </div>
            </div>
            <div v-if="order.items && order.items.length > 1" class="additional-products" style="font-size: 14px; color: #777; margin-top: 5px;">
              + {{ order.items.length - 1 }} more products
            </div>
          </div>
          <div class="order-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
            <span class="total-price" style="font-weight: bold; color: red;">Total Price : {{ formatCurrency(order.totalAmount) }}</span>
            <button class="buy-again" style="background-color: #006400; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">Buy Again</button>
          </div>
        </div>
      </div>
      <div v-else class="empty-order" style="display: flex; flex-direction: column; align-items: center; padding: 40px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <i class="fas fa-shopping-bag empty-icon" style="font-size: 40px; color: #006400; margin-bottom: 20px;"></i>
        <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #006400;">No orders yet</h3>
        <p style="font-size: 14px; color: #777; margin-bottom: 20px;">When you buy an item, your order about it will appear here.</p>
        <router-link to="/product-list-all" class="shop-now text-decoration-none" style="background-color: #006400; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">Shop now</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const orders = computed(() => store.getters["cart/transactionHistory"] || []);
  
  onMounted(() => {
    store.dispatch("cart/fetchTransactionHistory");
  });
  
  function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value);
  }
  </script>