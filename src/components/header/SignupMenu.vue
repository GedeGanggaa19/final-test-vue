<template>
    <div class="col-12 d-flex justify-content-end align-items-center">
        <router-link to="/login" type="button" class="btn btn-outline-success me-2 btn-login">Login</router-link> 
        <router-link to="/signup" type="button" class="btn me-3 text-white" style="background-color: #be8d50;">Sign Up</router-link>

        <div class="dropdown">
            <button class="btn btn-drop dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">EN</button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">IDN</a></li>
                <li><a class="dropdown-item" href="#">JPN</a></li>
            </ul>
        </div>
    </div>
</template>