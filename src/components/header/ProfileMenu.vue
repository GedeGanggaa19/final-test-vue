<template>
  <div class="header__signup fw-semibold text-decoration-none" style="text-align: right">
      <div class="d-flex justify-content-center col-12">
          <div class="col-12 d-flex justify-content-center align-items-center">
              <router-link to="/cart" class="fa-solid fa-cart-shopping fa-xl me-2 text-decoration-none" style="color: #000000;">
                <span id="cart-count"> {{ totalItems }} </span>
              </router-link>
              <i class="fa-regular fa-heart fa-xl me-4" style="color: #000000;">
                <span id="cart-count">0</span>
              </i>
              <ul class="navbar-nav">
                  <li style="padding: 0px;">
                      <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style="color: black;">
                          <img
                              :src="userData.imageLink"
                              alt="Profile"
                              width="36"
                              height="36"
                              class="rounded-circle border me-1"
                              style="object-fit: cover"
                          />
                      </a>
                      <ul class="dropdown-menu">
                        <router-link to="/user/personal-info" class="p-0 d-flex align-items-center ms-3 text-decoration-none">
                              <i class="fa-regular fa-user" style="color: #000000; width: 25px;"></i>
                              <li class="dropdown-item" id="dropdown-item">Profile</li>
                          </router-link>
                          <router-link to="/user/order" class="p-0 d-flex align-items-center ms-3 text-decoration-none">
                              <i class="fa-solid fa-clipboard-list" style="color: #000000; width: 25px;"></i>
                              <li class="dropdown-item" id="dropdown-item">Order</li>
                          </router-link>
                          <router-link to="/user/user-product" class="p-0 d-flex align-items-center ms-3 text-decoration-none">
                              <i class="fa-solid fa-gift" style="color: #000000; width: 25px;"></i>
                              <li class="dropdown-item" id="dropdown-item">User Product</li>
                          </router-link>
                          <li class="p-0 d-flex align-items-center ms-3 text-decoration-none" style="cursor: pointer;">
                              <i class="fa-solid fa-arrow-right-from-bracket" style="color: darkred; width: 25px;" @click="showModal = true"></i>
                              <button class="dropdown-item" id="dropdown-item" style="color: darkred;" @click="showModal = true">Logout</button>
                          </li>
                      </ul>
                  </li>
              </ul>
          </div>
          <div class="col-6">
              <select name="language" id="language" class="form-select ms-2 my-1 border-1">
                  <option selected>EN</option>
                  <option value="1">ID</option>
                  <option value="2">JPN</option>
              </select>
          </div>
      </div>
  </div>
  
  <div v-if="showModal" class="custom-modal-overlay">
      <div class="custom-modal">
          <div class="modal-header">
              <h5 class="fw-bold">Logout</h5>
              <button @click="showModal = false" class="close-button">×</button>
          </div>
          <div class="modal-body">
              Are you sure you want to logout from vintage?
          </div>
          <div class="modal-footer">
              <button @click="showModal = false" class="btn btn-secondary border">Close</button>
              <button @click="confirmLogout" class="btn btn-danger">Logout</button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const userData = computed(() => store.state.auth.userLogin);
const showModal = ref(false);
const cartProducts = computed(() => store.state.cart.cart);


const confirmLogout = () => {
  store.commit("auth/setUserLogout");
  router.push("/");
  showModal.value = false;
};

const totalItems = computed(() => {
return cartProducts.value.reduce((count, product) => count + product.quantity, 0);
});
</script>

<style scoped>
#cart-count {
position: relative;
top: -15px;
left: -10px;
background: darkred;
color: white;
border-radius: 50%;
padding: 3px 6px;
font-size: 12px;
font-weight: bold;
}

.custom-modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
}

.custom-modal {
background: white;
width: 400px;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
overflow: hidden;
}

.modal-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px;
}

.modal-header h5 {
margin: 0;
}

.close-button {
background: none;
border: none;
font-size: 1.5rem;
cursor: pointer;
}

.modal-body {
padding: 16px;
font-size: 1rem;
}

.modal-footer {
display: flex;
justify-content: flex-end;
padding: 16px;
background-color: #eeeeee;
}

.modal-footer .btn {
padding: 8px 16px;
margin-left: 8px;
cursor: pointer;
}

.btn-secondary {
background-color: darkgreen;
color: white;
border-radius: 4px;
}

.btn-danger {
background-color: darkred;
color: white;
border: none;
border-radius: 4px;
}
</style>
