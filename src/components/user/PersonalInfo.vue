<template>
    <div class="col-md-12 mb-5">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h4 class="card-title text-black fw-bold">Edit Profile</h4>
            <i class="fas fa-x text-black fs-6"></i>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text text-secondary-emphasis fs-5 fw-bold py-5">
              Photo
            </p>
            <div class="d-flex justify-content-center align-items-center">
              <div v-if="!userData.imageLink">
                <i
                  class="fa-solid fa-user rounded-circle p-3 me-3 fs-4"
                  style="background-color: #eafeff"
                ></i>
              </div>
              <div v-else>
                <img
                  :src="userData.imageLink"
                  :alt="userData.imgAlt"
                  class="rounded-circle me-3"
                  style="width: 150px; height: 150px; object-fit: cover"
                />
              </div>
              <base-input
                type="file"
                class="btn me-2"
                style="background-color: #eeeeee;"
                identity="profileImage"
                label="Choose"
                isImage="true"
                @input="checkImage"
              ></base-input>
              <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
              <p class="mt-2" v-else>JPG, JPEG, or PNG, 5 MB Max</p>
            </div>
            <div>
              <i
                class="fa-solid fa-trash-can cursor-pointer me-3"
                @click="deleteImage"
                style="cursor: pointer; color: red;"
              ></i>
            </div>
          </div>
          <hr />
          <form>
            <div class="mb-3">
              <base-input
                type="text"
                identity="fullname"
                placeholder="Enter your full name"
                label="Fullname"
                v-model="userData.fullname"
              ></base-input>
            </div>
            <div class="mb-3">
              <base-input
                type="text"
                identity="username"
                placeholder="Enter your username"
                label="Username"
                v-model="userData.username"
              ></base-input>
            </div>
  
            <div class="mb-3">
              <base-input
                type="email"
                identity="email"
                placeholder="Enter your email"
                label="Email"
                v-model="userData.email"
              ></base-input>
            </div>
            <button
              type="button"
              class="btn btn-teal float-end text-light"
              @click="updateProfile"
              style="background-color: #009c9e"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import BaseInput from "../ui/BaseInput.vue";
  import { computed, ref } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  const store = useStore();
  const errorMsg = ref("");
  const userData = computed(() => store.state.auth.userLogin);
  
  const checkImage = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 5242880 && /image\/(jpeg|png|jpg)/.test(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        userData.value.imageLink = reader.result; // Set image in base64 format
        errorMsg.value = ""; // Clear error message
      };
      reader.readAsDataURL(file);
    } else {
      errorMsg.value = "Image must be JPG, JPEG, or PNG, and under 5 MB.";
    }
  };
  
  const updateProfile = async () => {
    try {
      const updatedData = {
        fullname: userData.value.fullname,
        username: userData.value.username,
        email: userData.value.email,
        imageLink: userData.value.imageLink, // Include the image
      };
  
      // Call the updateUserProfile action from Vuex store
      await store.dispatch("auth/updateUserProfile", updatedData);
  
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };
  
  const deleteImage = () => {
    userData.value.imageLink = ""; // Clear image data
  };
  </script>