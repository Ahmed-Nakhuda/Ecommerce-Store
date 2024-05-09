import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style-sheets/cart.css";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  // Function to fetch cart items from server
  const fetchCartItems = () => {
    axios.get("http://localhost:3001/api")
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
      });
  };


  // Function to delete a cart item by ID
  const deleteCartItem = (id) => {
    axios.delete(`http://localhost:3001/api/${id}`)
      .then(response => {
        console.log(response.data.message);
        fetchCartItems(); // Fetch updated cart items after deletion
      })
      .catch(error => {
        console.error("Error deleting cart item:", error);
      });
  };


  // Function to increment quantity for a cart item
  const incrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        console.log("Previous quantity: " + item.quantity);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    // Update quantity in the database
    axios.post(`http://localhost:3001/api/${id}`, { quantity: updatedCartItems.find(item => item.id === id).quantity })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Error increasing quantity:", error);
      });
  };

  // Function to decrement quantity for a cart item
  const decrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        console.log("Previous quantity: " + item.quantity);
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    // Update quantity in the database
    axios.post(`http://localhost:3001/api/${id}`, { quantity: updatedCartItems.find(item => item.id === id).quantity })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Error decreasing quantity:", error);
      });
  };

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += parseFloat(item.price) * item.quantity;
    });
    return total.toFixed(2);
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <div id="gridContainer">
        <div id="gridItem">
          <h2 id="reviewHeading">Review Your Order</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Shoe</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.shoe} /></td>
                  <td>{item.shoe}</td>
                  <td>${item.price}</td>
                  <td>
                    <button id="quantityButton" size={25} onClick={() => decrementQuantity(item.id)}>-</button>
                    {item.quantity}
                    <button className="quantityButton" size={25} onClick={() => incrementQuantity(item.id)}>+ </button>
                  </td>
                  <td>{"$" + (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</td>
                  <td><IoCloseSharp id="deleteItemIcon" icon="fa-regular fa-x" size={25} onClick={() => deleteCartItem(item.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="gridItem2">
          <div id="orderSummary">
            <h2 id="summaryHeading">Summary</h2>
            <hr></hr>
            <div class="summaryRow">
              <p>Subtotal:</p>
              <p className="orderSummaryTotal">${calculateTotal()}</p>
            </div>
            <div class="summaryRow">
              <p>Tax:</p>
              <p className="orderSummaryTotal">${(calculateTotal() * 0.13).toFixed(2)}</p>
            </div>
            <div class="summaryRow">
              <p>Grand Total:</p>
              <p className="orderSummaryTotal">${(calculateTotal() * 1.13).toFixed(2)}</p>
            </div>
            <div class="summaryRow">
              <Link to="/checkout">
                <button id="checkoutButton">Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
