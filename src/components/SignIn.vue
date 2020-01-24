<template>
  <div>
    <h2>SignIn component</h2>
    <meta
      name="google-signin-client_id"
      content="884184644232-3nu1245erhln6pmc0mfep4n6o9dmh0vh.apps.googleusercontent.com"
    />
    <div id="login">
      <script src="https://apis.google.com/js/platform.js" async defer>
        <button v-on:click="Logout">Logout</button>
        <br/>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </script>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      name: null,
      email: null,
      token: null
    };
  },
  methods: {
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      window.console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      window.console.log("Name: " + profile.getName());
      window.console.log("Image URL: " + profile.getImageUrl());
      window.console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    /*,
    LogOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        window.console.log('User signed out.');
    });

    }*/
  }
};
</script>

<style></style>
