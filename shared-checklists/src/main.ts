import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./quasar";
import * as firebase from "firebase";

import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

import 'firebase/firestore'

Vue.config.productionTip = false;

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "checklists-shared.firebaseapp.com",
  databaseURL: "https://checklists-shared.firebaseio.com",
  projectId: "checklists-shared",
  storageBucket: "checklists-shared.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID
};

const firebaseApp = firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user.uid);
  }
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default firebaseApp.firestore();