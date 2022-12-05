import { getApp } from "@firebase/app";
import { createCheckoutSession,getStripePayments,onCurrentUserSubscriptionUpdate  } from "@stripe/firestore-stripe-payments";

class StripePaymentService{
    init(){
        const app = getApp();
        const payments = getStripePayments(app, {
        productsCollection: "products",
        customersCollection: "customers",
        });
        onCurrentUserSubscriptionUpdate(
            payments,
            (snapshot) => {
            for (const change in snapshot.changes) {
                if (change.type === "added") {
                console.log(`New subscription added with ID: ${change.subscription.id}`);
                }
            }
            }
        );
    }
    async getProducts(){
        return await getProducts(payments, {
            includePrices: true,
            activeOnly: true,
            limit: 10,
          });
    }
    async createCheckoutSession() {
        const app = getApp();
        const payments = getStripePayments(app, {
        productsCollection: "products",
        customersCollection: "customers",
        });
        const session = await createCheckoutSession(payments, {
            price: 'price_1MAyD9CLHIOm9ah1fMbHKJV9'
        });
        window.location.assign(session.url);
    }
}
const stripePaymentService = new StripePaymentService();
export{
    stripePaymentService
}

