import { Stripe } from 'stripe';
import {STRIPE_PRICE_ID,STRIPE_SECRET_KEY} from "./firebase_config.js";
const stripe = new Stripe(STRIPE_SECRET_KEY);
class StripeService{
    async createCustomer(id,value) {
        try{
            const customer = await stripe.customers.create({
                email: value.email,
                name: value.name,
                phone: value.phone,
                metadata: {
                    firebaseUID: value.uid
                }
            });
            return customer;
        }
        catch(err){
            console.log(err);
        }
    }
    /// get customer by email
    async getCustomerByEmail(email) {
        try{
            const customer = await stripe.customers.list({
                email: email
            });
            return customer;
        }
        catch(err){
            console.log(err);
        }
    }
    async getSubscription(id) {
        try{
            const subscription = await stripe.subscriptions.retrieve(id);
            return subscription;
        }
        catch(err){
            console.log(err);
        }
    }
    async getSubscriptionByUser(id) {
        try{
            const subscription = await stripe.subscriptions.list({
                customer: id,
                status: 'active'
            });
            return subscription;
        }
        catch(err){
            console.log(err);
        }
    }
    async getPriceList(){
      return stripe.prices.list({ limit: 3,active:true });
    }
}
const stripeService = new StripeService();
export {
    stripeService
}