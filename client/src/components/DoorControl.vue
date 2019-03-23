<template> 
  <div>
    <div class="row">
      <h1>Door Control</h1>
    </div>
    <div class="row">
      <h3>Current Door Status: {{doorStatus}}</h3>
    </div>
    <div class="row">
      &nbsp;
    </div>
    <div class="row">
      <button type="button" v-on:click="openDoor()" class="btn btn-primary btn-lg btn-block">Open Door</button>
      <button type="button" v-on:click="closeDoor()" class="btn btn-primary btn-lg btn-block">Close Door</button>
    </div>
  </div>
</template>

<script>
// Import bootstrap files
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "vue-resource"

export default {
  name: "Door-Control",
  props: {
    msg: String
  },
  updated() { this.isLoggedin() },
  created() { this.isLoggedin() },
  methods: {
    isLoggedin () {
      if (localStorage.token) {
        return true
      }
      else {
        this.$notify('You are not logged in!', "error")
        this.$router.replace({ name: "login" })
      }
    },
    async updateDoorStatus() {
      let res = this.$http
        .get("http://localhost:3000/door/5bb55214881cfd14695ea2eb",)
        .then(res => {
          const { isOpened } = res.body.data
          if (isOpened === true) {
            this.doorStatus = "Open"
          } else {
            this.doorStatus = "Closed"
          }
          console.log(res.body.data)
        })
    },
    async openDoor() {
      let res = await this.$http
        .put("http://localhost:3000/door", {
          action: "open",
          id: "5bb55214881cfd14695ea2eb"
        })
        .then(res => res.data)
      if (res) {
        alert(`Door Response: ${res.message}`)
      }
      updateDoorStatus()
    },
    async closeDoor() {
      let res = await this.$http
        .put("http://localhost:3000/door", {
          action: "close",
          id: "5bb55214881cfd14695ea2eb"
        })
        .then(res => res.data)
      if (res) {
        alert(`Door Response: ${res.message}`)
      }
      updateDoorStatus()
    }
  },
  beforeMount() {
    let res = this.$http
      .get("http://localhost:3000/door/5c8ddbce01230d098ad49e19")
      .then(res => {
        const { isOpened } = res.body.data
        if (isOpened === true) {
          this.doorStatus = "Open"
        } else {
          this.doorStatus = "Closed"
        }
      })
  },
  data: function() {
    return {
      doorStatus: ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
