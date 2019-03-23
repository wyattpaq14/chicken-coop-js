<template>
  <!-- <div class="column">
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
           User will be able to login with a unique email or username 
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
     Buttons that sit at the bottom to redirect to another page 
    <section class="section">
      <br>
      <br>
      <br>
      <br>
      <a @click="changeView('SignUpPanel')">Sign up!</a>
      <br>
      <a @click="changeView('ForgotPasswordPanel')">Forgot Your Password?</a>
    </section>
  </div>-->

  <div class="col-md-6 mx-auto">
    <br /><br />
    <!-- form card login -->
    <div class="card rounded-0" id="login-form">
      <div class="card-header">
        <h3 class="mb-0">Login</h3>
      </div>
      <div class="card-body">
        
          <div class="form-group">
            <label for="uname1">Username</label>
            <input
              type="text"
              class="form-control form-control-lg rounded-0"
              name="uname1"
              id="uname1"
              @keydown.enter="post"
              v-model="form.usernameEmail"
              required
            >
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control form-control-lg rounded-0"
              id="pwd1"
              @keydown.enter="post"
              v-model="form.password"
              required
            >
          </div>
          <button @click="post" @keydown.enter="post" class="btn btn-success btn-lg float-right" id="btnLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },

  methods: {
    changeView(panel) {
      this.$emit("panel-switch", panel);
    },

    checkInput() {
      const { form, errors } = this;
      if (!form.usernameEmail) {
        errors.usernameEmail = "A username or email is required.";
      }
      if (!form.password) {
        errors.password = "A password is required.";
      }
      return form.usernameEmail && form.password;
    },
    async post() {
      try {
        if (this.checkInput()) {
          const res = await this.$http
            .post(`http://192.168.1.242:3000/auth/login`, {
              usernameEmail: this.form.usernameEmail,
              password: this.form.password
            })
            .then(res => res.data);
          if (res.status === 200) {
            // Successful login, storing token and redirecting to door-control
            localStorage.token = res.token;
            this.$router.replace({ name: "door-control" });
            this.$notify(res.message, "success");
          } else {
            // Login error, delete token
            this.$notify(res.message, "error");
            delete localStorage.token;
          }
        }
      } catch (err) {
        this.$notify("An error occurred. Try again.", "error");
      }
    }
  }
};
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