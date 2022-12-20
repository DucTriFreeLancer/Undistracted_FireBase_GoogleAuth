import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEgmsCxHT2bFr2zje_cqEalW1Y9B-9Xd4",
  authDomain: "uniblocker-chrome-extension.firebaseapp.com",
  projectId: "uniblocker-chrome-extension",
  storageBucket: "uniblocker-chrome-extension.appspot.com",
  messagingSenderId: "634535868820",
  appId: "1:634535868820:web:a99bacf39577df44553781",
  measurementId: "G-M154SZZRCL"
};

// Initialize Firebase
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
const STRIPE_SECRET_KEY = "rk_test_51M87MMDzARLN5Qq78HNO6fvZMLe2PV4vGX7Xr4pc3FbnM95avuv5FZg4HzAhVSZUKVc27ZcrTvIWtSa2T9MlydAL00jQI1HWHt"
const STRIPE_PRICE_ID = "price_1MEmKyDzARLN5Qq7ONgNFwyy"
export{
    firebaseApp,
    fireStore,
    STRIPE_PRICE_ID,
    STRIPE_SECRET_KEY,
    relatedDomains,
    isValidHttpUrl
}