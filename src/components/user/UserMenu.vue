<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3 settings-menu">
          <p class="settings-title fw-bold fs-1 mt-4">Settings</p>
          <ul class="list-group fs-5" style="margin-left: 20px;">
            <li
              class="list-group-item"
              style="
                border: none;
                background-color: transparent;
                white-space: nowrap;
                cursor: pointer;
              "
              @click="menuClicked('personal-info')"
            >
              Profile Details
            </li>
            <li
              class="list-group-item mt-3"
              style="
                border: none;
                background-color: transparent;
                white-space: nowrap;
                cursor: pointer;
              "
              @click="menuClicked('change-password')"
            >
              Change Password
            </li>
            <li
              class="list-group-item mt-3"
              style="
                border: none;
                background-color: transparent;
                white-space: nowrap;
                cursor: pointer;
              "
              @click="menuClicked('user-product')"
            >
              My Product
            </li>
            <li
              class="list-group-item mt-3"
              style="
                border: none;
                background-color: transparent;
                white-space: nowrap;
                cursor: pointer;
              "
              @click="menuClicked('transaction-history')"
            >
              Transaction History
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore();
  const userData = computed(() => store.state.auth.userLogin);
  
  const emit = defineEmits(["changeComponent"]);
  
  const menuClicked = (option) => {
    emit("changeComponent", option);
  };
  </script>