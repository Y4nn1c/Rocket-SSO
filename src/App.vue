<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <center>
      <h2>Look into the Debug Console.</h2>
      <h3>Back End</h3>
      <input v-model="id_token" />
      <p>idToken: {{ id_token }}</p>
      <p>valid: {{ valid }}</p>
      <a href="https://oauth2.googleapis.com/tokeninfo?id_token=" {{id_token}} ><a/>
      <br />
      <button v-on:click="validateToken">Validate</button>
      <hr />
      <h3>Front End</h3>
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
      <GoogleLogin
        :params="params"
        :logoutButton="true"
        :onSuccess="loutSucc"
        :onFailure="loutFail"
        >Logout</GoogleLogin
      >
      <hr />
      <g-signin-button
        class="g-signin-button"
        :params="params"
        @success="onSuccess"
        @error="onFailure"
      >
        Sign in with Google
      </g-signin-button>
      <LoaderPlugin></LoaderPlugin>
      <SignIn></SignIn>
    </center>
  </div>
</template>

<script>
//import "https://apis.google.com/js/api:client.js";
//import HelloWorld from "./components/HelloWorld.vue";
import { GoogleLogin, LoaderPlugin } from "vue-google-login";
import { SignIn } from "./components/SignIn";
//import axios from 'axios'
//import  {GSignInButton } from "vue-google-signin-button";
const CLIENT_ID =
  "884184644232-3nu1245erhln6pmc0mfep4n6o9dmh0vh.apps.googleusercontent.com"; //require("../tokens.js");

export default {
  name: "app",
  components: {
    GoogleLogin,
    LoaderPlugin,
    SignIn
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
      result: [],
      id_token: 0,
      valid: false
    };
  },
  methods: {
    onSuccess(googleUser) {
      window.console.log("====SUCCESS====\n", googleUser);

      /*window.GoogleAuth.then(auth2 => {
        window.console.log(auth2.isSignedIn.get());
      });*/
      window.console.log(
        "====USER PROFILE====\n",
        googleUser.getBasicProfile()
      );
      let profile = googleUser.getBasicProfile();
      /*    Basic Output DEBUG   */
      window.console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      window.console.log("Full Name: " + profile.getName());
      window.console.log("Given Name: " + profile.getGivenName());
      window.console.log("Family Name: " + profile.getFamilyName());
      window.console.log("Image URL: " + profile.getImageUrl());
      window.console.log("Email: " + profile.getEmail());
      let id_token = googleUser.getAuthResponse().id_token;
      window.console.log("ID Token: " + id_token);
      this.id_token = id_token;
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
    loutSucc(param) {
      window.console.log("===LOGOUT SUCCESFUL===\n", param);
    },
    loutFail(param) {
      window.console.log("===LOGOUT FAILED===\n", param);
    },
    validateToken() {
      window.console.log("TOKEN: " + this.id_token);
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://oauth2.googleapis.com/tokeninfo?id_token="+this.id_token
      );
      //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      window.console.log("XHR: ", xhr);
      xhr.send();

      xhr.onreadystatechange = (e) => {
       window.console.log(xhr.responseText);
       window.console.log(e);
      }
      /*
      xhr.onload = function() {
        window.console.log("HEADER: ", xhr.getAllResponseHeaders());
        window.console.log("XHR_RESPONSE:", xhr);
        if (xhr.status == 400) {
          this.valid = true;
        }
        window.console.log("Signed in as: " + xhr.responseText);
      };
      //*/
      //xhr.send("idtoken=" + this.id_token);
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
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
