console.log("popup!")

import { firebaseApp } from './firebase_config'
import {
    getAuth,
    onAuthStateChanged,
    signInWithCredential,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence
} from 'firebase/auth';

// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence)

// function init() {
//     // Detect auth state
//     onAuthStateChanged(auth, async user => {
//         if (user != null) {
//             console.log('Below User is logged in:')
//             await redirectToMainPage(user);
//         } else {
//             console.log('No user logged in!');
//         }
//     });
// }
// init();

document.querySelector('.btn__google').addEventListener('click', () => {
    initFirebaseApp()
});
function initFirebaseApp() {
    // Detect auth state
    onAuthStateChanged(auth,async user => {
        if (user != null) {
            console.log('logged in!');
            console.log("current")
            window.location.replace('./main.html');

        } else {
            console.log('No user');
            startSignIn()
        }
    });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
    console.log("started SignIn")
    //https://firebase.google.com/docs/auth/web/manage-users
    const user = auth.currentUser;
    if (user) {
        console.log("current")
        console.log(user)
        auth.signOut();
    } else {
        console.log("proceed")
        //send message to background.js
        chrome.runtime.sendMessage({ message: "startAuth" }, function (response) {
            if(response.operationType == "signIn" && response.user != null){
                window.location.replace('./main.html');
            }
        });
    }
}

