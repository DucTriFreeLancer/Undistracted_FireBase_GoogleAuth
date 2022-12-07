import {fireStore,firebaseApp,STRIPE_PRICE_ID} from "./firebase_config.js";
import { getFunctions,httpsCallable } from "firebase/functions"; 
import {collection,getDocs,getDoc,doc, setDoc,deleteDoc,query,where,addDoc,onSnapshot} from "firebase/firestore"; 
const userRef = collection(fireStore,"customers");

class CustomerDataService {
  async getAll() {
    return await getDocs(userRef);
  }

  async getOne(id) {
    return await getDoc(doc(userRef,id));
  }

  async create(id,value) {
    return await setDoc(doc(userRef,value.uid),value);
  }

  async update(id, value) {
    return await setDoc(doc(userRef,id),value);
  }

  async delete(id) {
    return await deleteDoc(doc(userRef,id));
  }
  async IsTrialUser(id) {
    const trialRef = collection(fireStore,"trials");
    return await getDoc(doc(trialRef,id));
  }
  async markUserIsTrial(id,value) {
    const trialRef = collection(fireStore,"trials");
    return await setDoc(doc(trialRef,id),value);
  }
  async addSubscription(id){
    var custDoc = doc(userRef,id);
    var checkoutSessionRef = collection(custDoc,"checkout_sessions");
    var docRef = await addDoc(checkoutSessionRef,{
      price: STRIPE_PRICE_ID,
      trial_from_plan:false,
      allow_promotion_codes: true,
      automatic_tax:true,
      automatic_tax:true,
      success_url: "https://www.google.com",
      cancel_url: "https://www.google.com"
    });
    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(docRef,(snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.open(url, '_blank');
      }
    });
  }
  async getSubscription(id){
    var custDoc = doc(userRef,id);
    var q = query(collection(custDoc,"subscriptions"), where("status", "in",['trialing', 'active']));
    const querySnapshot = await getDocs(collection(custDoc,"subscriptions"));
    return querySnapshot;
  }
  async getCustomerPortalLink(){
    const functions = getFunctions(firebaseApp,'us-central1');
    const portalFunction  = httpsCallable(functions,'ext-firestore-stripe-payments-createPortalLink');
    const { data } = await portalFunction({
    returnUrl:"https://www.google.com",
    locale: "auto"
    });
    return data.url;
  }
}
const customerDataService = new CustomerDataService();
export{
  customerDataService
}