// Initialize Firebase only after the Firebase SDK scripts are loaded
const firebaseConfig = {
  apiKey: "AIzaSyClnOwKx7q3vGLKK8p-aHcDZSMsuGDqkR0",
  authDomain: "spktok-9a571.firebaseapp.com",
  projectId: "spktok-9a571",
  storageBucket: "spktok-9a571.appspot.com",
  messagingSenderId: "512466246061",
  appId: "1:512466246061:web:2fa4f1dd6e0db02442a924",
  measurementId: "G-4PV2WTMZGZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Now you can use auth (login, sign up, etc.)

