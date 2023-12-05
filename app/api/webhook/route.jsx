import { connectMongoDB } from "@/app/mongodb";
import Payment from "../../models/Payment";
await connectMongoDB();

const stripe = require("stripe")(
  "sk_test_51O4OVQEDG6lAAoEQq08STgyhP1FpFROMY1zQdL9aFsJHHf17peqbGfzzlVvFdPGetKQpA5FygbFDDMfuw301KxHB00hHCfak9B"
);

const endpointSecret =
  "whsec_5f4ecd560020ea22398735de4f9d0f13cbf9c754e554bdc2968011244960ec0f";

export async function POST(request, response) {
  // const sig = request.headers["stripe-signature"];

  let sig = null;
  sig = request.headers.get("stripe-signature");
  console.log(sig, "stripe signature");
  // Assuming this line logs the headers

  // Check if 'stripe-signature' header exists
  // if ("stripe-signature" in request.headers) {
  //   const sigObject = request.headers["stripe-signature"];

  //   // Check if 'value' property exists in the nested structure
  //   if (sigObject && "value" in sigObject) {
  //     sig = sigObject.value;
  //     console.log("Stripe Signature:", sig);
  //   } else {
  //     console.log("Value property not found in stripe-signature header");
  //   }
  // } else {
  //   console.log("Stripe signature header not found");
  // }

  // Check if stripe-signature header is present
  if (!sig) {
    console.error("No stripe-signature header value was provided.");
    return;
  }

  let event;

  try {
    // Convert the request body to a string since constructEvent expects a string
    const requestBody = await request.text();
    event = stripe.webhooks.constructEvent(requestBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return;
  }

  console.log(event.type, "eventtypefr");

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("payment succeed");
      const paymentIntentSucceeded = event.data.object;
      console.log(
        paymentIntentSucceeded,
        "paymentintentsucceeed frfrfrfrfrfrfr"
      );
      const inputString = paymentIntentSucceeded.description;

      // Regular expression to match quantity and product name
      const regex = /(\d+)x\s(.*?)(?=\s\d+x|\s*$)/g;

      // Array to store extracted results
      const result = [];

      let match;
      while ((match = regex.exec(inputString)) !== null) {
        const quantity = parseInt(match[1], 10);
        const productName = match[2].trim();

        result.push({ name: productName, quantity: quantity });
      }

      await Payment.create({
        totalPrice: paymentIntentSucceeded.amount,
        productData: result,
      });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response({ lalala: "trues" });
}
