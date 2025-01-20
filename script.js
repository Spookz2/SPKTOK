// Initialize Firebase
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
// Firebase Configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Handle file uploads
function handleFileUpload(event) {
    const files = event.target.files;
    const uploadSection = document.getElementById('video-upload-section');
    const fileArray = Array.from(files);

    // Loop through files and add them to the grid
    fileArray.forEach((file, index) => {
        const fileBox = document.createElement('div');
        fileBox.classList.add('video-upload-box');
        fileBox.onclick = function() { openFullscreen(fileBox); };

        const reader = new FileReader();
        reader.onload = function (e) {
            const content = document.createElement(file.type.includes('image') ? 'img' : 'video');
            content.src = e.target.result;

            if (file.type.includes('image')) {
                content.style.height = '100%';
                content.style.objectFit = 'cover';
            } else {
                content.style.height = '100%';
                content.setAttribute('controls', 'true');
            }

            fileBox.appendChild(content);
            uploadSection.appendChild(fileBox);

            // Save to Firebase Storage
            uploadToFirebase(file);
        };

        reader.readAsDataURL(file);
    });
}

// Upload the file to Firebase Storage and Firestore
function uploadToFirebase(file) {
    const storageRef = storage.ref('posts/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', function(snapshot) {
        // Progress function (optional)
    }, function(error) {
        // Error function
        console.error("Error uploading file:", error);
    }, function() {
        // Success function
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            savePostToFirestore(downloadURL);
        });
    });
}

// Save post URL to Firestore
function savePostToFirestore(url) {
    const postData = {
        url: url,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('posts').add(postData).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// Load posts from Firestore
function loadPostsFromFirestore() {
    const postsRef = db.collection('posts').orderBy('createdAt', 'desc');

    postsRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const postData = doc.data();
            displayPost(postData.url);
        });
    });
}

// Display post on the page
function displayPost(url) {
    const postGrid = document.getElementById('post-grid');
    const postBox = document.createElement('div');
    postBox.classList.add('video-upload-box');

    const img = document.createElement('img');
    img.src = url;
    img.style.height = '100%';
    img.style.objectFit = 'cover';

    postBox.appendChild(img);
    postGrid.appendChild(postBox);
}

// Fullscreen image view
function openFullscreen(fileBox) {
    const image = fileBox.querySelector('img');
    if (image) {
        const fullscreenContainer = document.getElementById('fullscreen-container');
        const fullscreenImage = document.getElementById('fullscreen-image');
        fullscreenImage.src = image.src;
        fullscreenContainer.style.display = 'flex';
    }
}

function closeFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none';
}

// On page load, load posts from Firestore
window.onload = function() {
    loadPostsFromFirestore();
};
