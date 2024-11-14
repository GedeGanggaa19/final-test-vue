<template>
    <div class="container-md my-5 py-5">
      <div class="row">
        <div class="col-md-3">
          <user-menu @changeComponent="changeComponent" />
        </div>
        <div class="col-md-9">
          <component :is="currentComponent" v-if="currentComponent" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import UserMenu from "../user/UserMenu.vue";
  import PersonalInfo from "../user/PersonalInfo.vue";
  import ChangePassword from "../user/ChangePassword.vue";
  import UserProduct from "../user/UserProduct.vue";
  import TransactionHistory from "../user/TransactionHistory.vue";
  
  import { ref, computed, watch } from "vue";
  import { useRoute } from "vue-router";
  import { useStore } from "vuex";
  const route = useRoute();
  const store = useStore();
  const userData = computed(() => store.state.auth.userLogin);
  
  const componentMap = {
    "personal-info": PersonalInfo,
    "change-password": ChangePassword,
    "user-product": UserProduct,
    "transaction-history": TransactionHistory,
  };
  
  const currentComponent = ref(null);
  
  const changeComponent = (componentName) => {
    currentComponent.value = componentMap[componentName] || null;
  };
  
  const getRoute = computed(() => route.params.component || "personal-info");
  changeComponent(getRoute.value);
  </script>