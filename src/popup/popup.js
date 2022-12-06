console.log("popup!")

import { firebaseApp } from './firebase_config'
import {
    getAuth,
    onAuthStateChanged,
    signInWithCredential,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';
import {customerDataService} from "./customer_service";

// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence)

function init() {
    // Detect auth state
    onAuthStateChanged(auth, async user => {
        if (user != null) {
            console.log('Below User is logged in:')
            await redirectToMainPage(user);
        } else {
            console.log('No user logged in!');
        }
    });
}
init();

document.querySelector('.btn__google').addEventListener('click', () => {
    initFirebaseApp()
});
async function redirectToMainPage(user){
    
    // User is signed in.
    var userinfo = (await customerDataService.getOne(user.uid)).data();
    if(userinfo !== undefined){
        userinfo.uid = user.uid;
        userinfo.displayName = user.displayName;
        userinfo.photoURL = user.photoURL;
        userinfo.providerId = user.providerData[0].providerId;

        chrome.storage.sync.set({
            userSettings:userinfo
        });
        // User is signed in.
        // userDocument.trial = true;
        // userDocument.endtime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        var subSnapShot = await customerDataService.getSubscription(user.uid);
        const trialUser = await customerDataService.IsTrialUser(user.uid);
        if(subSnapShot.size == 0) {
            if(trialUser.exists()){
                chrome.storage.sync.set({
                    subscriptionSettings: trialUser.data()
                }
                );
            }
            else{
                var data = { trial:true,endtime:Date.now() + 7 * 24 * 60 * 60 * 1000};
                await customerDataService.markUserIsTrial(user.uid,data);
                chrome.storage.sync.set({
                    subscriptionSettings:data
                }
                );
            }
            window.location.replace('./main.html');
        }
        else{
            var subData= subSnapShot.docs[subSnapShot.size-1].data();
            chrome.storage.sync.set({
                subscriptionSettings: {name:subData.items[0].price.product.name, 
                    current_period_end:subData.current_period_end,
                    status:subData.status
                }
            });
            window.location.replace('./main.html');
        }
    }
}
function initFirebaseApp() {
    // Detect auth state
    onAuthStateChanged(auth,async user => {
        if (user != null) {
            console.log('logged in!');
            console.log("current")
            console.log(user.token)
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
        startAuth(true);
    }
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
    console.log("Auth trying")
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        //Token:  This requests an OAuth token from the Chrome Identity API.
        if (chrome.runtime.lastError && !interactive) {
            console.log('It was not possible to get a token programmatically.');
        } else if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else if (token) {
            // Follows: https://firebase.google.com/docs/auth/web/google-signin
            // Authorize Firebase with the OAuth Access Token.
            // console.log("TOKEN:")
            // console.log(token)
            // Builds Firebase credential with the Google ID token.
            const credential = GoogleAuthProvider.credential(null, token);
            signInWithCredential(auth, credential).then((result) => {
                console.log("Success!!!")
                console.log(result)
            }).catch((error) => {
                // You can handle errors here
                alert(error)
            });
        } else {
            console.error('The OAuth token was null');
        }
    });
}
