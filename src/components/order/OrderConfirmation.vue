<template>
    <div class="order-page container py-5 my-5" style="padding: 20px;">
        <div class="row" style="display: flex; width: 100%; gap: 20px;">
            <div class="col-8 order-list" style="flex: 2;">
                <h2>Order</h2>
                <div class="order-item border my-3 p-3" v-for="(item, index) in cartProducts" :key="index" style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
                    <img :src="item.image" alt="Product image" class="product-image border" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;"/>
                    <div class="order-details" style="flex: 1;">
                        <p class="product-name fw-semibold">{{ item.name }}</p>
                        <p class="product-size" style="color: #666;">{{ item.size }}/{{ item.color }}</p>
                        <p class="product-price" style="color: #666;">{{ formatCurrency(item.price) }}</p>
                    </div>
                    <p class="quantity" style="color: #666; margin-left: 10px;">x{{ item.quantity }}</p>
                </div>
                
                <div class="address-card border mt-4 p-3">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-map-marker-alt fa-2x me-3" style="color: darkgreen;"></i>
                        <div>
                            <h6 class="mb-1">Home of {{ fullName }}</h6>
                            <p class="mb-0">Br. Madangan Kelod, Petak, Gianyar, Bali, Indonesia</p>
                        </div>
                    </div>
                </div>

                <div class="delivery-details border mt-4 p-3">
                    <h6>Delivery details</h6>
                    <div class="d-flex align-items-center mt-2">
                        <i class="fas fa-shield-alt fa-2x me-3" style="color: darkgreen;"></i>
                        <div>
                            <h6 class="mb-1">J&T Express</h6>
                            <p class="mb-0">{{ formatCurrency(shippingFee) }}</p>
                            <p class="text-muted small">
                                <i class="fas fa-clock me-1"></i> Home delivery in 1-3 working days
                            </p>
                        </div>
                    </div>
                </div>

                <div class="payment-method border mt-4 p-3">
                    <div class="d-flex align-items-center">
                        <i class="fab fa-cc-visa fa-2x me-3" style="color: darkblue;"></i>
                        <div>
                            <p class="mb-1">081234567890</p>
                            <p class="mb-1">19/03 • Oct</p>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-user me-2"></i>
                                <span>{{ fullName }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-4 order-summary sticky-top border" style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 20px; height: fit-content; z-index: 1000; position: sticky; top: 95px;">
                <h3 style="font-size: 16px; margin-bottom: 10px;">Order summary</h3>
                <div class="summary-item" style="display: flex; justify-content: space-between; margin: 8px 0; color: #666;">
                    <span>Order</span>
                    <span>{{ formatCurrency(orderAmount) }}</span>
                </div>
                <div class="summary-item" style="display: flex; justify-content: space-between; margin: 8px 0; color: #666;">
                    <span>Shipping</span>
                    <span>{{ formatCurrency(shippingFee) }}</span>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;" />
                <div class="total" style="display: flex; justify-content: space-between; font-weight: bold; margin: 12px 0;">
                    <span>Total to pay</span>
                    <span>{{ formatCurrency(totalToPay) }}</span>
                </div>
                <button class="order-button" style="width: 100%; padding: 10px; color: white; background-color: darkgreen; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;" @click="orderNow" :disabled="orderAmount === 0">
                    Order Now
                </button>
            </div>
        </div>

        <div v-if="isModalVisible" class="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 2000;">
            <div class="modal-content" style="background: white; border-radius: 8px; padding: 20px; text-align: center; width: 500px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <video autoplay loop muted playsinline width="250" style="margin-left: 110px;">
                    <source src="@/assets/images/paymodal.webm" type="video/webm" />
                </video>
                <h3>Order #{{ orderId }} placed successfully</h3>
                <p>Thank you for doing online shopping at Vintage. You can track and see your order on the transaction history menu.</p>
                <button class="modal-button border" style="background-color: #eeeeee; border: none; border-radius: 4px; padding: 10px 15px; margin: 5px; cursor: pointer; font-size: 14px; transition: background-color 0.3s;" @click="continueShopping">Continue shopping</button>
                <router-link to="/user/transaction-history" class="modal-button history-button border text-decoration-none" style="background-color: darkgreen; color: white; border: none; border-radius: 4px; padding: 10px 15px; margin: 5px; cursor: pointer; font-size: 14px; transition: background-color 0.3s;">Go to History Transaction</router-link>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cartProducts = computed(() => store.state.cart.cart);
const fullName = computed(() => store.state.auth.userLogin.fullname);

const isModalVisible = ref(false);
const orderId = ref("ORD-89123-823");

onMounted(() => {
  store.dispatch("cart/fetchCartData");
});

const orderAmount = computed(() => {
  return cartProducts.value.reduce((sum, product) => sum + product.price * product.quantity, 0);
});

const shippingFee = computed(() => {
  return cartProducts.value.reduce((total, product) => {
    const shippingCost = product.shipping ? Number(product.shipping) : 0;
    return total + shippingCost;
  }, 0);
});

const totalToPay = computed(() => orderAmount.value + shippingFee.value);

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(value);
}

async function orderNow() {
    await store.dispatch("cart/addToTransactionHistory", {
        orderAmount: orderAmount.value,
        shippingFee: shippingFee.value,
        totalAmount: totalToPay.value
    });
    await store.dispatch("cart/placeOrder");
    isModalVisible.value = true;
}

function continueShopping() {
  isModalVisible.value = false;
}
</script>