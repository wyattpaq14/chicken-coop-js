
<template>
<div id="app">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Chicken Coop</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Door Control <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Camera</a>
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
  name: "jac2-client"
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