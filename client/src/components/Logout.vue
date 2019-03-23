<template> 
  <div>
    <div class="row">
      <h1>Are you sure you want to logout?</h1>
    </div>
    <div class="row">
      &nbsp;
    </div>
    <div class="row">
      <button type="button" v-on:click="logout('yes')" class="btn btn-primary btn-lg btn-block">Yes</button>
      <button type="button" v-on:click="logout('no')" class="btn btn-primary btn-lg btn-block">No</button>
    </div>
  </div>
</template>
<!-- This script below is used to swap out different components on the same browser window -->

<script>
// import { ipcRenderer } from "electron"
export default {
  props: ["currentView"],

  data() {
    return {
      form: {
        usernameEmail: null,
        password: null
      },
      errors: {
        usernameEmail: null,
        password: null
      }
    }
  },
  
  methods: {
    logout(res) {
      try {
        if (res === 'yes') {
          delete localStorage.token
          this.$router.replace({ name: "login" })
          this.$notify('You have been logged out!', "success")
        } else {
          // Login error, delete token
          this.$notify('Error logging out!', "error")
          this.$router.replace({ name: "door-control" })
        }
      } catch (err) {
        this.$notify("An error occurred. Try again.", "error")
      }
    }
  },
  
}
</script>

<style scoped>
/* .center {
    display: flex;
    justify-content: center;
    align-items: center;
  } */
.column {
  background-color: lightgray;
}
.section {
  padding: 0.5em;
}
.input {
  width: 90%;
}
.title {
  padding: 0;
  margin: 0;
}
.error {
  height: 1.2rem;
  padding: 0;
  margin-left: 0.3rem;
}
.help {
  margin: 0;
}
</style>