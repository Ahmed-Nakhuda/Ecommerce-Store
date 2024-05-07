import React, { useState } from 'react';
import axios from 'axios';
import './style-sheets/categories.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Women() {

    const [hoverStates, setHoverStates] = useState([false, false, false]);

    const handleMouseEnter = (index) => {
        const updatedHoverStates = [...hoverStates];
        updatedHoverStates[index] = true;
        setHoverStates(updatedHoverStates);
    };

    const handleMouseLeave = (index) => {
        const updatedHoverStates = [...hoverStates];
        updatedHoverStates[index] = false;
        setHoverStates(updatedHoverStates);
    };

    const handleAddToCart = (image, shoe, price, quantity) => {
        // Make a POST request to server when "Add to Cart" is clicked
        axios.post('http://localhost:3001/api', { image, shoe, price, quantity })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });

        // Show notification
        toast.success('Item added to cart!');

    };

    // Data for images and prices
    const images = ['/images/women/valentine.png', '/images/women/newBalanceSeaSalt.png', '/images/women/adidasPuttyMauve.png', '/images/women/Jordan1WhiteGold.png', 'images/women/converse.png', 'images/women/timberland.png'];
    const prices = ['149.99', '149.99', '129.99', '174.99', '74.99', '159.99'];
    const descriptions = [
        'Nike Dunk Low Valentine\'s Day White / Team Red - Adobe',
        'New Balance BBW500TB Sea Salt / Linen - Stoneware',
        'Adidas Originals Rivalry Low Putty Mauve / Ivory',
        'Jordan 1 Retro High OG White / Metallic Gold - Gum',
        'Converse Chuck Taylor All Star Desert Color Midnight Clover',
        'Timberland 6 Inch Lace Up Waterproof Boot / Black Nu'];
    const quantity = 1;

    return (
        <div className='categoryContainer'>
            <ToastContainer />
            <div className='cardContainer'>
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        className='card'
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <img src={images[index]} alt="Featured Product" />
                        {!hoverStates[index] && (
                            <>
                                <p className='p'>{descriptions[index]}</p>
                                <p className='p'>${prices[index]}</p>
                            </>
                        )}
                        {hoverStates[index] && (
                            <button onClick={() => handleAddToCart(images[index], descriptions[index], prices[index], quantity)} className='addToCartButton'>
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className='cardContainer'>
                {[3, 4, 5].map((index) => (
                    <div
                        key={index}
                        className='card'
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <img src={images[index]} alt="Featured Product" />
                        {!hoverStates[index] && (
                            <>
                                <p className='p'>{descriptions[index]}</p>
                                <p className='p'>{prices[index]}</p>
                            </>
                        )}
                        {hoverStates[index] && (
                            <button onClick={() => handleAddToCart(images[index], descriptions[index], prices[index], quantity)} className='addToCartButton'>
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Women;
