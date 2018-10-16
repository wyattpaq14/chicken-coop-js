<template>
  <div>
    <button type="button" v-on:click="openDoor()" class="btn btn-primary btn-lg btn-block">Open Door</button>
    <button type="button" v-on:click="closeDoor()" class="btn btn-primary btn-lg btn-block">Close Door</button>
  </div>
</template>

<script>
// Import bootstrap files
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-resource";

export default {
  name: "Door-Control",
  props: {
    // msg: String
  },
  methods: {
    async openDoor() {
      // let res = await this.$http.post(`${this.$config.backend}/api/auth/login`, {
      let res = await this.$http.put("http://localhost:3000/door", {
          action: "open",
          id: "5bb55214881cfd14695ea2eb"
        })
        .then(res => res.data);
      if (res) {
        alert(`Door Response: ${res.message}`)
      }
    },
    async closeDoor() {
      // let res = await this.$http.post(`${this.$config.backend}/api/auth/login`, {
      let res = await this.$http.put("http://localhost:3000/door", {
          action: "close",
          id: "5bb55214881cfd14695ea2eb"
        })
        .then(res => res.data);
      if (res) {
        alert(`Door Response: ${res.message}`)
      }
    }
  }
};
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
