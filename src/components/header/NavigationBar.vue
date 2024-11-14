<template>
    <div class="header_navbar row col-11 d-flex justyfy-content-beetwen align-items-center">
        <div class="header_navbar row justyfy-content-beetwen align-items-center col-9">
            <search-menu></search-menu>
        </div>
        <div class="header_navbar row justyfy-content-beetwen align-items-center col-3">
            <div class="d-flex">
                <component :is="components[menuComponent]"></component>
            </div>
        </div>
    </div>
</template>

<script setup>
import SearchMenu from './SearchMenu.vue'; 
import SignupMenu from './SignupMenu.vue';
import ProfileMenu from './ProfileMenu.vue';
import { computed, ref, watch } from "vue"
import { useStore } from 'vuex';

const menuComponent = ref ("signup-menu");
const store = useStore();

const components = {
    'signup-menu': SignupMenu,
    'profile-menu': ProfileMenu
  }

const getToken = computed (() => {
  return store.state.auth.token;
});

if (!getToken.value) {
  menuComponent.value = "signup-menu";
} else {
  menuComponent.value = "profile-menu";
}

watch (getToken, (newValue, oldValue) => {
  if (!newValue) {
  menuComponent.value = "signup-menu";
} else {
  menuComponent.value = "profile-menu";
}
});
</script>