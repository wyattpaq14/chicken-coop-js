<template>
  <div class="column">
    <section class="section is-small">
      <br>
      <br>
      <h4 class="title is-3 has-text-centered">Sign In</h4>
      <br>
      <br>
      <br>
      <br>
    </section>
    <section class="section">
      <div class="field">
        <div class="control">
          <!-- User will be able to login with a unique email or username -->
          <label class="label is-small">Username / Email</label>
          <input
            class="input is-small is-rounded"
            type="text"
            v-model="form.usernameEmail"
            @keydown.enter="post"
          >
          <div class="error">
            <p v-if="errors.usernameEmail" class="help is-danger">{{ errors.usernameEmail }}</p>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label is-small">Password</label>
          <input
            class="input is-small is-rounded"
            type="password"
            v-model="form.password"
            @keydown.enter="post"
          >
          <div class="error">
            <p v-if="errors.password" class="help is-danger">{{ errors.password }}</p>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control has-text-centered">
          <button class="button is-info" @click="post" @keydown.enter="post">Sign In</button>
        </div>
      </div>
    </section>
    <!-- Buttons that sit at the bottom to redirect to another page -->
    <section class="section">
      <br>
      <br>
      <br>
      <br>
      <a @click="changeView('SignUpPanel')">Sign up!</a>
      <br>
      <a @click="changeView('ForgotPasswordPanel')">Forgot Your Password?</a>
    </section>
  </div>
</template>
<!-- This script below is used to swap out different components on the same browser window -->

<script>
// import { ipcRenderer } from "electron"
export default {
  props: ["currentView"],
  methods: {
    changeView(panel) {
      this.$emit("panel-switch", panel)
    },
    checkInput() {
      const { form, errors } = this
      if (!form.usernameEmail) {
        errors.usernameEmail = "A username or email is required."
      }
      if (!form.password) {
        errors.password = "A password is required."
      }
      return form.usernameEmail && form.password
    },
    async post() {
      try {
        if (this.checkInput()) {
          const res = await this.$http
            .post(`http://localhost:3000/auth/login`, {
              usernameEmail: this.form.usernameEmail,
              password: this.form.password
            })
            .then(res => res.data)
          if (res.status === 200) {
            // SWING TO MAIN WINDOW PASSING res.user
            this.$notify(res.message, "success")
            Object.keys(this.form).forEach(key => {
              this.form[key] = null
            })
            this.$emit("authenticated", true)
            this.$emit("user", res.user)
            this.$router.replace({ name: "door-control" })
            console.log({ user: res.user })
          } else {
            this.$notify(res.message, "error")
          }
        }
      } catch (err) {
        this.$notify("An error occurred. Try again.", "error")
      }
    }
  },
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
  }
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