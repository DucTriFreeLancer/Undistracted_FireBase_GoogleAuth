import { initializeApp } from 'firebase/app';

// TODO Fill Me! 
// Find my details from Firebase Console

// config after registering firebase App 
const config = {
  apiKey: "AIzaSyAc8I6kcF6Y-sNoi6BA4ZESxpMKaKv0jN4",
  authDomain: "undistracted-63e13.firebaseapp.com",
  projectId: "undistracted-63e13",
  storageBucket: "undistracted-63e13.appspot.com",
  messagingSenderId: "949654006595",
  appId: "1:949654006595:web:3b81ed4aa2a9ba9fc29df6",
  measurementId: "G-QPXSBDBYT7"
};

// This creates firebaseApp instance
// version: SDK 9
const firebaseApp = initializeApp(config)
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
export{
    firebaseApp,
    relatedDomains,
    isValidHttpUrl
}