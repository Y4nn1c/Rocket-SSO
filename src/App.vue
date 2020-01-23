<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <center>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
      <br />
      <li v-for="attr in result" v-bind:key="attr">
        {{ attr.key }} - {{ attr.val }}
      </li>
      <br />
      <GoogleLogin :params="params" :logoutButton="true">Logout</GoogleLogin>
    </center>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import { GoogleLogin } from "vue-google-login";
//import { CLIENT_ID } from "../tokens.js";
import "../tokens.js";
export default {
  name: "app",
  components: {
    GoogleLogin
  },
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: CLIENT_ID
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      result: []
    };
  },
  methods: {
    onSuccess(googleUser) {
      window.console.log("====SUCCESS====\n", googleUser);
      window.console.log(
        "====USER PROFILE====\n" + googleUser.getBasicProfile()
      );
      let profile = googleUser.getBasicProfile();
      for (let attr in profile) {
        if (typeof profile[attr] !== "function")
          this.result.push({ key: attr, val: profile[attr] });
      }
      window.console.log("=====RESULT=====\n", this.result);
    },
    onFailure(googleUser) {
      window.console.log("====FALURE====\n", googleUser);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
