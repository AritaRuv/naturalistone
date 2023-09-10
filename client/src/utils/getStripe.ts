import { loadStripe } from "@stripe/stripe-js";
import { get } from "http";

let stripePromise;

const getStripe = () => {

    if (!stripePromise) {
        stripePromise = loadStripe("pk_test_51Nj4n7HOF5hpx4GmL8MJeOz3jsdC6YjSswKdA384RW5K5Gwzlh5Wi5osu5SaCMKVAXUjIfwSWxXfbdJsS9Hyor0k00gnOWwBuj");
    }

    return stripePromise;
}

export default getStripe;