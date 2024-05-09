import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./style-sheets/categories.css";


function Kids() {
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
        "/images/kids/jordanUniversityRedBlack.png",
        "/images/kids/curry.png",
        "/images/kids/af1Light.png",
        "/images/kids/airmax270.png",
        "images/kids/gazelle.png",
        "images/kids/puma.png",
    ];

    const prices = [
        "64.99", 
        "124.99", 
        "89.99", 
        "149.99", 
        "109.99", 
        "84.99"];

    const descriptions = [
        "Jordan Max Aura 5 TD Black / University Red - Black",
        "Under Armour Curry 11 GS Champion Mindset",
        "Nike Air Force 1 Low Light Bone / Summit White - Light Iron Ore",
        "Nike Air Max 270 GS White / Playful Pink - Pink Foam",
        "Adidas Originals Juniors Gazelle Pink Tint / Cloud White",
        "Puma Juniors CA Pro Classic / Puma White",
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
                                <p className="shoePrice">${prices[index]}</p>
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

export default Kids;
