import './style-sheets/confirmation.css';

function Confirmation() {
    return (
        <div id='confirmationContainer'>
            <h1>Thank you for your purchase!</h1>
            <p>Your order has been placed.
               You will receive an order confirmation email shortly.
            </p>
            <img id='checkmark' src="images/check.png" alt="confirmation" className="confirmationImage" />
        </div>
    );
}

export default Confirmation;