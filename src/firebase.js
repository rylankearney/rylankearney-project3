import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBHpbjd0zuhp3QlZGgiCqX76USfck_yvj0",
  authDomain: "welp-app-592a9.firebaseapp.com",
  projectId: "welp-app-592a9",
  storageBucket: "welp-app-592a9.appspot.com",
  messagingSenderId: "466976155748",
  appId: "1:466976155748:web:ac26a03e0bdc20fa845771"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;