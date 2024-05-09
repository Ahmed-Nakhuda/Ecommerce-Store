import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./style-sheets/categories.css";

function Women() {
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
        axios
            .post("http://localhost:3001/api", { image, shoe, price, quantity })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error("Error adding to cart:", error);
            });

        // Show the notification
        toast.success("Item added to cart!");
    };

    // Data for shoes
    const images = [
        "/images/women/valentine.png",
        "/images/women/newBalanceSeaSalt.png",
        "/images/women/adidasPuttyMauve.png",
        "/images/women/Jordan1WhiteGold.png",
        "images/women/converse.png",
        "images/women/timberland.png",
    ];

    const prices = [
        "149.99",
        "149.99",
        "129.99",
        "174.99",
        "74.99",
        "159.99",
    ];
    
    const descriptions = [
        "Nike Dunk Low Valentine's Day White / Team Red - Adobe",
        "New Balance BBW500TB Sea Salt / Linen - Stoneware",
        "Adidas Originals Rivalry Low Putty Mauve / Ivory",
        "Jordan 1 Retro High OG White / Metallic Gold - Gum",
        "Converse Chuck Taylor All Star Desert Color Midnight Clover",
        "Timberland 6 Inch Lace Up Waterproof Boot / Black Nu",
    ];
    
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
                                <p className="shoePrice">{prices[index]}</p>
                            </>
                        )}
                        {hoverStates[index] && (
                            <button
                                onClick={() =>
                                    handleAddToCart(
                                        images[index],
                                        descriptions[index],
                                        prices[index],
                                        quantity
                                    )
                                }
                                className="addToCartButton"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Women;
