import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// TODO Fill Me! 
// Find my details from Firebase Console

// config after registering firebase App 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGmdNgG4A-ihnZY7m8CtNe7KleZnBzu8A",
  authDomain: "togglecss-v01.firebaseapp.com",
  projectId: "togglecss-v01",
  storageBucket: "togglecss-v01.appspot.com",
  messagingSenderId: "203641531064",
  appId: "1:203641531064:web:e0600a302f4353d69ee24d"
};
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(firebaseConfig)
const fireStore = getFirestore(firebaseApp);

const relatedDomains = {
  facebook: ['facebook.com', 'fb.com'],
  youtube: ['youtube.com', 'youtu.be'],
  tiktok: ['tiktok.com'],
  instagram: ['instagram.com'],
  twitter: [
    'twitter.com',
    'twimg.com',
    'twttr.net',
    'twttr.com',
    'abs.twimg.com',
  ],
  reddit: ['reddit.com', 'old.reddit.com'],
  netflix: ['netflix.com'],
  linkedin: ['linkedin.com'],
};
const isValidHttpUrl = (textval)=>{
var urlregex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
return urlregex.test(textval);
}
const STRIPE_PRICE_ID = "price_1MCPfCDzARLN5Qq7LyFYFFvB"
export{
    firebaseApp,
    fireStore,
    STRIPE_PRICE_ID,
    relatedDomains,
    isValidHttpUrl
}