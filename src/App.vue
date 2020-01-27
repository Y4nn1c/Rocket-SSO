<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <center>
      <h2>Look into the Debug Console.</h2>
      <hr />
      <h3>Front End</h3>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
      <br />
      <g-signin-button
        class="g-signin-button"
        :params="params"
        @success="onSuccess"
        @error="onFailure"
      >
        Sign in with Google
      </g-signin-button>
      <br />
      <h3>Google Profile Information</h3>
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
      <br /><br />>

      <hr />
      <h3>Back End</h3>
      <input v-model="id_token" />
      <p>idToken: {{ id_token }}</p>
      <p>valid: {{ valid }}</p>
      <button v-on:click="validateToken">Validate</button>
      <p>
        Is the token valid? YES: Is it already in our user DB? Yes: exchange it
        for users respective Rocket Session token. No: Generate a new Rocket
        Session Token for the user and save it. No: Cant login, No valid token.
      </p>
      <hr />
    </center>
  </div>
</template>

<script>
import { GoogleLogin } from "vue-google-login";
const CLIENT_ID =
  "884184644232-3nu1245erhln6pmc0mfep4n6o9dmh0vh.apps.googleusercontent.com";

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
      result: [],
      id_token: 0,
      valid: false,
      rocket_token: 0
    };
  },
  methods: {
    onSuccess(googleUser) {
      window.console.log("====SUCCESS====\n", googleUser);

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

      this.result.push({ key: "ID", val: profile.getId() });
      this.result.push({ key: "Full Name", val: profile.getName() });
      this.result.push({ key: "Given Name", val: profile.getGivenName() });
      this.result.push({ key: "Family name", val: profile.getFamilyName() });
      this.result.push({ key: "Email", val: profile.getEmail() });

      //window.console.log("Auth Instance: " , googleUser.getAuthInstance());
      //window.console.log("Auth Code: " , googleUser.getAuthInstance().getAuthCode());
      /*   Basic Output DEBUG   */
      //for (let attr in profile) {
      //  if (typeof profile[attr] !== "function")
      //    this.result.push({ key: attr, val: profile[attr] });
      //}
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
      let url =
        "https://oauth2.googleapis.com/tokeninfo?id_token=" + this.id_token;
      xhr.open("GET", url);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.status == 200) this.valid = true;
        else this.valid = false;
      };
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
