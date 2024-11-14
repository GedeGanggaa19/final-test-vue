<template>
    <div class="container-fluid py-5" style="margin-top: 130px; margin-bottom: 110px;">
      <div style="background-color: white; width: 500px; min-height: 50vh; box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2); border-radius: 8px;" class="p-5 m-auto login-form">
        <div class="text-center ">
          <h2 class="mt-4">Log in to Vintage</h2>
          <p>Enter your details below</p>
        </div>
        <form @submit.prevent="login">
          <div class="my-4"><!-- Email -->
            <base-input
            type="email"
            identity="email"
            placeholder="Your Email Address"
            label="Email"
            v-model="loginData.email"
          >
          </base-input>
          </div>
          <div class="my-4"><!-- Password -->
            <base-input
            type="password"
            identity="password"
            placeholder="Your Password"
            label="Password"
            v-model="loginData.password"
          >
          </base-input>
          </div>
          <base-button type="submit" class="btn btn-success" id="btn-signup" style="width: 100%;">Login </base-button>
        </form>
      </div>
    </div>
  </template>

<script setup>
import BaseInput from "../ui/BaseInput.vue"
import BaseButton from "../ui/BaseButton.vue"
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore ()
const router = useRouter ()

const loginData = reactive ({
  email: "",
  password: "",
  isLogin: true
})

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/")

}
</script>