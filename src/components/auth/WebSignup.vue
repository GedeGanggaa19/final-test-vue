<template>
  <div class="container-fluid py-5" style="margin-top: 100px;">
    <div style="background-color: white; width: 700px; min-height: 50vh; box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.2); border-radius: 8px;" class="p-5 m-auto signup-form">
      <div class="text-center">
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>
      <form class="mt-3 form-regis" @submit.prevent="register">
        <div class="my-4"><!-- Fullname -->
          <base-input
            type="text"
            identity="fullname"
            placeholder="Ex: Gede Gangga Sahtya Bhuana"
            label="Fullname"
            v-model="signupData.fullname"
          >
          </base-input>
        </div>
        <div class="my-4"><!-- Username -->
          <base-input
            type="text"
            identity="username"
            placeholder="Your Username"
            label="Username"
            v-model="signupData.username"
          >
          </base-input>
        </div>
        <div class="my-4"><!-- Email -->
          <base-input
            type="email"
            identity="email"
            placeholder="Your Email Address"
            label="Email" 
            v-model="signupData.email"
          >
          </base-input>
        </div>
        <div class="my-4"><!-- Password -->
          <base-input
            type="password"
            identity="password"
            placeholder="Your Password"
            label="Password"
            v-model="signupData.password"
            @keyInput="passwordCheck"
          >
          </base-input>
          <p
            class="text-danger mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: passwordStatusDisplay }"
          >
            The password field must be at least 8 characters
          </p>
        </div>
        <div class="my-4"><!-- Confirm Password -->
          <base-input
            type="password"
            identity="confirmationPassword"
            placeholder="Same With Password"
            label="Confirmation Password"
            v-model="signupData.confirmationPassword"
            @keyInput="confirmationPasswordCheck"
          >
          </base-input>
          <p
            class="text-danger mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: confirmPasswordDoesNotMatch }"
          >
            The password confirmation does not match
          </p>
          <p
            class="text-success mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: confirmPasswordMatch }"
          >
            The password confirmation does match
          </p>
        </div>
        <div class="my-4">
          <base-input
          type="file" 
          identity="profileImage"
          label="Profil Photo"
          isImage="true"
          @input="checkImage">
          <div>
              <div class="border p-1 mt-2 rounded-circle">
                <img
                  :src="signupData.imageLink"
                  class="rounded-circle"
                  width="140"
                  height="150"
                  style="object-fit: cover"
                />
              </div>
              <div class="text-center" style="transform: translateY(-24px)">
                <i
                  class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"
                ></i>
              </div>
            </div>
          </base-input>
        </div>
        <div class="d-flex">
          <input type="checkbox" class="mb-6 me-2"/>
          <p>
            By clicking sign up, I hereby agree and consent to
            <a href="#" class="text-decoration-none"
              ><span style="color: darkgreen"> Term & Conditions,</span></a
            >
            I confirm that I have read
            <a href="#" class="text-decoration-none"
              ><span style="color: darkgreen"> Privacy policy.</span></a
            >
          </p>
        </div>
        <base-button type="submit" class="btn btn-primary" id="btn-signup" style="width: 100%;">Sign Up </base-button>
      </form>
    </div>
  </div>
  <div v-if="showRegisterModal" class="register-modal-overlay">
    <div class="register-modal">
      <img src="/src/assets/images/plane.png" alt="Success Icon" class="success-icon" />
      <h3 class="modal-title">Successfully Signup</h3>
      <p class="modal-message">Thank you for registering at vintage. Start finding your favorite pre-loved product here.</p>
      <button @click="goToHomePage" class="btn btn-primary">Go to Home Page</button>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue"
import BaseButton from "../ui/BaseButton.vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

const signupData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: "false",
  imageLink: "",
});

const passwordStatusDisplay = ref("none");
const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");
const showRegisterModal = ref(false);
const store = useStore();
const router = useRouter();

const register = async () => {
  if (
    signupData.password !== signupData.confirmationPassword ||
    signupData.password.length < 8
  ) {
    signupData.confirmationPassword = "";
    signupData.password = "";
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
  } else {
    await store.dispatch("auth/getRegisterData", signupData);
    showRegisterModal.value = true;
  }
};

const goToHomePage = () => {
  router.push("/");
  showRegisterModal.value = false;
};


const passwordCheck = () => {
  if (signupData.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
};

const confirmationPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
    return;
  }

  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }

  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
};

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  });
};
</script>

<style scoped>

.register-modal-overlay {
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

.register-modal {
    background: white;
    width: 450px;
    height: 400px;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.success-icon {
    width: 140px;
    height: 140px;
    margin-top: 30px;
    margin-bottom: 15px;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 10px 0;
}

.modal-message {
    font-size: 1rem;
    color: #6c757d;
    margin-bottom: 20px;
}

.btn-primary {
    background-color: darkgreen;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #007f67;
}
</style>