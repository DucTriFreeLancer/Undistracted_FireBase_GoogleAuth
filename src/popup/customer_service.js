import {fireStore} from "./firebase_config.js";
import {collection,getDocs,getDoc,doc,documentId, setDoc,deleteDoc,query,where,addDoc,onSnapshot} from "firebase/firestore"; 
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
  async addSubscription(id){
    var custDoc = doc(userRef,id);
    var checkoutSessionRef = collection(custDoc,"checkout_sessions");
    var docRef = await addDoc(checkoutSessionRef,{
      price: 'price_1MAyD9CLHIOm9ah1fMbHKJV9',
      success_url: "https://us-central1-togglecss-v01.cloudfunctions.net/home",//window.location.replace('./main.html'),
      cancel_url: "https://us-central1-togglecss-v01.cloudfunctions.net"
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
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
}
const customerDataService = new CustomerDataService();
export{
  customerDataService
}