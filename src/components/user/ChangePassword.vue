<template>
    <div class="col-md-12">
      <div class="card profile-card">
        <div class="card-body">
          <h5 class="card-title mb-4" style="color: darkgray">Change Password</h5>
          <form>
            <div class="mb-3">
              <base-input
                type="text"
                identity="oldPassword"
                label="Old Password"
                placeholder="Old password"
              ></base-input>
            </div>
            <div class="mb-3">
              <base-input
                type="password"
                identity="newPassword"
                label="New Password"
                placeholder="New password"
              >
              </base-input>
            </div>
            <div class="mb-3">
              <base-input
                type="password"
                identity="newConfirmationPassword"
                label="Confirm Password"
                placeholder="Confirm password"
              ></base-input>
            </div>
            <button class="btn btnProfileMenu float-end mt-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import BaseInput from "../ui/BaseInput.vue";
  import BaseButton from "../ui/BaseButton.vue";
  </script>

<style scoped>

.btnProfileMenu {
    background-color: teal;
    color: white;
}

</style>