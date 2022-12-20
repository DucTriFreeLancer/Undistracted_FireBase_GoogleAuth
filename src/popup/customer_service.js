import {fireStore,firebaseApp,STRIPE_PRICE_ID,STRIPE_SECRET_KEY} from "./firebase_config.js";
import { getFunctions,httpsCallable } from "firebase/functions"; 
import {collection,getDocs,getDoc,doc, setDoc,deleteDoc,query,where,addDoc,onSnapshot} from "firebase/firestore"; 
import { stripeService } from "./stripe_service.js";
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
    var settingRef = collection(fireStore,"settings");
    var settingDoc = await getDoc(doc(settingRef,"stripe"));
    if(settingDoc.exists()){
      var settingData = settingDoc.data();
      value.current_period_end = Date.now() +  settingData.trial_days* 24 * 60 * 60 * 1000;
    }
    else{
      value.current_period_end = Date.now() +  7* 24 * 60 * 60 * 1000;
    }
    const trialRef = collection(fireStore,"trials");
    return await setDoc(doc(trialRef,id),value);
  }
 
  async addSubscription(id){
    const prodSnap = await this.getAvailableProducts();
    const pricesSnap = await this.getAvailablePrices(prodSnap);
    let line_Items = [];
    let shouldSkip = false;
    pricesSnap.forEach(function(price) {
      if (shouldSkip) {
        return;
      }
      if(price.data().active === true){
        line_Items.push({
          price: price.id,
          quantity: 1,
        });
        shouldSkip = true;
        return;
      }
    });
    var custDoc = doc(userRef,id);
    var checkoutSessionRef = collection(custDoc,"checkout_sessions");
    addDoc(checkoutSessionRef,{
      line_items: line_Items,
      automatic_tax:true,
      tax_id_collection: true,    
      collect_shipping_address: true, 
      trial_from_plan: false,
      allow_promotion_codes: true,
      success_url: "https://www.google.com",
      cancel_url: "https://www.google.com",
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
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
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    })
  }
  async getSubscriptionByUserId(id){
    var custDoc = doc(userRef,id);
    var q = query(collection(custDoc,"subscriptions"), where("status", "in",['trialing', 'active','canceled']));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  async getSubscriptionBySubId(userId,subId){
    var custDoc = doc(userRef,userId);
    return await getDoc(doc(collection(custDoc,"subscriptions"),subId));
  }
  async getAvailableProducts(){
    var q = query(collection(fireStore,"products"),where("active", "==", true));
    return await getDocs(q);
  }
  async getAvailablePrices(productSnapshot){
    const priceSnap = await getDocs(collection(productSnapshot.docs[0].ref,"prices"),where("active", "==", true));
    return priceSnap;
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