import {
CardElement,
useStripe,
useElements
}
from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import { useState }
from "react";

const StripeCheckoutForm = ({
total,
shippingInfo,
onSuccess
}) => {

const stripe = useStripe();

const elements = useElements();

const [loading,setLoading] =
useState(false);

const handleSubmit =
async(e)=>{
   

e.preventDefault();

if(!stripe || !elements)
return;
 if (
  !shippingInfo.fullName.trim() ||
  !shippingInfo.phone.trim() ||
  !shippingInfo.address.trim() ||
  !shippingInfo.city.trim() ||
  !shippingInfo.state.trim() ||
  !shippingInfo.zip.trim()
) {

  toast.error("Please fill all shipping information.");

  return;

}



try{

setLoading(true);

const res =await fetch(
"http://localhost:5000/api/payment/create-payment-intent",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
amount:total
})
}
);

const data =
await res.json();

const result =
await stripe.confirmCardPayment(
data.clientSecret,
{
payment_method:{
card:
elements.getElement(
CardElement
)
}
}
);

if(result.error){

toast.error(result.error.message);
}
else if(
result.paymentIntent.status
=== "succeeded"
){

onSuccess();

}

}
catch(error){

console.log(error);

toast.error("Payment Failed");

}

setLoading(false);

};

return(

<form
onSubmit={handleSubmit}
>

<div className="stripe-card-box">

<CardElement />

</div>

<button
type="submit"
className="place-order-btn"
>

{
loading
? "Processing..."
: `Pay Rs ${total}`
}

</button>

</form>

);

};

export default StripeCheckoutForm;