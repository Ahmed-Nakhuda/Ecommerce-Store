import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./style-sheets/categories.css";


function Men() {
    // State to keep track of hover states for each card
    const [hoverStates, setHoverStates] = useState([false, false, false]);

    // Function to handle mouse enter event
    const handleMouseEnter = (index) => {
        const updatedHoverStates = [...hoverStates];
        updatedHoverStates[index] = true;
        setHoverStates(updatedHoverStates);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = (index) => {
        const updatedHoverStates = [...hoverStates];
        updatedHoverStates[index] = false;
        setHoverStates(updatedHoverStates);
    };

    const handleAddToCart = (image, shoe, price, quantity) => {
        // Make a POST request to server when "Add to Cart" is clicked
        axios.post("http://localhost:3001/api", { image, shoe, price, quantity })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error("Error adding to cart:", error);
            });

        // Show the notification
        toast.success("Item added to cart!");

    };

    // Data for shoes
    const images = [
        "/images/men/dunk.png",
        "/images/men/ultraboost.png",
        "/images/men/jordanWhiteGreen.png",
        "/images/men/airmax.png",
        "images/men/newBalance.png",
        "images/men/underArmour.png"
    ];
    
    const prices = [
        "149.99",
        "259.99",
        "234.99",
        "169.99",
        "119.99",
        "159.99"
    ];

    const descriptions = [
        "Nike Dunk Low Retro White / Black - White",
        "Adidas Ultraboost 1.0 Aluminium / Wonder Beige - Olive Strata",
        "Jordan 1 Retro High OG White / Black - Green Glow",
        "Nike Air Max 90 Black / University Blue",
        "New Balance ML574EVG Grey / White",
        "Under Armour Flow Velociti SE BATIK / Beta"];
   
    const quantity = 1;

    return (
        <div id="categoryContainer">
            <ToastContainer />
            <div className="cardContainer">
                {/* Display the first three cards */}
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        className="card"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <img src={images[index]} alt="shoe" />
                
                        {/* Display the description and price when not hovered */}
                        {!hoverStates[index] && (
                            <>
                                <p className="shoeDescription">{descriptions[index]}</p>
                                <p className="shoePrice">${prices[index]}</p>
                            </>
                        )}
                
                        {/* Display the "Add to Cart" button when hovered */}
                        {hoverStates[index] && (
                            <button onClick={() => handleAddToCart(images[index], descriptions[index], prices[index], quantity)} className="addToCartButton">
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="cardContainer">
                {[3, 4, 5].map((index) => (
                    <div
                        key={index}
                        className="card"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <img src={images[index]} alt="Featured Product" />
                        {!hoverStates[index] && (
                            <>
                                <p className="shoeDescription">{descriptions[index]}</p>
                                <p className="shoePrice">${prices[index]}</p>
                            </>
                        )}
                        {hoverStates[index] && (
                            <button onClick={() => handleAddToCart(images[index], descriptions[index], prices[index], quantity)} className="addToCartButton">
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Men;
