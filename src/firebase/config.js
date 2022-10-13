// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAtv4e_ehKrlimXqtyDM3VKpMk_arvhp4Y',
  authDomain: 'japaneat-525ab.firebaseapp.com',
  projectId: 'japaneat-525ab',
  storageBucket: 'japaneat-525ab.appspot.com',
  messagingSenderId: '536018838694',
  appId: '1:536018838694:web:7d6c54f92140e216b04067',
  measurementId: 'G-T4L1ZCRRWH'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
