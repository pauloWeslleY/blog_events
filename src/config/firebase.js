// import firebase from 'firebase'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAWD8p7jR51r7GdU6jBHlpXVe2zIgPaMks',
  authDomain: 'blog-events.firebaseapp.com',
  projectId: 'blog-events',
  storageBucket: 'blog-events.appspot.com',
  messagingSenderId: '690354104970',
  appId: '1:690354104970:web:d6ef440193add57be25b73',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
