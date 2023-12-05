// import React from "react";

// const Page = () => {
//   return (
//     <div className="bg-gray-900 h-screen text-white">
//       <div className="container mx-auto p-8">
//         <h1 className="text-5xl font-semibold mb-8">Checkout</h1>

//         <div className="grid grid-cols-1 gap-8">
//           <div>
//             <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>

//             {/* Display order items here */}
//             <div className="flex justify-between items-center border-b border-gray-700 py-2">
//               <span className="text-lg">Wine Name</span>
//               <span className="text-lg">$25.00</span>
//             </div>

//             {/* Additional order items */}
//             {/* ... */}

//             <div className="flex justify-between items-center mt-4">
//               <span className="font-semibold text-lg">Total:</span>
//               <span className="text-green-500 text-lg">$75.00</span>
//             </div>
//           </div>

//           <div>
//             <h2 className="text-3xl font-semibold mb-4">
//               Delivery Information
//             </h2>

//             {/* Form for delivery information */}
//             <form>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-base font-medium">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white text-base"
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>

//               {/* Add more form fields for address, phone number, etc. */}

//               <button
//                 type="submit"
//                 className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 text-lg"
//               >
//                 Place Order
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";

import { checkout } from "../ckeckout";
const Page = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  // Dummy wine items
  const wineItems = [
    {
      id: 1,
      name: "Romol Del Pivarad ",
      val: 880.0,
      price: "price_1OJA9NEDG6lAAoEQnOqCpGhD",
    },
    {
      id: 2,
      name: "Risata Red Moscat",
      val: 99.0,
      price: "price_1OJAI0EDG6lAAoEQbvYlCosy",
    },
    {
      id: 3,
      name: "Popoel Pod Mascot",
      val: 220.0,
      price: "price_1OJAJTEDG6lAAoEQyOvdi2FC",
    },
  ];

  // Function to handle adding an item to the cart
  const addToCart = (item) => {
    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item already in the cart, update quantity
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      // Item not in the cart, add it
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Function to calculate the total price of selected items
  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, selectedItem) => total + selectedItem.val * selectedItem.quantity,
      0
    );
  };
  const stripe = loadStripe(
    "pk_test_51O4OVQEDG6lAAoEQcGP7cZq5W5X5g4uvU9IbrRKsB80t5MIbpYnddEcrxop1FhC3s5qCcI5m1IIqv1MgYpxIzmL300Zsqd1OlX"
  );
  let array = [];
  selectedItems.map((item) => {
    array = [...array, { price: item.price, quantity: item.quantity }];
  });
  // selectedItems.forEach((item) => {
  //   let obj = {};
  //   obj = { price: item.price, quantity: item.quantity };
  //   console.log(obj);
  // });
  return (
    <div className="bg-gray-900   text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-semibold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>

            {/* Display order items here */}
            {selectedItems.map((selectedItem, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-700 py-2"
              >
                <span className="text-lg">
                  {`${selectedItem.name} x${selectedItem.quantity}`}
                </span>
                <span className="text-lg">
                  ${(selectedItem.val * selectedItem.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="text-green-500 text-lg">
                ${calculateTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Delivery Information
            </h2>

            {/* Form for delivery information */}
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-base font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white text-base"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Add more form fields for address, phone number, etc. */}

              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  checkout({
                    lineItems: array,
                  });
                }}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8">
          {/* Display wine items with Add to Cart button */}
          <h2 className="text-3xl font-semibold mb-4">Wine Selection</h2>
          {wineItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 py-2"
            >
              <span className="text-lg">{item.name}</span>
              <span className="text-lg">${item.val.toFixed(2)}</span>
              <button
                onClick={() => addToCart(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-base"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
