
<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link tag="li" to="/">
        <a class="navbar-brand">Chicken Coop</a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link tag="li" to="/login">
              <a class="nav-link">Login</a>
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link tag="li" to="/logout">
              <a class="nav-link">Logout</a>
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link tag="li" to="/door">
              <a class="nav-link">Door Control</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link tag="li" to="/camera">
              <a class="nav-link">Camera</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>










<script>
export default {
  name: "chicken-coop",
  data() {
    return {
      authenticated: false,
      user: null
    }
  }
};
</script>

<style>
/* CSS */
/* @import "~bulma/css/bulma.css";
  #electron-titlebar {
    margin-bottom: 5px;
  }
  /* disable scrollbar */
</style>