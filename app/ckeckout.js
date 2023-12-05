import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripepromise = null;
  let getstripe = () => {
    if (!stripepromise) {
      stripepromise = loadStripe(
        "pk_test_51O4OVQEDG6lAAoEQcGP7cZq5W5X5g4uvU9IbrRKsB80t5MIbpYnddEcrxop1FhC3s5qCcI5m1IIqv1MgYpxIzmL300Zsqd1OlX"
      );
      return stripepromise;
    }
  };
  const stripe = await getstripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}`,
    cancelUrl: window.location.origin,
  });
}

// "sk_test_51O4OVQEDG6lAAoEQq08STgyhP1FpFROMY1zQdL9aFsJHHf17peqbGfzzlVvFdPGetKQpA5FygbFDDMfuw301KxHB00hHCfak9B"
