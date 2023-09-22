import { confirmCheckout } from "@/api/apiCheckout";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import { useState } from "react";


//const stripePromise = loadStripe("pk_live_51NkvaEEOX6Zo63RnoE4xFynzhQxnPksbGbtpNpeVfhh4rRPuaQmHDlf40oZedR4bzZjgCVwokqtuRvwewVXKjSMz00p79vZFLh");
const stripePromise = loadStripe("pk_test_51NkvaEEOX6Zo63RnKpZvB0nwlr5zokFhJ2e4hbcuZqYEhTPyvXE5sv7yMjhehttNqYel6ziEBf2jQXXhBl1PKEwi00306eNpdT");

const WrapperStripe = (props) => {
  const { clientSecret } = props;
  const { formData } = props;
  const { errors } = props;
  const { setShowErrors } = props;
  const appearance = {
    theme: "flat",
  };




  return (
    <Elements stripe={stripePromise} options={{ clientSecret: clientSecret, appearance: appearance }}>
      <CheckoutPaymentStripe formData={formData} errors={errors} setShowErrors={setShowErrors} />
    </Elements>
  );
};

const CheckoutPaymentStripe = (props) => {
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  const stripe = useStripe();
  const elements = useElements();
  const { formData } = props;
  const { errors } = props;
  const { setShowErrors } = props;
  const [method,setMethod] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(errors);
    //setShowErrors(true);

    //if (Object.keys(errors).length) return;




     const g = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/result",
      },
       redirect: "if_required",
    }).then(async function (result) {
      console.log(result);
      if (result.paymentIntent?.status === "succeeded") {

        const projectId: number = +Cookies.get("projectId");
        const res = await confirmCheckout(user.CustomerID, projectId, "", result.paymentIntent);
        console.log("Resultado: ",res);
      }
      if (result.error) {
        // Inform the customer that there was an error.
      }
    });


  };


  return (
    <form onSubmit={(e) => handleClick(e)}>
      <Box w={"full"} h={"40px"} mt={"2%"}>
        <Text fontWeight={"semibold"}>3. PAYMENT FORM</Text>
      </Box>
      {/* <LinkAuthenticationElement
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            email: "foo@bar.com",
          },
        }}
      /> */}
      <h3>Payment</h3>
      <PaymentElement
        onChange={(e) => setMethod(e.value.type)}
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            billingDetails: {
              name: "John Doe",
              phone: "888-888-8888",
            },
          },
        }}
      />
      <Button type="submit">PLACE ORDER</Button>
    </form>
  );
};

export default WrapperStripe;