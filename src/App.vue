<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <center> 
      <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin> 
      <br />
      <li v-for="(key, val) in result" v-bind:key="key">
          { key } - {{ val }}
      </li>
      <br />
      <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
    </center>  
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import { GoogleLogin } from "vue-google-login";
export default {
  name: "app",
  components: {
    GoogleLogin
  },
  data(){
    return{
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: "884184644232-3nu1245erhln6pmc0mfep4n6o9dmh0vh.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      result: [
        { key: "Key", val: 1234 }
      ]
    }
  },
  methods: {
    onSuccess(param){
      window.console.log("====SUCCESS====\n", param);
      window.console.log("====USER PROFILE====\n", param.getBasicProfile());
      let profile = param.getBasicProfile();
      for (let attr in profile) {
        this.result.push( {key: attr, val: profile[attr]});
      }
      window.console.log("=====RESULT=====\n", this.result);
    },
    onFailure(param){
      window.console.log("====FALURE====\n", param);
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
