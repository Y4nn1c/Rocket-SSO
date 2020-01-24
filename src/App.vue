<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <center>
      <h2> Look into the Debug Console.</h2>
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
      <GoogleLogin :params="params" :logoutButton="true" :onSuccess="loutSucc" :onFailure="loutFail">Logout</GoogleLogin>
      <hr />
      <LoaderPlugin></LoaderPlugin>
    </center>
    
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import { GoogleLogin, LoaderPlugin } from "vue-google-login";
const CLIENT_ID = "884184644232-3nu1245erhln6pmc0mfep4n6o9dmh0vh.apps.googleusercontent.com";//require("../tokens.js");
export default {
  name: "app",
  components: {
    GoogleLogin,
    LoaderPlugin
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
      
      this.GoogleAuth.then(auth2 => {
        window.console.log(auth2.isSignedIn.get());
      })
      window.console.log(
        "====USER PROFILE====\n",googleUser.getBasicProfile()
      );
      let profile = googleUser.getBasicProfile();
      /*    Basic Output DEBUG   */
      window.console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      window.console.log('Full Name: ' + profile.getName());
      window.console.log('Given Name: ' + profile.getGivenName());
      window.console.log('Family Name: ' + profile.getFamilyName());
      window.console.log("Image URL: " + profile.getImageUrl());
      window.console.log("Email: " + profile.getEmail());
      let id_token = googleUser.getAuthResponse().id_token;
      window.console.log("ID Token: " + id_token);
      window.console.log("Auth Response: ", googleUser.getAuthResponse());
      //window.console.log("Auth Instance: " , googleUser.getAuthInstance());
      //window.console.log("Auth Code: " , googleUser.getAuthInstance().getAuthCode());      
      /*   Basic Output DEBUG   */
      for (let attr in profile) {
        if (typeof profile[attr] !== "function")
          this.result.push({ key: attr, val: profile[attr] });
      }
      window.console.log("=====RESULT=====\n", this.result);
    },
    onFailure(googleUser) {
      window.console.log("====FALURE====\n", googleUser);
    },
    loutSucc(param){
      window.console.log("===LOGOUT SUCCESFUL===\n", param);
    },
    loutFail(param){
      window.console.log("===LOGOUT FAILED===\n", param);
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
