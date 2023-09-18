import { Box, Button, Text } from "@chakra-ui/react";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_live_51NkvaEEOX6Zo63RnoE4xFynzhQxnPksbGbtpNpeVfhh4rRPuaQmHDlf40oZedR4bzZjgCVwokqtuRvwewVXKjSMz00p79vZFLh");

const WrapperStripe = (props) => {
  const { clientSecret } = props;
  const { formData } = props;
  const { errors } = props;
  const { setShowErrors } = props;
  console.log("Client Secret: ", clientSecret)
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
  const stripe = useStripe();
  const elements = useElements();
  const { formData } = props;
  const { errors } = props;
  const { setShowErrors } = props;

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(errors);
    //setShowErrors(true);

    //if (Object.keys(errors).length) return;




    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/result",
      },
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
        onChange={(e) => console.log("change event", e)}
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