import React, { useState } from 'react';
import axios from 'axios';
import './style-sheets/categories.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Kids() {

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
    const images = ['/images/kids/jordanUniversityRedBlack.png', '/images/kids/curry.png', '/images/kids/af1Light.png', '/images/kids/airmax270.png', 'images/kids/gazelle.png', 'images/kids/puma.png'];
    const prices = ['64.99', '124.99', '89.99', '149.99', '109.99', '84.99'];
    const descriptions = [
        'Jordan Max Aura 5 TD Black / University Red - Black', 
        'Under Armour Curry 11 GS Champion Mindset', 
        'Nike Air Force 1 Low Light Bone / Summit White - Light Iron Ore', 
        'Nike Air Max 270 GS White / Playful Pink - Pink Foam', 
        'Adidas Originals Juniors Gazelle Pink Tint / Cloud White', 
        'Puma Juniors CA Pro Classic / Puma White'];
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
        </div>
    )
};

export default Kids;
