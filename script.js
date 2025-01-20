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
// Firebase sign-up function
function signUp(event) {
    event.preventDefault();  // Prevent form submission

    const email = document.getElementById('signup-email').value;  // Get email
    const password = document.getElementById('signup-password').value;  // Get password

    // Check if password matches confirm password
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Firebase sign-up process
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            console.log("User signed up: ", user);
            // Redirect or update UI after successful sign-up
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('profile-container').style.display = 'flex';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing up: ", errorCode, errorMessage);
            alert("Error signing up: " + errorMessage);
        });
}

