import { fireStore } from "./firebase_config.js";
import { collection,getDocs,getDoc,doc, addDoc, setDoc,deleteDoc } from "firebase/firestore"; 

const subscriptionRef = collection(fireStore,"subscriptions");

class SubscriptionDataService {
  async getAll() {
    return await getDocs(subscriptionRef);
  }

  async getOne(id) {
    return await getDoc(doc(subscriptionRef,id));
  }

  async delete(id) {
    return await deleteDoc(doc(subscriptionRef,id));
  }
}
const subscriptionDataService = new SubscriptionDataService();
export{
  subscriptionDataService
}